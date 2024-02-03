<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useStorageStore, useStore} from '@/store'
import {computed, ref} from 'vue'
import {images} from '@/utils/images'
import StyleImage from '@/components/StyleImage.vue'
import {zeroToOne} from 'frontend/src/utils/utiles'

const store = useStore()
store.init('styles', 'events', 'souls', 'masterData')
const {styles, events, souls, masterData} = storeToRefs(store)
const {storiesDone} = storeToRefs(useStorageStore())
const soulStyles = computed(() => souls.value.map((it:any) => {
  it.bg = styles.value.find(s => `Acc.Soul.${s.label}` === it.label)?.bg
  return it
}))
function toSortKey(data: any) {
  const time = new Date(data.in_date).getTime()
  const key = data.bg ? 3 : data.notice_id ? 2 : 1
  return time + key
}
const isMain = ref(true)
const isEvent = ref(true)
const isMemory = ref(true)
const stories = computed(() => [
      ...(isMain.value ? masterData.value.chapters.sort((a, b) => b.id - a.id) : []),
      ...(isEvent.value ? events.value : []),
      ...(isMemory.value ? soulStyles.value : [])]
    .map(it => ({...it, props: {border: true, rounded: true}}))
    .sort((a: any, b: any) => toSortKey(b) - toSortKey(a)))
function getEventImage(label: string): string | undefined {
  const bg = masterData.value.chapterImages[label]
  return bg ? images.styleSelectIcon(bg) : undefined
}
function onClickBulkSelect(value: any) {
  if (value.value) {
    if (value.event.ctrlKey) {
      const index = stories.value.findIndex(it => it.id === value.id)
      storiesDone.value = [ ...new Set([...stories.value.slice(index).map(it => it.id), ...storiesDone.value])]
    } else {
      storiesDone.value.push(value.id)
    }
  } else {
    if (value.event.ctrlKey) {
      const index = stories.value.findIndex(it => it.id === value.id)
      const unCheckList = stories.value.slice(index).map(it => it.id)
      storiesDone.value = storiesDone.value.filter(it => !unCheckList.includes(it))
    } else {
      storiesDone.value = storiesDone.value.filter(it => it !== value.id)
    }
  }
}
</script>

<template>
<v-card>
  <v-card-title class="d-flex">
    <v-checkbox-btn label="メインストーリー" v-model="isMain"/>
    <v-checkbox-btn label="イベントストーリー" v-model="isEvent"/>
    <v-checkbox-btn label="メモリーストーリー" v-model="isMemory"/>
  </v-card-title>
  <v-card-subtitle>
    <p class="text-center">{{Math.round(storiesDone.length / zeroToOne(stories.length) * 1000) / 10}}%</p>
    <p>ctrl + click で過去まで範囲選択</p>
  </v-card-subtitle>
  <v-card-text>
    <v-list select-strategy="classic"
            :selected="storiesDone"
            :items="stories" item-title="name" item-value="id" @click:select="onClickBulkSelect">
      <template #prepend="{ isActive }">
        <v-list-item-action>
          <v-checkbox-btn :model-value="isActive"/>
        </v-list-item-action>
      </template>
      <template #subtitle="{item}">
        {{new Date(item.in_date).toLocaleDateString('ja-JP')}}
      </template>
      <template #append="{item: story}">
        <div v-if="story.bg" class="position-relative">
          <StyleImage :src="images.styleSelectIcon(story.bg)" />
          <v-img :src="images.image('Soul.webp')" class="position-absolute h-100" style="top: 0;left: 10px;width: 35%"/>
        </div>
        <div v-else-if="story.notice_id" class="position-relative">
          <StyleImage :src="getEventImage(story.label)"/>
          <v-img :src="images.image(story.logo)" class="position-absolute h-100" style="top: 0;left: 2px;width: 60%"/>
        </div>
        <div v-else>
          <StyleImage :src="story.image" cover/>
        </div>
      </template>
    </v-list>
  </v-card-text>
</v-card>
</template>

<style scoped>

</style>