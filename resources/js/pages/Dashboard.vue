<script setup>
import Card from '@/components/Card.vue';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const stats = reactive({
    users: 0,
    roles: 0,
});
onMounted(async () => {
    const { data } = await axios.get('/api/admin/dashboard');
    Object.assign(stats, data);
})
</script>

<template>
    <div>
        <h1 class="text-2xl font-semibold mb-6">
            Dashboard
        </h1>

        <div class="grid grid-cols-3 gap-6">
            <div @click="()=>router.push({name:'user-list'})"
                class="bg-white p-6 shadow flex justify-between rounded-xl cursor-pointer"
            >
                <span class="font-semibold">Users</span>
                <strong class="">{{ stats.users }}</strong>
            </div>
            <div @click="()=>router.push({name:'role-list'})"
                class="bg-white p-6 shadow flex justify-between rounded-xl cursor-pointer"
            >
                <span class="font-semibold">Roles</span>
                <strong class="">{{ stats.roles }}</strong>
            </div>
        </div>
    </div>
</template>
