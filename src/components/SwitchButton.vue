<script setup>
import { ref, defineProps, watch, watchEffect } from 'vue';

const props = defineProps(['switchMode', 'setMode']);
const mode = ref(false);

watchEffect(() => {
    mode.value = props.setMode
})
watch(mode, currentMode => props.switchMode(currentMode));
</script>
<template>
    <div class="switch-container" @click="mode = !mode">
        <span class="switch-button" :class="{on: mode, off: !mode}"></span>
    </div>
</template>
<style scoped>
.switch-container {
    border-radius: 16px;
    border: 2px solid var(--color-font-primary);
    box-sizing: border-box;
    display: inline-block;
    height: 28px;
    margin: 8px;
    position: relative;
    width: 48px;
}
.switch-button {
    background: var(--color-font-primary);
    border-radius: 32px;
    display: inline-block;
    height: 20px;
    left: 0;
    margin: 2px;
    position: absolute;
    transition: all .2s;
    width: 20px;
}
.switch-button.off {
    transform: translateX(100%);
}
</style>