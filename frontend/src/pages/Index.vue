<script setup lang="ts">
import {scripts, useStore} from '@/store'

const store = useStore()
// TODO https://dissidiadb-cbde0.appspot.com.storage.googleapis.com/hbr/latest.json?1704347987413
function onUpdateDB() {
  scripts.send('updateDatabase').then(isSuccessful => {
    alert(isSuccessful ? '完了' : '4分たったので中断')
    if (isSuccessful) {
      scripts.send('getStyles').then(it => {
        store.styles = it
      })
    }
  })
}
</script>

<template>
  <v-container fluid>
    <v-btn @click="onUpdateDB" text="DB更新"/>
  </v-container>
</template>

<style scoped>

</style>