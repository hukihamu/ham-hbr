<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import {images} from '@/utils/images'
import {computed} from 'vue'
import {getListById, zeroToOne} from '@/utils/utiles'
import {storeToRefs} from 'pinia'
import {useStorageStore, useStore} from '@/store'

const store = useStore()
store.init('styles')
const {styles} = storeToRefs(store)
const {growthProgress, growthDone, ownedStyles} = storeToRefs(useStorageStore())
const grTodo = computed(() => styles.value.filter(it =>
    it.tier === 'SS'
    && it.growth_abi
    && ownedStyles.value.includes(it.id)
    && !growthProgress.value.includes(it.id)
    && !growthDone.value.includes(it.id)))
const grProgress = computed({
  get: () => getListById(growthProgress.value, styles.value),
  set: (values) => growthProgress.value = values.map(it => it!!.id),
})
const grDone = computed({
  get: () => getListById(growthDone.value, styles.value),
  set: (values) => growthDone.value = values.map(it => it!!.id),
})

function growthTypeCounter(type: string) {
  return [...grTodo.value, ...grProgress.value]
      .reduce((sum, current) => {
        if (current.type === type && !current.elements.length) {
          sum += 51
        }
        return sum
      }, 0)
}

function growthElementCounter(element: 'Fire' | 'Light' | 'Thunder' | 'Dark' | 'Ice') {
  return [...grTodo.value, ...grProgress.value]
      .reduce((sum, current) => {
        if (current.elements.includes(element)) {
          sum += 51
        }
        return sum
      }, 0)
}
</script>

<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="4" md>
          <v-avatar :image="images.typeIcon('Slash')"/>
          {{ growthTypeCounter('Slash') }}個
        </v-col>
        <v-col cols="4" md>
          <v-avatar :image="images.typeIcon('Stab')"/>
          {{ growthTypeCounter('Stab') }}個
        </v-col>
        <v-col cols="4" md>
          <v-avatar :image="images.typeIcon('Strike')"/>
          {{ growthTypeCounter('Strike') }}個
        </v-col>
        <v-col>
          <v-avatar :image="images.elementIcon('Fire')"/>
          {{ growthElementCounter('Fire') }}個
        </v-col>
        <v-col>
          <v-avatar :image="images.elementIcon('Ice')"/>
          {{ growthElementCounter('Ice') }}個
        </v-col>
        <v-col>
          <v-avatar :image="images.elementIcon('Thunder')"/>
          {{ growthElementCounter('Thunder') }}個
        </v-col>
        <v-col>
          <v-avatar :image="images.elementIcon('Light')"/>
          {{ growthElementCounter('Light') }}個
        </v-col>
        <v-col>
          <v-avatar :image="images.elementIcon('Dark')"/>
          {{ growthElementCounter('Dark') }}個
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle class="text-center">
      {{Math.round(grDone.length / zeroToOne(ownedStyles.length) * 1000) / 10}}%
    </v-card-subtitle>
    <v-card-text  class="overflow-y-auto" style="max-height: calc(100vh - 230px)">
      <div class="d-flex flex-row justify-center">
        <div class="border column flex-md-grow-1">
          <VueDraggable :model-value="grTodo"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100 d-flex flex-wrap justify-start align-content-start"
                        group="growth">
            <template #header>
              <div class="title">未育成</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)"
                     width="178px"
                     height="72px"
                     max-width="178px"
                     max-height="72px"
                     class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="grProgress"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="growth">
            <template #header>
              <div class="title">育成中</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px"
                     max-width="178px"
                     max-height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column flex-md-grow-1">
          <VueDraggable v-model="grDone"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100 d-flex flex-wrap justify-start align-content-start"
                        group="growth">
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