<script setup>
import Button from '@/components/Button.vue'
import { onMounted, reactive, ref } from 'vue';
import { fetchUsers, userDelete } from '@/services/user.service'
import { PERMISSIONS } from '@/constants/permissions';
import { TailwindPagination } from 'laravel-vue-pagination';

const users = ref(null)
const getUsers = async (page = 1) => {
    const { data } = await fetchUsers(page);
    users.value = data
}
onMounted(getUsers)

const processDelete = async (userId) => {
    const res = await userDelete(userId);
    if (res) {
        getUsers(users.value?.meta?.current_page ?? 1)
    }
}
</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-2xl font-semibold items-center">
                Users
            </h1>

            <Button v-if="$can(PERMISSIONS.USERS_CREATE)" :to="{ name: 'user-create' }">Create</Button>
        </div>

        <div class="bg-white rounded shadow overflow-hidden">
            <table class="w-full text-sm">
                <thead class="bg-slate-50 border-b">
                    <tr>
                        <th class="text-left px-4 py-3">ID</th>
                        <th class="text-left px-4 py-3">Name</th>
                        <th class="text-left px-4 py-3">Email</th>
                        <th class="text-left px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody v-if="users">
                    <template v-for="user in users.data" :key="user">
                        <tr class="border-b">
                            <td class="px-4 py-3">{{ user.id }}</td>
                            <td class="px-4 py-3">{{ user.name }}</td>
                            <td class="px-4 py-3">{{ user.email }}</td>
                            <td class="px-4 py-3">
                                <Button v-if="$can(PERMISSIONS.USERS_UPDATE)" class="bg-blue-600  hover:bg-blue-700"
                                    :to="{ name: 'user-edit', params: { id: user.id } }">Edit</Button>

                                <Button v-if="$can(PERMISSIONS.USERS_DELETE)" class="bg-red-600 hover:bg-red-700"
                                    @click="processDelete(user.id)">Delete</Button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>

            <div class="w-full flex justify-center mt-4">
                <TailwindPagination v-if="users" class="paginations w-full justify-center" :data="users" :limit="4"
                    @pagination-change-page="getUsers">

                    <template #prev-nav>
                        <span class="px-2">←</span>
                    </template>
                    <template #next-nav>
                        <span class="px-2">→</span>
                    </template>
                </TailwindPagination>
            </div>

        </div>
    </div>
</template>
