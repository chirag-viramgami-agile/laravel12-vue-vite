<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore();
const router = useRouter();

const logout = async () => {
    await auth.logout();
    router.push('/login');
};
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <header class="bg-slate-800 p-4 text-white flex justify-end">

            <span class="grid grid-cols-2 gap-2 text-center" v-if="!auth.isAuthenticated">
                <div class="bg-red-500 p-2 rounded-md font-medium cursor-pointer"
                    @click="() => router.push({ name: 'login' })">
                    Login
                </div>

                <div class="bg-red-500 p-2 rounded-md font-medium cursor-pointer"
                    @click="() => router.push({ name: 'register' })">
                    Register
                </div>

            </span>

            <span class="grid grid-cols-2 gap-2 text-center" v-else>
                <div class="bg-red-500 p-2 rounded-md font-medium cursor-pointer"
                    @click="() => router.push({ name: 'admin.dashboard' })">
                    Dashboard
                </div>
                <div class="bg-red-500 p-2 rounded-md font-medium cursor-pointer" @click="logout">
                    Logout
                </div>
            </span>


        </header>
        <main class="flex flex-1 items-center justify-center bg-gray-700 text-5xl">
            Welcome Home
        </main>
    </div>
</template>
