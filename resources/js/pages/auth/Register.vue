<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const registerData = reactive({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
});
const error = ref('');
const loading = ref('');
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
    try {
        await auth.register(registerData);
        error.value = '';
        router.push('/dashboard');
    } catch (e) {
        error.value = e.response.data.errors;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
        <form @submit.prevent="submit" class="bg-white p-6 rounded shadow w-80 space-y-4">
            <h1 class="text-lg font-semibold">Register</h1>

            <div>
                <input v-model="registerData.name" type="text" placeholder="Name"
                    class="w-full border px-3 py-2 rounded" />
                <span v-if="error.name" class="text-red-500 text-sm">{{ error.name[0] }}</span>
            </div>
            <div>
                <input v-model="registerData.email" type="email" placeholder="Email"
                    class="w-full border px-3 py-2 rounded" />
                <span v-if="error.email" class="text-red-500 text-sm">{{ error.email[0] }}</span>
            </div>
            <div>
                <input v-model="registerData.password" type="password" placeholder="Password"
                    class="w-full border px-3 py-2 rounded" />
                <span v-if="error.password" class="text-red-500 text-sm">{{ error.password[0] }}</span>
            </div>

            <div>
                <input v-model="registerData.password_confirmation" type="password" placeholder="Password confirmation"
                    class="w-full border px-3 py-2 rounded" />
            </div>

            <div class="text-sm">
                <span>Do you have account ?</span>
                <span class="text-blue-600 mx-1 cursor-pointer"
                    @click="() => router.push({ name: 'login' })">Login</span>
            </div>

            <button type="submit" class="w-full bg-slate-800 text-white py-2 rounded" :disabled="loading.value">
                {{ loading.value ? 'Registering...' : 'Register' }}
            </button>

        </form>
    </div>
</template>
