<template>
  <div class="max-w-xl mx-auto mt-2 px-3">
      <NuxtPage/>
  </div>
  <div class="fixed bottom-1 left-0 right-0 flex justify-center  mt-20">
        <span class="text-xs dark:text-gray-400 text-gray-600">
        2023 |
          <a class="dark:text-gray-300 text-gray-700 font-semibold hover:dark:text-gray-200 hover:text-gray-800 transition-colors duration-100" href="https://www.linkedin.com/in/stranavadavid/">Gandalf The Gray</a>
          |
          <a class="dark:text-gray-300 text-gray-700 font-semibold hover:dark:text-gray-200 hover:text-gray-800 transition-colors duration-100" href="https://www.buymeacoffee.com/gandalfthegray">Buy me a coffee!</a>
        </span>
  </div>
</template>
<script lang="ts" setup>
useHead({
  title: 'Prochazka prirodou',
  link: [{rel: 'icon', type: 'image/x-icon', href: 'favicon.svg'}]
})
</script>

<style>
body {
    @apply bg-gray-100 dark:bg-gray-900;
}
</style>