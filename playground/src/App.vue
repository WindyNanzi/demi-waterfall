<script setup lang="ts">
</script>

<template>
  <main
    font-sans text="gray-700 dark:gray-200" relative
  >
    <TheNav />
    <RouterView v-slot="{ Component }">
      <transition name="page-fade">
        <component
          :is="Component"
        />
      </transition>
    </RouterView>
  </main>
</template>
