<script setup lang="ts">
const {src, cover} = defineProps({
  src: String,
  cover: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <v-img :src="src"
         width="178px"
         height="72px"
         :class="['ma-1', 'rounded-lg', cover ? 'mc-cover': '']"/>
</template>
<style>
.mc-cover img{
  height: 178px;
  top: -21px;
}
</style>