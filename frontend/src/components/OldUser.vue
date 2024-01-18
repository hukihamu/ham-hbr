<script setup lang="ts">

import {computed, ref, watch} from 'vue'
import draggable from 'vuedraggable'
import {useStore} from '@/store'
import {images} from '@/utils/images'
import {storeToRefs} from 'pinia'

const {styles, characters} = storeToRefs(useStore())
const ssStyles = computed(() => styles.value.filter((it: any) => it.tier === 'SS'))
const characterList = computed(() => Object.values<any>(characters.value))
const isShowAll = ref(false)
const selectOrb = ref()

const orbDone = ref<any>({})
const orbProgress = ref<any>({})
const orbTodo = ref<any>({})
const watchState = ref({
  user: false,
  styles: false,
})
const orbList = [
  {title: 'クリティカルシンキング', value: 'orbFire1', image: 'Orb1_fire'},
  {title: 'リペアライト', value: 'orbIce1', image: 'Orb1_ice'},
  {title: 'ドライブゲイン', value: 'orbThunder1', image: 'Orb1_thunder'},
  {title: 'プロテクション', value: 'orbLight1', image: 'Orb1_light'},
  {title: 'アタックライズ', value: 'orbDark1', image: 'Orb1_dark'},
  {title: 'コンセントレーション', value: 'orbFire2', image: 'Orb2_fire'},
  {title: 'ポイントケア', value: 'orbIce2', image: 'Orb2_ice'},
  {title: 'セルフエイド', value: 'orbThunder2', image: 'Orb2_thunder'},
  {title: 'ソフニング', value: 'orbLight2', image: 'Orb2_light'},
  {title: 'ウィークンパワー', value: 'orbDark2', image: 'Orb2_dark'},
  {title: 'ファイアグラビトン', value: 'orbFire3', image: 'Orb3_fire'},
]

function initUserData() {

  for (const orb of orbList) {
    orbProgress.value[orb.value] = user.value.properties[orb.value + 'Progress'].relation.map((it: any) => characters.value[it.id])
    orbDone.value[orb.value] = user.value.properties[orb.value + 'Done'].relation.map((it: any) => characters.value[it.id])
    orbTodo.value[orb.value] = computed(() => characterList.value
        .filter(it => !orbDone.value[orb.value].find((done: any) => done.id === it.id) && !orbProgress.value[orb.value].find((progress: any) => progress.id === it.id)))
  }
}
watch(styles, (newValue) => {
  if (newValue.length) {
    watchState.value.styles = true
    if (watchState.value.styles && watchState.value.user) {
      initUserData()
    }
  }
}, {immediate: true})

function sortCharacter(c: any[] = []):any[] {
  return c.sort((a, b) => a.sortKey - b.sortKey)
}
function sortStyles(s: any[]):any[] {
  return s.sort((a, b) => a.sortKey - b.sortKey)
}

function growthTypeCounter(type: string) {
  return [...growthTodo.value, ...growthProgress.value]
      .reduce((sum, current) => {
        if (current.type === type && !current.elements.length) {
          sum += 51
        }
        return sum
      }, 0)
}
function growthElementCounter(element: string) {
  return [...growthTodo.value, ...growthProgress.value]
      .reduce((sum, current) => {
        if (current.elements.includes(element)) {
          sum += 51
        }
        return sum
      }, 0)
}
const tab = ref()
</script>
<template>
  <v-container fluid>
    <v-card>
      <v-tabs v-model="tab">
        <v-tab value="editor">編集</v-tab>
        <v-tab value="styles">所持スタイル</v-tab>
      </v-tabs>
      <v-card-item>
        <v-window v-model="tab">
          <v-window-item value="editor">
            <v-row>
              <v-divider/>
              <v-col>
                <v-card title="オーブ">
                  <v-card-subtitle>
                    <v-select label="対象オーブ選択" :items="orbList" v-model="selectOrb" :disabled="!watchState.styles || !watchState.user">
                      <template #item="{item, props}">
                        <v-list-item v-bind="props">
                          <template #prepend>
                            <v-avatar :image="images.orbIcon(item.raw.image)" />
                          </template>
                        </v-list-item>
                      </template>
                      <template #selection="{item}">
                        <v-avatar :image="images.orbIcon(item.raw.image)" />{{item.title}}
                      </template>
                    </v-select>
                  </v-card-subtitle>
                  <v-expansion-panels multiple variant="accordion">
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        ToDo<span class="text-grey ml-2" v-if="orbTodo[selectOrb]">{{orbTodo[selectOrb]?.length}}キャラ</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :model-value="sortCharacter(orbTodo[selectOrb])"
                                   direction="horizontal"
                                   item-key="id"
                                   group="orb"
                                   :class="['w-100','h-100','d-flex', 'justify-start', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.charSmallIcon(element.label)" class="character"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        In Progress<span class="text-grey ml-2" v-if="orbTodo[selectOrb]">{{orbProgress[selectOrb]?.length}}キャラ</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortCharacter(orbProgress[selectOrb])"
                                   direction="horizontal"
                                   item-key="id"
                                   group="orb"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.charSmallIcon(element.label)" class="character"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        Done<span class="text-subtitle-1" v-if="orbTodo[selectOrb]">{{orbDone[selectOrb]?.length}}キャラ</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortCharacter(orbDone[selectOrb])"
                                   direction="horizontal"
                                   item-key="id"
                                   group="orb"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.charSmallIcon(element.label)" class="character"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card-item>
    </v-card>

  </v-container>
  <v-footer app border v-if="tab === 'editor'">
    <v-checkbox-btn label="すべて表示" v-model="isShowAll"></v-checkbox-btn>
    <v-btn text="リセット" disabled></v-btn>
  </v-footer>
</template>

<style scoped>
.style {
  width: 178px;
  height: 72px;
  margin: 2px;
  flex: 0 0 auto;
}
.character {
  width: 72px;
  height: 72px;
  flex: 0 0 auto;
}
</style>