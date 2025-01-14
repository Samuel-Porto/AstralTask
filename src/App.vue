<script setup>
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './store/firebase';

const router = useRouter();
const isLoading = ref(true);

onAuthStateChanged(auth, cred => {
  router.replace(cred? '/user': '/auth')
  .then(() => isLoading.value = false);
});
</script>

<template>
  <template v-if="isLoading">
    loading...
  </template>
  <template v-else>
    <div class="app-view">
      <RouterView />
    </div>
  </template>
</template>
<style scoped>
.app-view {
  margin: 0 auto;
  max-width: 1440px;
}
</style>