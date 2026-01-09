<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const previousPath = router.options.history.state.back;

// You can then use it to go back manually if access is restored:
const goBack = () => {
  if (previousPath) {
    router.push(previousPath);
  } else {
    router.push('/'); // Fallback if there is no history
  }
};
</script>

<template>
    <div class="bg-gray-500 flex h-screen text-white">
        <div class="flex flex-1 text-2xl h-full justify-center items-center">
            <div class="text-center">
                <div class="block font-bold">403 | FORBIDDEN</div>
                <p class="text-sm mt-2">Checking for restored access...</p>
                <button
                    @click="handleRedirect"
                    class="mt-4 px-4 py-2 bg-white text-gray-800 rounded text-sm"
                >
                    Try Again
                </button>
            </div>
        </div>
    </div>
</template>
