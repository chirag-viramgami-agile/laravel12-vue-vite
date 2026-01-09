<script setup>
import { useMenu } from "@/composables/useMenu";
import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router'

const { menu } = useMenu();
const route = useRoute()
const manualOpen = ref(null)

const isOpen = (itemLabel) => {
    if (manualOpen.value === itemLabel) return true
    return false;
}
const toggleMenu = (item) => {
    const isOpened = isOpen(item.label)
    if(isOpened){
        manualOpen.value = null;
    }else{
        manualOpen.value = item.label
    }
}

const setOpenMenu = (item) => {
    // Close all other parents
    manualOpen.value = null;
    let hasActive = false;

    hasActive = item.children?.some(child =>
        route.matched.some(r => r.path === child.to)
    )
    if(!hasActive){
        hasActive = (!item.children && route.path === item.to)
    }
    manualOpen.value = hasActive?item.label:null

    return hasActive;
}

watch(
    () => route.fullPath,
    () => {
        for (const item of menu.value) {
            const res = setOpenMenu(item);
            if (res) {
                break;
            }
        }
    },
    { immediate: true }
)
</script>

<template>
    <aside class="w-64 bg-slate-900 text-slate-100">
        <div class="p-4 text-lg font-semibold border-b border-slate-800">
            Admin
        </div>

        <nav class="p-4 space-y-1">
            <template v-for="item in menu" :key="item.label">

                <RouterLink v-if="item.to" :to="item.to" class="nav-link" exact-active-class="bg-slate-800">
                    {{ item.label }}
                </RouterLink>

                <div v-else>
                    <!-- Parent clickable -->
                    <div class="w-full text-left uppercase py-3 px-2 flex items-center justify-between"
                        @click="toggleMenu(item)">
                        {{ item.label }}
                        <span :class="{ 'rotate-90': isOpen(item.label) }">▶</span>
                    </div>

                    <!-- Children -->
                    <div v-show="isOpen(item.label)">
                        <RouterLink v-for="child in item.children || []"
                        :key="child.to" :to="child.to" class="nav-link"
                        exact-active-class="bg-slate-800">
                            {{ child.label }}
                        </RouterLink>
                    </div>
                </div>
            </template>
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
