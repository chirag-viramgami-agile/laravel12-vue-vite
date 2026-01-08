<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  to: {
    type: [String, Object],
    // required: true,
    default: null
  }
})
const emit = defineEmits(['click'])
const router = useRouter();

function handleClick(event) {
  if (props.to) {
    router.push(props.to)
  } else {
    emit('click', event)
  }
}
</script>
<template>
    <button class="px-4 py-2 rounded text-white mx-1 my-2 cursor-pointer bg-blue-600 hover:bg-blue-700"
        @click="handleClick"
        >
        <slot></slot>
    </button>
</template>
