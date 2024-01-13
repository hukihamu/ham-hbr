<script setup lang="ts">
import {scripts, useStore} from '@/store.ts'
import {storeToRefs} from 'pinia'

const {characters, user, styles} = storeToRefs(useStore())
scripts.send('getCharacters').then(it => {
  characters.value = it
})
scripts.send('getStyles').then(it => {
  styles.value = it
})
scripts.send('getUserData').then(it => {
  user.value = it
})
</script>

<template>
<v-app>
  <v-navigation-drawer permanent expand-on-hover rail>
    <v-list-item to="/" title="index" prepend-icon="mdi-home"></v-list-item>
    <v-list-item to="/styles" title="スタイル" prepend-icon="mdi-palette-swatch"></v-list-item>
    <v-list-item to="/user" title="ユーザ" prepend-icon="mdi-account"></v-list-item>
  </v-navigation-drawer>
  <v-main>
    <router-view />
  </v-main>
</v-app>
</template>

<style scoped>

</style>