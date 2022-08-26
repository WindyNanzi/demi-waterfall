<script setup lang="ts">
import list from '../assets/imageInfos'
</script>

<template>
  <div px6 py-2 flex>
    <div flex-1>
      <Waterfall :data-list="list">
        <template #default="scope">
          <image-card :key="scope.data.src" v-bind="scope.data" />
        </template>
      </Waterfall>
    </div>
  </div>
</template>
