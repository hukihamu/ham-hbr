<script lang="ts" setup>
import {useStorageStore, useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {scripts} from '@/scripts'
import {useTheme} from 'vuetify'
import {ref, watch} from 'vue'

const {isAdmin, isLoading} = storeToRefs(useStore())
const waitId = ref<number>()
const isAdminLoad = ref(false)
scripts.send('isAdmin').then(async it => {
  isAdmin.value = it
  if (it) {
    isAdminLoad.value = true
    const data = await scripts.send('getAdminData')
    if (data) {
      storageStore.storiesDone.value = data.storiesDone
      storageStore.orbDone.value = data.orbDone
      storageStore.orbProgress.value = data.orbProgress
      storageStore.growthDone.value = data.growthDone
      storageStore.growthProgress.value = data.growthProgress
      storageStore.generalizeDone.value = data.generalizeDone
      storageStore.generalizeProgress.value = data.generalizeProgress
      storageStore.lb0.value = data.lb0
      storageStore.lb1.value = data.lb1
      storageStore.lb2.value = data.lb2
      storageStore.lb3.value = data.lb3
      storageStore.lb4.value = data.lb4
      storageStore.lb5.value = data.lb5
      storageStore.lb6.value = data.lb6
    }
    watch([
      storageStore.lb0, storageStore.lb1, storageStore.lb2, storageStore.lb3,
      storageStore.lb4, storageStore.lb5, storageStore.lb6,storageStore.storiesDone,
      storageStore.generalizeProgress, storageStore.generalizeDone,
      storageStore.growthProgress, storageStore.growthDone,
      storageStore.orbProgress, storageStore.orbDone,
    ], () => {
      const id = Date.now()
      waitId.value = id
      setTimeout(() => {
        if (id === waitId.value) scripts.send('setAdminData', {
          storiesDone: storageStore.storiesDone.value,
          orbDone: storageStore.orbDone.value,
          orbProgress: storageStore.orbProgress.value,
          growthDone: storageStore.growthDone.value,
          growthProgress: storageStore.growthProgress.value,
          generalizeDone: storageStore.generalizeDone.value,
          generalizeProgress: storageStore.generalizeProgress.value,
          lb0: storageStore.lb0.value,
          lb1: storageStore.lb1.value,
          lb2: storageStore.lb2.value,
          lb3: storageStore.lb3.value,
          lb4: storageStore.lb4.value,
          lb5: storageStore.lb5.value,
          lb6: storageStore.lb6.value,
        }).then(isSuccess => {
          waitId.value = undefined
          if (!isSuccess) alert('up失敗')
        })
      }, 5000)
    }, { deep: true })
    isAdminLoad.value = false
  }
})
const vTheme = useTheme()
const storageStore = storeToRefs(useStorageStore())
vTheme.global.name.value = storageStore.theme.value

function toggleTheme() {
  storageStore.theme.value = vTheme.global.current.value.dark ? 'light' : 'dark'
  vTheme.global.name.value = storageStore.theme.value
}

</script>
<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover rail class="py-3">
      <v-list-item to="/" title="index" prepend-icon="mdi-home"/>
      <v-list-item to="/styles" title="スタイル" prepend-icon="mdi-palette-swatch"/>
      <v-list-item to="/user" title="ユーザ情報" prepend-icon="mdi-account"/>
      <template #append>
        <v-list-item @click="toggleTheme" title="テーマ切り替え" prepend-icon="mdi-theme-light-dark" class="mb-9"/>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-overlay :model-value="isLoading"
                 persistent
                 class="align-center justify-center">
        <template #activator>
          <router-view/>
        </template>
        <v-progress-circular indeterminate size="100"/>
      </v-overlay>
      <v-snackbar :model-value="!!waitId">保存中</v-snackbar>
      <v-snackbar :model-value="isAdminLoad">admin読み込み中</v-snackbar>
    </v-main>
  </v-app>
</template>
