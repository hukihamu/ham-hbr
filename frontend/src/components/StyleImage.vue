<script setup lang="ts">
const {cover, src} = defineProps({
  src: String
})
</script>

<template>
  <v-img :src="src"
         width="178px"
         height="72px"
         class="ma-1"/>
</template>