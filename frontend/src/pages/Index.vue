<script setup lang="ts">
import {useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'
import {scripts} from '@/scripts.ts'

const {isAdmin, styles, characters, skills, passives} = storeToRefs(useStore())
const isLoading = ref(false)
function onUpdateCache() {
  isLoading.value = true
  scripts.send('updateCache').then(isSuccessful => {
    isLoading.value = false
    alert(isSuccessful ? '完了' : '失敗')
    if (isSuccessful) {
      if (styles.value.length) {
        scripts.send('getStyles').then(it => {
          styles.value = it
        })
      }
      if (characters.value.length) {
        scripts.send('getCharacters').then(it => {
          characters.value = it
        })
      }
      if (skills.value.length) {
        scripts.send('getSkills').then(it => {
          skills.value = it
        })
      }
      if (passives.value.length) {
        scripts.send('getPassives').then(it => {
          passives.value = it
        })
      }

    }
  })
}
</script>

<template>
  <v-container fluid>
    <v-btn v-if="isAdmin" @click="onUpdateCache" text="DB更新" :loading="isLoading"/>
  </v-container>
</template>

<style scoped>

</style>