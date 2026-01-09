<script setup>
import Button from '@/components/Button.vue'
import { onMounted, reactive } from 'vue';
import { listData } from '@/services/role.service'
import { PERMISSIONS } from '@/constants/permissions';

const roles = reactive({});
onMounted(async () => {
    const data = await listData();
    roles.value = data

})

</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-2xl font-semibold items-center">
                Roles
            </h1>

            <Button v-if="$can(PERMISSIONS.USERS_CREATE)" :to="{name:'role-create'}">Create</Button>
        </div>

        <div class="bg-white rounded shadow overflow-hidden">
            <table class="w-full text-sm">
                <thead class="bg-slate-50 border-b">
                    <tr>
                        <th class="text-left px-4 py-3">Name</th>
                        <th class="text-left px-4 py-3">Permissions</th>
                        <th class="text-left px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="role in roles.value" :key="role">
                        <tr class="border-b">
                            <td class="px-4 py-3">{{ role.name }}</td>
                            <td class="px-4 py-3">
                                <span class="badge badge-blue"
                                v-for="permission in role.permissions" :key="permission">
                                    {{ permission }}
                                </span>
                            </td>
                            <td class="px-4 py-3">
                                <Button class="bg-blue-600  hover:bg-blue-700"
                                    :to="{ name: 'role-edit', params: { id: role.id } }">Edit</Button>

                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
