<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
    error.value = '';
    loading.value = false;
    try {
        const res = await auth.login(email.value, password.value);
        router.push('/admin');
    } catch (e) {
        error.value = 'Invalid credentials';
    } finally {
        loading.value = true;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
        <form @submit.prevent="submit" class="bg-white p-6 rounded shadow w-80 space-y-4">
            <h1 class="text-lg font-semibold">Login</h1>

            <input v-model="email" type="email" placeholder="Email" class="w-full border px-3 py-2 rounded" />

            <input v-model="password" type="password" placeholder="Password" class="w-full border px-3 py-2 rounded" />

            <div class="text-sm">
                <span>Don't have account ?</span>
                <span class="text-blue-600 mx-1 cursor-pointer" @click="()=>router.push({name:'register'})">Register</span>
            </div>

            <button type="submit" class="w-full bg-slate-800 text-white py-2 rounded" :disabled="loading.value">
                {{ loading.value ? 'Logging in...' : 'Login' }}
            </button>

            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        </form>
    </div>
</template>
