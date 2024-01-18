<script lang="ts" setup>
import {useStorageStore, useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {scripts} from '@/scripts'
import {useTheme} from 'vuetify'

const {isAdmin} = storeToRefs(useStore())
scripts.send('isAdmin').then(it => {
  isAdmin.value = it
})
const vTheme = useTheme()
const {theme} = storeToRefs(useStorageStore())
vTheme.global.name.value = theme.value

function toggleTheme() {
  theme.value = vTheme.global.current.value.dark ? 'light' : 'dark'
  vTheme.global.name.value = theme.value
}
</script>
<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover rail class="py-3">
      <v-list-item to="/" title="index" prepend-icon="mdi-home"/>
      <v-list-item to="/styles" title="スタイル" prepend-icon="mdi-palette-swatch"/>
      <v-list-item to="/user" title="ユーザ情報" prepend-icon="mdi-account"/>
      <template #append>
        <v-list-item @click="toggleTheme" title="テーマ切り替え" prepend-icon="mdi-theme-light-dark"/>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
