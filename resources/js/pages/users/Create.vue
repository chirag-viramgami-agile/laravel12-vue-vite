<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUser } from '@/services/user.service'
import Card from '@/components/Card.vue'

const router = useRouter()
const loading = ref(false)
const saving = ref(false)
const errors = ref({})
const generalError = ref()

const user = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

// 2. Update user
async function submitForm() {
    saving.value = true
    generalError.value = errors.value = null
    try {
        const result = await createUser(user)
        router.push('/admin/users')
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
        <h1 class="text-xl font-semibold mb-4">Create User</h1>

        <div v-if="loading">Loading…</div>

        <div v-else>

            <form @submit.prevent="submitForm" autocomplete="off" aria-autocomplete="off">
                <p v-if="generalError" class="text-red-600 text-sm">
                    {{ generalError }}
                </p>
                <div class="mb-3">
                    <label class="block mb-1">Name</label>
                    <input v-model="user.name" type="text"
                    name="name" class="border px-3 py-2 w-full"  />
                    <p v-if="errors?.name" class="text-red-600 text-sm">
                        {{ errors.name[0] }}
                    </p>
                </div>

                <div class="mb-3">
                    <label class="block mb-1">Email</label>
                    <input v-model="user.email" type="email" name="email" class="border px-3 py-2 w-full"  />

                    <p v-if="errors?.email" class="text-red-600 text-sm">
                        {{ errors.email[0] }}
                    </p>
                </div>

                <div class="mb-3">
                    <label class="block mb-1">Password</label>
                    <input v-model="user.password" type="password" class="border px-3 py-2 w-full"  />

                    <p v-if="errors?.password" class="text-red-600 text-sm">
                        {{ errors.password[0] }}
                    </p>
                </div>

                <div class="mb-3">
                    <label class="block mb-1">Password Confirmation</label>
                    <input v-model="user.password_confirmation" type="password" class="border px-3 py-2 w-full"  />

                    <p v-if="errors?.password_confirmation" class="text-red-600 text-sm">
                        {{ errors.password_confirmation[0] }}
                    </p>
                </div>

                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded" :disabled="saving">
                    {{ saving ? 'Saving…' : 'Create User' }}
                </button>
            </form>
        </div>
    </Card>
</template>
