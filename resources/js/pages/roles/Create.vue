<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { createData, fetchPermissions } from '@/services/role.service'
import Card from '@/components/Card.vue'

const router = useRouter()
const loading = ref(false)
const saving = ref(false)
const errors = ref({})
const generalError = ref()

const allPermissions = ref([])
const role = ref({
    name: '',
    permissions: []
})

onMounted(async () => {
    try {
        const { data } = await fetchPermissions()
        allPermissions.value = data
    } catch (e) {
        generalError.value = 'Failed to load permissions'
    } finally {
        loading.value = false
    }
})

// 2. Update role
async function submitForm() {
    saving.value = true
    generalError.value = errors.value = null
    try {
        const result = await createData(role)
        router.push('/admin/roles')
    } catch (err) {
        console.log(err);
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
        <template #header>
            Create Role
        </template>
        <template #default>
            <div v-if="loading">Loading…</div>
            <div v-else>
                <form @submit.prevent="submitForm" autocomplete="off" aria-autocomplete="off">
                    <p v-if="generalError" class="text-red-600 text-sm">
                        {{ generalError }}
                    </p>
                    <div class="mb-3">
                        <label class="block mb-1">Name</label>
                        <input v-model="role.name" type="text" name="name" class="border px-3 py-2 w-full" />
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
                        {{ saving ? 'Saving…' : 'Create Role' }}
                    </button>
                </form>
            </div>

        </template>
    </Card>
</template>
