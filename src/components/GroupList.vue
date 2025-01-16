<script setup>
import { defineProps } from 'vue';
import { addIcons } from 'oh-vue-icons';
import { BiPlus } from 'oh-vue-icons/icons';
import { addGroup } from '@/store/tools/groups.js';
import { useRoute } from 'vue-router';

import GroupCard from './GroupCard.vue';

const route = useRoute();
const props = defineProps(['groups']);

addIcons(BiPlus);

function handleAddGroup(e) {
    e.preventDefault();
    const nameField = e.target.name;

    nameField.value && addGroup(nameField.value);
    e.target.reset();
}
</script>
<template>
    <div class="group-list">
        <div class="group-list">
            <form @submit="e => handleAddGroup(e)">
                <input type="text" name="name" placeholder="Crie um grupo" autocomplete="off">
                <button type="submit"><v-icon name="bi-plus" scale="1.75" fill="var(--color-font-primary)" /></button>
            </form>
            <ul>
                <template v-for="group in groups">
                    <li :class="{'current-group': route.params.id === group.id}">
                        <GroupCard :group="group" />
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.group-list > form {
    border-radius: 16px;
    display: flex;
    margin: 8px;
    overflow: hidden;
}
.group-list > form > input {
    background: var(--background-highlighted-dark);
    border: none;
    box-sizing: border-box;
    color: var(--color-font-primary);
    font-size: 16px;
    margin: none;
    outline: none;
    padding: 4px 8px;
}
.group-list > form > button {
    align-items: center;
    background: var(--background-highlighted-light);
    border: none;
    display: flex;
    justify-content: center;
    padding: 0;
}
.group-list > ul > li {
    transition: all .2s;
}
.current-group {
    transform: translateX(8px);
}
</style>