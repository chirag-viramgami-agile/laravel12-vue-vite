<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUser, updateUser } from '@/services/user.service'
import Card from '@/components/Card.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const saving = ref(false)
const errors = ref({})
const generalError = ref()

const user = ref({
    name: '',
    email: ''
})

const userId = route.params.id
// 1. Fetch user
onMounted(async () => {
    try {
        const data = await getUser(userId);
        user.value = {
            name: data.name,
            email: data.email
        }
    } catch (err) {
        console.log(err);
        generalError.value = 'Failed to load user'
    } finally {
        loading.value = false
    }
})

// 2. Update user
async function updateUserData() {
    saving.value = true
    generalError.value = errors.value = null
    try {
        const result = await updateUser(userId, user)
        router.push('/admin/users')
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
        <h1 class="text-xl font-semibold mb-4">Edit User</h1>

        <div v-if="loading">Loading…</div>

        <div v-else>

            <form @submit.prevent="updateUserData">
                <p v-if="generalError" class="text-red-600 text-sm">
                    {{ generalError }}
                </p>
                <div class="mb-3">
                    <label class="block mb-1">Name</label>
                    <input v-model="user.name" type="text" class="border px-3 py-2 w-full" />
                    <p v-if="errors?.name" class="text-red-600 text-sm">
                        {{ errors.name[0] }}
                    </p>
                </div>

                <div class="mb-3">
                    <label class="block mb-1">Email</label>
                    <input v-model="user.email" type="email" class="border px-3 py-2 w-full" />

                    <p v-if="errors?.email" class="text-red-600 text-sm">
                        {{ errors.email[0] }}
                    </p>
                </div>

                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded" :disabled="saving">
                    {{ saving ? 'Saving…' : 'Update User' }}
                </button>
            </form>
        </div>
    </Card>
</template>
