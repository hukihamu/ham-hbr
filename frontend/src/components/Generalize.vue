<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import {images} from '@/utils/images'
import {storeToRefs} from 'pinia'
import {useStorageStore, useStore} from '@/store'
import {computed} from 'vue'
import {getListById, zeroToOne} from '@/utils/utiles'

const store = useStore()
store.init('styles')
const {styles} = storeToRefs(store)
const {generalizeProgress, generalizeDone, ownedStyles} = storeToRefs(useStorageStore())
const geTodo = computed(() => styles.value.filter(it =>
    it.tier === 'SS'
    && it.generalize
    && ownedStyles.value.includes(it.id)
    && !generalizeProgress.value.includes(it.id)
    && !generalizeDone.value.includes(it.id)))
const geProgress = computed({
  get: () => getListById(generalizeProgress.value, styles.value),
  set: (values) => generalizeProgress.value = values.map(it => it!!.id),
})
const geDone = computed({
  get: () => getListById(generalizeDone.value, styles.value),
  set: (values) => generalizeDone.value = values.map(it => it!!.id),
})
</script>

<template>
  <v-card>
    <v-card-title class="text-center">
      <v-avatar :image="images.materialLv7()"/>
      {{ (geTodo.length + geProgress.length) * 3 }}個
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{Math.round(geDone.length / zeroToOne(geTodo.length + geProgress.length + geDone.length) * 1000) / 10}}%
    </v-card-subtitle>
    <v-card-text class="overflow-y-auto" style="max-height: calc(100vh - 230px)">
      <div class="d-flex flex-row justify-center">
        <div class="border column flex-md-grow-1">
          <VueDraggable :model-value="geTodo"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100 d-flex flex-wrap justify-start align-content-start"
                        group="generalize">
            <template #header>
              <div class="title">未育成</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px"
                     max-width="178px"
                     max-height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="geProgress"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="generalize">
            <template #header>
              <div class="title">育成中</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column flex-md-grow-1">
          <VueDraggable v-model="geDone"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100 d-flex flex-wrap justify-start align-content-start"
                        group="generalize">
            <template #header>
              <div class="title">育成済</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px"
                     max-width="178px"
                     max-height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.title {
  position: sticky;
  top: -16px;
  background-color: rgb(var(--v-theme-surface));
  z-index: 10;
  text-align: center;
  width: 100%;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 4px;
}

.column {
  min-width: 185px;
}
</style>