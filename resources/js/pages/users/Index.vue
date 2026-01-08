<script setup>
import Button from '@/components/Button.vue'
import { onMounted, reactive } from 'vue';
import { fetchUsers, userDelete } from '@/services/user.service'

const users = reactive({});
onMounted(async () => {
    users.value = await fetchUsers();
})

const processDelete = async (userId) => {
    const res = await userDelete(userId);
    if(res){
        users.value  = await fetchUsers()
    }
}
</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-2xl font-semibold items-center">
                Users
            </h1>

            <Button :to="{name:'user-create'}">Create</Button>
        </div>

        <div class="bg-white rounded shadow overflow-hidden">
            <table class="w-full text-sm">
                <thead class="bg-slate-50 border-b">
                    <tr>
                        <th class="text-left px-4 py-3">Name</th>
                        <th class="text-left px-4 py-3">Email</th>
                        <th class="text-left px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="user in users.value" :key="user">
                        <tr class="border-b">
                            <td class="px-4 py-3">{{ user.name }}</td>
                            <td class="px-4 py-3">{{ user.email }}</td>
                            <td class="px-4 py-3">
                                <Button class="bg-blue-600  hover:bg-blue-700"
                                    :to="{ name: 'user-edit', params: { id: user.id } }">Edit</Button>

                                <Button class="bg-red-600 hover:bg-red-700" @click="processDelete(user.id)">Delete</Button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
