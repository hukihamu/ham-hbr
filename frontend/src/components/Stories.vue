<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useStore} from '@/store.ts'
import {computed} from 'vue'
import {images} from '@/utils/images.ts'
import StyleImage from '@/components/StyleImage.vue'

const {styles, events, souls, chapters} = storeToRefs(useStore())
// const {storiesDone} = storeToRefs(useStorageStore())
const soulStyles = computed(() => souls.value.map((it:any) => {
  it.bg = styles.value.find(s => `Acc.Soul.${s.label}` === it.label)?.bg
  return it
}))
const stories = computed(() => [...events.value, ...soulStyles.value].sort((a: any, b: any) => new Date(a.out_date ?? a.in_date).getTime() - new Date(b.out_date ?? b.in_date).getTime()))
// label: Acc.Soul.RKayamori03
// https://hbr.quest/hbr/EventBg_AC0001.webp
// https://hbr.quest/hbr/EventBanner_AC0001.webp
// https://hbr.quest/hbr/MC01.webp
// メインストーリーはChapter?Story?
// https://hbr.quest/hbr/Story_MC01.webp
// TODO twitterから取得が無難
</script>

<template>
<v-card>
  <v-card-text>
    <v-list>
      <v-list-item v-for="story in stories" :key="story.id" :title="story.name">
        <template #append>
          <StyleImage v-if="story.bg" :src="images.styleSelectIcon(story.bg)" />
          <StyleImage v-else :src="(chapters?.chapterImages ?? {})[story.label]" cover />
        </template>
      </v-list-item>
    </v-list>
  </v-card-text>
</v-card>
</template>

<style scoped>

</style>