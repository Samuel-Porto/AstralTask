<script setup>
import { addIcons } from 'oh-vue-icons';
import { defineProps } from 'vue';
import { BiStar, BiStarFill, BiStars } from 'oh-vue-icons/icons';
import { deleteTask, editTask } from '@/store/tools/tasks';

import AnimatedText from './AnimatedText.vue';

const props = defineProps(['task']);

addIcons(BiStar, BiStarFill, BiStars);
</script>
<template>
    <div class="task" :class="{'task-fulfilled': task.fulfilled}">
        <span class="star-task" :class="{finished: task.fulfilled, special: task.special}" @click="editTask(task.groupId, task.id, {fulfilled: !task.fulfilled})">
            <v-icon :name="task.fulfilled? 'bi-star-fill': 'bi-star'" scale="1.5" />
        </span>
        <p><AnimatedText :text="task.name" :time="task.special? 50: 0" :isSpecial="task.special" :wave="task.fulfilled" /></p>
        <span class="special-task" :class="{'is-special': task.special}" @click="editTask(task.groupId, task.id, {special: !task.special})">
            <v-icon name="bi-stars" />
        </span>
        <span class="delete-task" @click="deleteTask(task.groupId, task.id)">
            <v-icon name="bi-trash" scale="1.25" fill="var(--color-error)" />
        </span>
    </div>
</template>
<style scoped>
.task {
    align-items: center;
    background: var(--background-highlighted-dark);
    border-radius: 20px;
    display: flex;
    gap: 8px;
    margin: 8px;
    padding: 4px;
}
.task:hover {
    outline: var(--background-highlighted-light) 2px solid;
}
.task > p {
    flex: 1;
    font-size: 20px;
}
.star-task {
    align-items: center;
    animation: rotate 20s linear infinite;
    color: var(--color-font-primary);
    cursor: pointer;
    display: flex;
}
.star-task.special {
    animation: rotate 5s linear infinite, rainbow 2s infinite;
}
.star-task.special.finished {
    animation: rotate 2s linear infinite, rainbow 2s infinite;
}
.star-task.finished {
    animation: rotate 10s linear infinite;
}
.star-task:hover {
    color: var(--color-font-primary-hover);
    transform: scale(.9);
}
.delete-task {
    cursor: pointer;
}
.special-task {
    border-radius: 8px;
    color: var(--color-font-primary);
    cursor: pointer;
    padding: 4px;
    transition: .25s all;
}
.special-task.is-special {
    animation: rainbow 2s infinite;
    background: var(--background-highlighted-light);
}
.task-fulfilled .star-task {
    transform: rotate(72deg);
}
</style>