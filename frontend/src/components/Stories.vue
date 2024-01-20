<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useStorageStore, useStore} from '@/store.ts'
import {computed} from 'vue'
import {images} from '@/utils/images.ts'
import StyleImage from '@/components/StyleImage.vue'

const {styles, events, souls, chapters} = storeToRefs(useStore())
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
const stories = computed(() => [...chapters.value.chapters.sort((a, b) => b.id - a.id), ...events.value, ...soulStyles.value]
    .map(it => ({...it, props: {border: true, rounded: true}}))
    .sort((a: any, b: any) => toSortKey(b) - toSortKey(a)))
function getEventImage(label: string): string | undefined {
  const bg = chapters.value.chapterImages[label]
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
<v-card subtitle="ctrl + click で過去まで範囲選択">
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