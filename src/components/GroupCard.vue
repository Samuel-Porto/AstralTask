<script setup>
import { defineProps } from 'vue';
import { BiTrash } from 'oh-vue-icons/icons';
import { addIcons } from 'oh-vue-icons';
import { useRouter } from 'vue-router';
import { deleteGroup } from '@/store/tools/groups';

const router = useRouter();
const props = defineProps(['group']);

function handleGroupSelect(id) {
    router.replace({path: '/user/group/'+id});
}

function handleGroupDelete(id) {
    deleteGroup(id);
    router.replace('/user')
}

addIcons(BiTrash);
</script>
<template>
    <div class="card-container">
        <p @click="handleGroupSelect(group.id)">{{ group.name }}</p>
        <span @click="handleGroupDelete(group.id)"><v-icon name="bi-trash" scale="1.1" fill="var(--color-error)" /></span>
    </div>
</template>
<style scoped>
.card-container {
    align-items: center;
    background: var(--background-highlighted-dark);
    border-radius: 20px;
    color: var(--color-font-primary);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin: 4px;
}
.card-container > p {
    flex: 1;
    font-size: 20px;
    padding: 8px;
}
.card-container > span {
    padding: 6px;
}
.card-container > span > svg {
    transition: transform .2s;
}
.card-container > span:hover > svg {
    transform: scale(.9);
}
</style>