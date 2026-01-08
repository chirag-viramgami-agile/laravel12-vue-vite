<script setup>
import { adminMenu } from '@/config/menu'
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const auth = useAuthStore();
const route = useRoute()

const isActive = (path) => route.path === path

const filteredAdminMenu = computed(() =>
  adminMenu.filter(menu => auth.can(menu.permission))
)
</script>

<template>
    <aside class="w-64 bg-slate-900 text-slate-100">
        <div class="p-4 text-lg font-semibold border-b border-slate-800">
            Admin
        </div>

        <nav class="p-4 space-y-1">

            <RouterLink v-for="menuItem in filteredAdminMenu"
                 :key="menuItem.to"
                 :to="menuItem.to"
                  class="nav-link"
                 :class="isActive(menuItem.to) && 'bg-slate-800'"
                >
                {{ menuItem.label }}
            </RouterLink>

        </nav>
    </aside>
</template>

<style scoped>
.nav-link {
    display: block;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
}

.nav-link:hover {
    background-color: rgb(30 41 59);
    /* slate-800 */
}
</style>
