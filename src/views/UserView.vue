<script setup>
import { RouterView, useRouter } from 'vue-router';
import { reactive, ref, watch, onUnmounted } from 'vue';
import { addIcons } from "oh-vue-icons";
import { PxMenu } from "oh-vue-icons/icons";
import GroupList from '@/components/GroupList.vue';
import { collection, doc, onSnapshot, orderBy, query } from '@firebase/firestore';
import { db, user, auth } from '@/store/firebase';
import SwitchButton from '@/components/SwitchButton.vue';
import { changeConfigOfUser } from '@/store/tools/config';
import { signOut } from 'firebase/auth';

const isMenuOpen = ref(false);
const darkMode = ref(true);
const context = reactive({
    groups: []
});

function changeDarkMode(mode) {
    changeConfigOfUser({darkMode: mode});
}

addIcons(PxMenu);
let darkModeUnsubscribe = onSnapshot(doc(db, `users/${user.uid}`), snapshot => darkMode.value = snapshot.data().darkMode);
let groupUnsubscribe = onSnapshot(query(collection(db, `users/${user.uid}/groups`), orderBy('createdAt')), snapshot => {
    let docs = [];
    snapshot.forEach(doc => docs.push({...doc.data(), id: doc.id}));
    context.groups = docs;
});
onUnmounted(() => {darkModeUnsubscribe(); groupUnsubscribe();});
</script>

<template>
    <div class="user-container" :class="{'light-mode': !darkMode}">
        <nav class="navigation-mobile">
            <SwitchButton :switchMode="changeDarkMode" />
            <span class="menu-button" @click="isMenuOpen = true">
                <v-icon name="px-menu" scale="2" />
            </span>
            <span class="background-menu" @click="isMenuOpen = false" :class="{'open-menu': isMenuOpen}">
                <aside @click="e => e.stopPropagation()">
                    <button class="signout-button" @click="() => signOut(auth)">Sair da conta</button>
                    <GroupList :groups="context.groups" />
                </aside>
            </span>
        </nav>
        <div class="main-container">
            <nav class="navigation">
                <div class="top-navigation">
                    <SwitchButton :switchMode="changeDarkMode" :setMode="darkMode" />
                    <button class="signout-button" @click="() => signOut(auth)">Sair da conta</button>
                </div>
                <GroupList :groups="context.groups" />
            </nav>
            <div class="view-container">
                <RouterView />
            </div>
        </div>
    </div>
</template>
<style scoped>
@keyframes background-anim {
    from {
        background-color: rgba(0, 0, 0, 0);
    }
    to {
        background-color: rgba(0, 0, 0, .25);
    }
}
@keyframes open-menu {
    from {
        left: -100%;
    }
    to {
        left: 0;
    }
}
.user-container {
    overflow: hidden;
    max-width: 100vw;
    height: 100vh;
    background: var(--background-app);
    transition: background-color .2s;
}
.navigation-mobile {
    display: flex;
    justify-content: space-between;
    padding: 8px;
}
.background-menu {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: var(--background-highlighted-dark);
    overflow: hidden;
}
.background-menu:not(.open-menu) {
    display: none;
}
.background-menu > aside {
    position: absolute;
    width: 80%;
    background: var(--background-page-color);
    height: 100%;
}
.menu-button {
    color: var(--color-font-primary);
}
.open-menu {
    animation: background-anim .2s forwards;
}
.open-menu > aside {
    animation: open-menu .2s forwards;
    box-sizing: border-box;
    padding: 8px;
    z-index: 1;
}
.view-container {
    flex: 2;
    overflow: hidden;
}
.main-container {
    display: flex;
    gap: 8px;
    height: 100%;
}
.navigation {
    display: none;
    flex: 1;
}
.navigation > .user {
    margin: 8px;
}
.top-navigation {
    display: flex;
    justify-content: space-between;
}
.signout-button {
    align-self: center;
    background: var(--color-theme);
    border-radius: 8px;
    border: 2px solid var(--color-theme);
    color: var(--background-app);
    cursor: pointer;
    font-weight: 600;
    padding: 2px 4px;
    transition: all .2s;
}
.signout-button:hover {
    background: transparent;
    color: var(--color-theme);
}
@media screen and (min-width: 768px) {
    .navigation-mobile {
        display: none;
    }
    .navigation {
        display: inline-block;
    }
    .view-container {
        background: var(--background-task-color);
        border-radius: 16px;
        margin: 8px;
        transition: background-color .2s;
    }
}
</style>