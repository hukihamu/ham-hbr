<script setup lang="ts">
import LimitBreak from '@/components/LimitBreak.vue'
import OwnedStyles from '@/components/OwnedStyles.vue'
import {useStorageStore, useStore} from '@/store'
import {storeToRefs} from 'pinia'
import Generalize from '@/components/Generalize.vue'
import Growth from '@/components/Growth.vue'
import Stories from '@/components/Stories.vue'

const store = useStore()
store.init('styles', 'events', 'orb', 'souls', 'chapters')
const {userState} = storeToRefs(useStorageStore())
</script>

<template>
<v-container fluid>
  <v-card>
    <v-tabs v-model="userState.tab">
      <v-tab value="limit-break">凸状況</v-tab>
      <v-tab value="owned-styles">所持スタイル</v-tab>
      <v-tab value="generalize">ジェネライズ</v-tab>
      <v-tab value="growth">宝珠</v-tab>
      <v-tab value="orb">オーブ</v-tab>
      <v-tab value="stories">ストーリー順早見表</v-tab>
    </v-tabs>
    <v-window v-model="userState.tab">
      <v-window-item value="limit-break" class="mt-3">
        <LimitBreak />
      </v-window-item>
      <v-window-item value="owned-styles" class="mt-3">
        <OwnedStyles />
      </v-window-item>
      <v-window-item value="generalize" class="mt-3">
        <Generalize />
      </v-window-item>
      <v-window-item value="growth" class="mt-3">
        <Growth />
      </v-window-item>
      <v-window-item value="orb" class="mt-3"></v-window-item>
      <v-window-item value="stories" class="mt-3">
        <Stories />
      </v-window-item>
    </v-window>
  </v-card>
</v-container>
</template>

<style scoped>

</style>