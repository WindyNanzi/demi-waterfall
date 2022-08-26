<script setup lang='ts'>
import type { PropType } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', { ...props })
}
</script>

<template>
  <div cursor-pointer flex flex-col :title="title" @click="handleClick">
    <img mb-1 :src="src" class="w-100%" rounded>
    <div text-14px>
      {{ title }}
    </div>
    <div text-13px class="c-gray/70">
      {{ date }}
    </div>
  </div>
</template>
