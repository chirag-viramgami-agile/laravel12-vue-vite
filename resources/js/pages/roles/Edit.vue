<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPermissions, getData, updateData } from '@/services/role.service'
import Card from '@/components/Card.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const saving = ref(false)
const errors = ref({})
const generalError = ref(null)

const allPermissions = ref([])
const role = ref({
    name: '',
    permissions: []
})

const roleId = route.params.id
// 1. Fetch role
onMounted(async () => {
    try {
        const [roleRes, permissionsRes] = await Promise.all([
            getData(roleId),
            fetchPermissions()
        ])
        role.value = {
            name: roleRes.name,
            permissions: roleRes.permissions
        }
        allPermissions.value = permissionsRes.data

    } catch (err) {
        console.log(err);
        generalError.value = 'Failed to load role'
    } finally {
        loading.value = false
    }
})

// 2. Update role
async function updateFormData() {
    saving.value = true
    generalError.value = errors.value = null
    try {
        const result = await updateData(roleId, role)
        router.push('/admin/roles')
    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors
        }
    } finally {
        saving.value = false
    }
}
</script>

<template>
    <Card>
        <h1 class="text-xl font-semibold mb-4">Edit Role</h1>

        <div v-if="loading">Loading…</div>

        <div v-else>

            <form @submit.prevent="updateFormData">
                <p v-if="generalError" class="text-red-600 text-sm">
                    {{ generalError }}
                </p>
                <div class="mb-3">
                    <label class="block mb-1">Name</label>
                    <input v-model="role.name" type="text" class="border px-3 py-2 w-full" />
                    <p v-if="errors?.name" class="text-red-600 text-sm">
                        {{ errors.name[0] }}
                    </p>
                </div>

                <div class="mb-4">
                    <label class="block mb-2 font-semibold">Permissions</label>

                    <div class="grid grid-cols-2 gap-2">
                        <label
                            v-for="permission in allPermissions"
                            :key="permission"
                            class="flex items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                :value="permission"
                                v-model="role.permissions"
                            />
                            {{ permission }}
                        </label>
                    </div>

                    <p v-if="errors?.permissions" class="text-red-600 text-sm">
                        {{ errors.permissions[0] }}
                    </p>
                </div>

                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded" :disabled="saving">
                    {{ saving ? 'Saving…' : 'Update Role' }}
                </button>
            </form>
        </div>
    </Card>

</template>
