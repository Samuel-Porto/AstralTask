<script setup>
import { defineProps, ref, watch, watchEffect } from 'vue';

const props = defineProps(['text', 'time', 'isSpecial', 'wave']);

const displayText = ref([]);

async function animation() {
    props.time && await new Promise(resolve => setTimeout(resolve, props.time));

    let currentLetter = displayText.value.length;
    displayText.value = [...displayText.value, props.text[currentLetter]];
    if (displayText.value.length < props.text.length) animation();
}
animation();

watchEffect(() => {
    props.isSpecial;
    displayText.value = [];
    animation();
})
</script>

<template>
    
    <ul class="letter-list" :class="{special: isSpecial}">
        <template v-for="letter in displayText">
            <li :class="{'blank-space': letter === ' ', wave: wave}">{{ letter }}</li>
        </template>
    </ul>
</template>
<style scoped>
.letter-list {
    color: var(--color-font-primary);
    display: flex;
}
.letter-list.special > li {
    animation: rainbow 2s infinite, jump .5s;
}
.letter-list.special > li.wave {
    animation: rainbow 2s infinite, wave 1s infinite;
}
.letter-list .blank-space {
    width: 6px;
}
</style>