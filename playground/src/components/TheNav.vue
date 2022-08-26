<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
</script>

<template>
  <nav
    px8 py4 mb-4
    border="b gray-400/10"
    flex="~ gap2"
    text-xl items-center
  >
    <RouterLink to="/" flex="~ gap2" items-center>
      <img src="/favicon.svg" h-10>
    </RouterLink>

    <div flex-auto />

    <div flex="~ gap4" items-center>
      <button class="icon-btn !outline-none" @click="toggleDark()">
        <div v-if="isDark" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>
    </div>
  </nav>
</template>
