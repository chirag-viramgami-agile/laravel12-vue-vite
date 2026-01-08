<template>
    <div class="dark:bg-white bg-gray-600 rounded-3xl">
        <div v-if="$slots.header" class="card-header text-xl font-semibold p-6">
            <slot name="header" />
        </div>
        <!-- Default Slot (Body) -->
        <div class="card-body mx-auto p-6">
            <slot />
        </div>

        <!-- Footer Slot -->
        <div v-if="$slots.footer" class="card-footer flex justify-end p-6">
            <slot name="footer" />
        </div>
    </div>
</template>

<style scoped>
/* .card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; } */
/* .card-header { padding: 1rem; background: #f5f5f5; border-bottom: 1px solid #ddd; } */
/* .card-body { padding: 1rem; } */
/* .card-footer { padding: 0.5rem 1rem; border-top: 1px solid #ddd; } */
</style>
