<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useStorageStore, useStore} from '@/store'
import {images} from '@/utils/images'
import {computed, ref, watch} from 'vue'
import VueDraggable from 'vuedraggable'
import {getListById, zeroToOne} from '@/utils/utiles'

const store = useStore()
store.init('orb', 'characters')
const {orb, characters} = storeToRefs(store)
const {orbProgress, orbDone} = storeToRefs(useStorageStore())
const selectOrb = ref<number>(-1)
watch(orb, newValue => {
  if (newValue[0]) selectOrb.value = newValue[0].id
},{immediate: true})
const oTodo = computed(() => characters.value
    .filter(it => !(orbProgress.value[selectOrb.value] ?? []).includes(it.id) && !(orbDone.value[selectOrb.value] ?? []).includes(it.id)))
const oProgress = computed({
  get: () => getListById(orbProgress.value[selectOrb.value] ?? [], characters.value),
  set: (values) => orbProgress.value[selectOrb.value] = values.map(it => it!!.id),
})
const oDone = computed({
  get: () => getListById(orbDone.value[selectOrb.value] ?? [], characters.value),
  set: (values) => orbDone.value[selectOrb.value] = values.map(it => it!!.id),
})
function toSSImage(label: string) {
  return images.image(label.replace('KAsakura', 'Karen') + 'Default_R3_Select.webp')
}
</script>

<template>
<v-card v-if="selectOrb !== -1">
  <v-card-title>
    <v-select label="対象オーブ選択" :items="orb" v-model="selectOrb" item-value="id" item-title="name">
      <template #item="{item, props}">
        <v-list-item v-bind="props">
          <template #prepend>
            <v-avatar :image="images.image(item.raw.image)" />
          </template>
        </v-list-item>
      </template>
      <template #selection="{item}">
        <v-avatar :image="images.image(item.raw.image)" />{{item.title}}
      </template>
    </v-select>
  </v-card-title>
  <v-card-subtitle class="text-center">
    {{Math.round(oDone.length / zeroToOne(characters.length) * 1000) / 10}}%
  </v-card-subtitle>
  <v-card-text class="overflow-y-auto pt-0" style="max-height: calc(100vh - 270px)">
    <div class="d-flex flex-row justify-center">
      <div class="border column flex-md-grow-1">
        <VueDraggable :model-value="oTodo"
                      direction="vertical"
                      item-key="id"
                      class="w-100 h-100 d-flex flex-wrap justify-start align-content-start"
                      group="orb">
          <template #header>
            <div class="title">未育成</div>
          </template>
          <template #item="{element}">
            <v-img :src="toSSImage(element.chara_label)" width="178px" height="72px"
                   max-width="178px"
                   max-height="72px" class="ma-1"/>
          </template>
        </VueDraggable>
      </div>
      <div class="border column">
        <VueDraggable v-model="oProgress"
                      direction="vertical"
                      item-key="id"
                      class="w-100 h-100"
                      group="orb">
          <template #header>
            <div class="title">育成中</div>
          </template>
          <template #item="{element}">
            <v-img :src="toSSImage(element.chara_label)" width="178px" height="72px" class="ma-1"/>
          </template>
        </VueDraggable>
      </div>
      <div class="border column flex-md-grow-1">
        <VueDraggable v-model="oDone"
                      direction="vertical"
                      item-key="id"
                      class="w-100 h-100 d-flex flex-wrap justify-start align-content-start"
                      group="orb">
          <template #header>
            <div class="title">育成済</div>
          </template>
          <template #item="{element}">
            <v-img :src="toSSImage(element.chara_label)" width="178px" height="72px"
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