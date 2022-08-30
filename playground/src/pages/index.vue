<script setup lang="ts">
import list from '../assets/imageInfos'

const handleClick = (data: any) => {
  alert(`${data.title}说：爱你鸭~小周周！`)
}
</script>

<template>
  <div px6 py-2 flex>
    <div flex-1>
      <Waterfall :data-list="list">
        <template #default="scope">
          <image-card
            :key="scope.data.src"
            v-bind="scope.data"
            @click="handleClick(scope.data)"
          />
        </template>
      </Waterfall>
    </div>
  </div>
</template>

<style scoped>
:deep(.waterfall-move) {
  transition: transform 600ms ease-in-out 50ms;
}
</style>
