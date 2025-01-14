<script setup>
import { db, user } from '@/store/firebase';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

import TaskCard from '@/components/TaskCard.vue';
import { addTask } from '@/store/tools/tasks.js';

const route = useRoute();
const group = reactive({
    tasks: [],
    unsubscribe: () => {}
});

function updateTasks(snapshot) {
    let tasks = [];
    snapshot.docs.forEach(doc => tasks.push({...doc.data(), id: doc.id}));

    group.tasks = tasks;
}

function handleCreateTask(e) {
    e.preventDefault();
    const nameField = e.target.task;

    nameField.value && addTask(route.params.id, nameField.value);

    e.target.reset();
}

watchEffect(() => {
    group.unsubscribe();
    const q = query(collection(db, `users/${user.uid}/groups/${route.params.id}/tasks`), orderBy('createdAt'));
    group.unsubscribe = onSnapshot(q, snapshot => updateTasks(snapshot));
})
</script>
<template>
    <div class="tasks-container">
        <form class="create-task" @submit="e => handleCreateTask(e)">
            <input type="text" name="task" placeholder="Create a task" autocomplete="off">
            <button><v-icon name="bi-plus" scale="1.5" fill="var(--color-font-primary)" /></button>
        </form>
        <template v-if="!group.tasks.length">
            <p class="empty-text">You can add a task to your group now!</p>
        </template>
        <ul v-else>
            <template v-for="task in group.tasks.filter(task => !task.fulfilled)">
                <li><TaskCard :task="task" /></li>
            </template>
            <span class="space-tasks" v-if="group.tasks.filter(task => task.fulfilled).length && group.tasks.filter(task => !task.fulfilled).length"></span>
            <template v-for="task in group.tasks.filter(task => task.fulfilled)">
                <li><TaskCard :task="task" /></li>
            </template>
        </ul>
    </div>
</template>
<style scoped>
.tasks-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.tasks-container > ul {
    flex: 1;
    overflow: auto;
}
.create-task {
    border-radius: 32px;
    display: flex;
    margin: 8px;
    overflow: hidden;
}
.create-task > input {
    background: var(--background-highlighted-dark);
    border: none;
    color: var(--font-color-primary);
    flex: 1;
    font-size: 16px;
    font-weight: 600;
    min-width: none;
    outline: none;
    padding: 4px 8px;
}
.create-task > button {
    align-items: center;
    background: var(--background-highlighted-light);
    border: none;
    display: flex;
    display: flex;
    justify-content: center;
    padding: 0;
    width: 32px;
}
.space-tasks {
    background: var(--background-highlighted-dark);
    border-radius: 2px;
    display: block;
    height: 4px;
    margin: 16px;
}
.empty-text {
    color: var(--color-font-secondary);
    font-size: 28px;
    font-weight: 600;
    text-align: center;
}
</style>