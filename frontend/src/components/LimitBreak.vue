<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import {computed} from 'vue'
import {storeToRefs} from 'pinia'
import {useStorageStore, useStore} from '@/store'
import {images} from '@/utils/images'
import {getListById} from '@/utils/utiles'

const store = useStore()
store.init('styles')
const {styles} = storeToRefs(store)
const {lb0, lb1, lb2, lb3, lb4, lb5, lb6, ownedStyles} = storeToRefs(useStorageStore())
const limitBreak = computed(() => styles.value.filter(it => it.tier === 'SS' && !ownedStyles.value.includes(it.id)))

const limitBreak0 = computed({
  get: () => getListById(lb0.value, styles.value),
  set: (values) => lb0.value = values.map(it => it!!.id),
})
const limitBreak1 = computed({
  get: () => getListById(lb1.value, styles.value),
  set: (values) => lb1.value = values.map(it => it!!.id),
})
const limitBreak2 = computed({
  get: () => getListById(lb2.value, styles.value),
  set: (values) => lb2.value = values.map(it => it!!.id),
})
const limitBreak3 = computed({
  get: () => getListById(lb3.value, styles.value),
  set: (values) => lb3.value = values.map(it => it!!.id),
})
const limitBreak4 = computed({
  get: () => getListById(lb4.value, styles.value),
  set: (values) => lb4.value = values.map(it => it!!.id),
})
const limitBreak5 = computed({
  get: () => getListById(lb5.value, styles.value),
  set: (values) => lb5.value = values.map(it => it!!.id),
})
const limitBreak6 = computed({
  get: () => getListById(lb6.value, styles.value),
  set: (values) => lb6.value = values.map(it => it!!.id),
})
</script>

<template>
  <v-card class="overflow-auto" max-height="calc(100vh - 160px)">
    <v-card-text>
      <div class="d-flex flex-row">
        <div class="border column">
          <VueDraggable :model-value="limitBreak"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">未所持</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak0"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">0凸</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak1"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">1凸</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak2"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">2凸</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak3"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">2.5凸</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak4"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">3凸</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak5"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">3.5凸</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak6"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">4凸</div>
            </template>
            <template #item="{element}">
              <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
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
  top: 0;
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