<script setup>

import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();
const logout = async () => {
  await auth.logout();
  router.push('/login');
};
</script>
<template>
      <header class="bg-white border-b px-6 py-4 flex justify-between">
        <div class="font-medium" @click="()=> router.push({name:'home'})">Home</div>
        <button class="text-sm cursor-pointer text-slate-600" @click="logout">Logout</button>
      </header>
</template>
