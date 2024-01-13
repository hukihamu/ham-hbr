<script setup lang="ts">

import {computed, ref, watch} from 'vue'
import draggable from 'vuedraggable'
import {scripts, useStore} from '@/store'
import {images} from '@/utils/images.ts'
import {storeToRefs} from 'pinia'

const {user, styles, characters} = storeToRefs(useStore())
const ssStyles = computed(() => styles.value.filter((it: any) => it.tier === 'SS'))
const characterList = computed(() => Object.values<any>(characters.value))
const isShowAll = ref(false)
const selectOrb = ref()

const limitBreak0 = ref<any[]>([])
const limitBreak1 = ref<any[]>([])
const limitBreak2 = ref<any[]>([])
const limitBreak3 = ref<any[]>([])
const limitBreak4 = ref<any[]>([])
const limitBreak5 = ref<any[]>([])
const limitBreak6 = ref<any[]>([])
const limitBreak = computed(() => ssStyles.value
        .filter(it => !limitBreak0.value.find(lb0 => lb0.id === it.id)
            && !limitBreak1.value.find(lb1 => lb1.id === it.id)
            && !limitBreak2.value.find(lb1 => lb1.id === it.id)
            && !limitBreak3.value.find(lb1 => lb1.id === it.id)
            && !limitBreak4.value.find(lb1 => lb1.id === it.id)
            && !limitBreak5.value.find(lb1 => lb1.id === it.id)
            && !limitBreak6.value.find(lb1 => lb1.id === it.id)))
const generalizeDone = ref<any[]>([])
const generalizeProgress = ref<any[]>([])
const generalizeTodo = computed(() => ssStyles.value
    .filter((it: any) => it.generalize)
    .filter(it => !generalizeDone.value.find(done => done.id === it.id) && !generalizeProgress.value.find(progress => progress.id === it.id))
    .filter(it => !limitBreak.value.find(lb => lb.id === it.id)))
const growthDone = ref<any[]>([])
const growthProgress = ref<any[]>([])
const growthTodo = computed(() => ssStyles.value
    .filter((it: any) => it.growth)
    .filter(it => !growthDone.value.find(done => done.id === it.id) && !growthProgress.value.find(progress => progress.id === it.id))
    .filter(it => !limitBreak.value.find(lb => lb.id === it.id)))
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
  generalizeDone.value = user.value.properties.generalizeDone.relation.map((it: any) => ssStyles.value.find(s => s.id === it.id))
  generalizeProgress.value = user.value.properties.generalizeProgress.relation.map((it: any) => ssStyles.value.find(s => s.id === it.id))
  growthDone.value = user.value.properties.growthDone.relation.map((it: any) => ssStyles.value.find(s => s.id === it.id))
  growthProgress.value = user.value.properties.growthProgress.relation.map((it: any) => ssStyles.value.find(s => s.id === it.id))
  limitBreak0.value = user.value.properties.lb0.relation.map((it: any) => {
    const s = ssStyles.value.find(s => s.id === it.id)
    s.limitBreak = '0'
    return s
  })
  limitBreak1.value = user.value.properties.lb1.relation.map((it: any) => {
    const s = ssStyles.value.find(s => s.id === it.id)
    s.limitBreak = '1'
    return s
  })
  limitBreak2.value = user.value.properties.lb2.relation.map((it: any) => {
    const s = ssStyles.value.find(s => s.id === it.id)
    s.limitBreak = '2'
    return s
  })
  limitBreak3.value = user.value.properties.lb3.relation.map((it: any) => {
    const s = ssStyles.value.find(s => s.id === it.id)
    s.limitBreak = '2.5'
    return s
  })
  limitBreak4.value = user.value.properties.lb4.relation.map((it: any) => {
    const s = ssStyles.value.find(s => s.id === it.id)
    s.limitBreak = '3'
    return s
  })
  limitBreak5.value = user.value.properties.lb5.relation.map((it: any) => {
    const s = ssStyles.value.find(s => s.id === it.id)
    s.limitBreak = '3.5'
    return s
  })
  limitBreak6.value = user.value.properties.lb6.relation.map((it: any) => {
    const s = ssStyles.value.find(s => s.id === it.id)
    s.limitBreak = '4'
    return s
  })

  for (const orb of orbList) {
    orbProgress.value[orb.value] = user.value.properties[orb.value + 'Progress'].relation.map((it: any) => characters.value[it.id])
    orbDone.value[orb.value] = user.value.properties[orb.value + 'Done'].relation.map((it: any) => characters.value[it.id])
    orbTodo.value[orb.value] = computed(() => characterList.value
        .filter(it => !orbDone.value[orb.value].find((done: any) => done.id === it.id) && !orbProgress.value[orb.value].find((progress: any) => progress.id === it.id)))
  }
}
watch(user, newValue => {
  if (newValue.properties) {
    watchState.value.user = true
    if (watchState.value.styles && watchState.value.user) {
      initUserData()
    }
  }
}, {immediate: true})
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
function onSave() {
  const properties: any = {
    'lb0': {
      'relation': limitBreak0.value.map(it => ({id: it.id})),
    },
    'lb1': {
      'relation': limitBreak1.value.map(it => ({id: it.id})),
    },
    'lb2': {
      'relation': limitBreak2.value.map(it => ({id: it.id})),
    },
    'lb3': {
      'relation': limitBreak3.value.map(it => ({id: it.id})),
    },
    'lb4': {
      'relation': limitBreak4.value.map(it => ({id: it.id})),
    },
    'lb5': {
      'relation': limitBreak5.value.map(it => ({id: it.id})),
    },
    'lb6': {
      'relation': limitBreak6.value.map(it => ({id: it.id})),
    },
    'growthProgress': {
      'relation': growthProgress.value.map(it => ({id: it.id})),
    },
    'growthDone': {
      'relation': growthDone.value.map(it => ({id: it.id})),
    },
    'generalizeProgress': {
      'relation': generalizeProgress.value.map(it => ({id: it.id})),
    },
    'generalizeDone': {
      'relation': generalizeDone.value.map(it => ({id: it.id})),
    },
  }
  // orb
  for (const orb of orbList) {
    properties[orb.value + 'Progress'] = {
      'relation': orbProgress.value[orb.value].map((it: any) => ({id: it.id})),
    }
    properties[orb.value + 'Done'] = {
      'relation': orbDone.value[orb.value].map((it: any) => ({id: it.id})),
    }
  }
  scripts.send('updateUserData', {
    pageId: user.value.id,
    properties,
  }).then((it: boolean) => {
    if (it) {
      alert('保存成功')
    } else {
      alert('保存失敗')
    }
  })
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
              <v-col>
                <v-card title="凸状況">
                  <v-card-subtitle>
                    {{ ssStyles.length - limitBreak.length }} /
                    {{ ssStyles.length }} ｜ {{Math.round((ssStyles.length - limitBreak.length) / ssStyles.length * 100)}}%
                  </v-card-subtitle>
                  <v-expansion-panels multiple variant="accordion">
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        未所持<span class="text-grey ml-2">{{limitBreak.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :model-value="sortStyles(limitBreak)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="lb"
                                   :class="['w-100','h-100','d-flex', 'justify-start', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        0凸<span class="text-grey ml-2">{{limitBreak0.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(limitBreak0)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="lb"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        1凸<span class="text-grey ml-2">{{limitBreak1.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(limitBreak1)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="lb"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        2凸<span class="text-grey ml-2">{{limitBreak2.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(limitBreak2)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="lb"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        2.5凸<span class="text-grey ml-2">{{limitBreak3.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(limitBreak3)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="lb"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        3凸<span class="text-grey ml-2">{{limitBreak4.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(limitBreak4)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="lb"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        3.5凸<span class="text-grey ml-2">{{limitBreak5.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(limitBreak5)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="lb"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        4凸<span class="text-grey ml-2">{{limitBreak6.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(limitBreak6)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="lb"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-col>
              <v-divider/>
              <v-col>
                <v-card title="ジェネライズ">
                  <v-card-subtitle>
                    <v-avatar :image="images.materialLv7()" />{{(generalizeTodo.length + generalizeProgress.length) * 3}}個
                  </v-card-subtitle>
                  <v-expansion-panels multiple variant="accordion">
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        ToDo<span class="text-grey ml-2">{{generalizeTodo.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :model-value="sortStyles(generalizeTodo)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="generalize"
                                   :class="['w-100','h-100','d-flex', 'justify-start', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        In Progress<span class="text-grey ml-2">{{generalizeProgress.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(generalizeProgress)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="generalize"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        Done<span class="text-grey ml-2">{{generalizeDone.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(generalizeDone)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="generalize"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-col>
              <v-divider/>
              <v-col>
                <v-card title="宝珠">
                  <v-card-subtitle class="d-flex flex-wrap justify-space-between">
                    <div><v-avatar :image="images.typeIcon('Slash')" />{{growthTypeCounter('Slash')}}個</div>
                    <div><v-avatar :image="images.typeIcon('Stab')" />{{growthTypeCounter('Stab')}}個</div>
                    <div><v-avatar :image="images.typeIcon('Strike')" />{{growthTypeCounter('Strike')}}個</div>
                    <div><v-avatar :image="images.elementIcon('Fire')" />{{growthElementCounter('Fire')}}個</div>
                    <div><v-avatar :image="images.elementIcon('Ice')" />{{growthElementCounter('Ice')}}個</div>
                    <div><v-avatar :image="images.elementIcon('Thunder')" />{{growthElementCounter('Thunder')}}個</div>
                    <div><v-avatar :image="images.elementIcon('Light')" />{{growthElementCounter('Light')}}個</div>
                    <div><v-avatar :image="images.elementIcon('Dark')" />{{growthElementCounter('Dark')}}個</div>
                    <div><v-spacer /></div>
                  </v-card-subtitle>
                  <v-expansion-panels multiple variant="accordion">
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        ToDo<span class="text-grey ml-2">{{growthTodo.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :model-value="sortStyles(growthTodo)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="growth"
                                   :class="['w-100','h-100','d-flex', 'justify-start', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        In Progress<span class="text-grey ml-2">{{growthProgress.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(growthProgress)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="growth"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        Done<span class="text-grey ml-2">{{growthDone.length}}スタイル</span>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text class="overflow-x-auto">
                        <draggable :list="sortStyles(growthDone)"
                                   direction="horizontal"
                                   item-key="id"
                                   group="growth"
                                   :class="['w-100','h-100','d-flex', isShowAll ? 'flex-wrap' : '']">
                          <template #item="{element}">
                            <v-img :src="images.styleSelectIcon(element.background)" class="style"></v-img>
                          </template>
                        </draggable>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-col>
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
          <v-window-item value="styles">
            <v-sheet class="d-flex flex-wrap">
              <v-img v-for="style in sortStyles([...limitBreak0, ...limitBreak1, ...limitBreak2, ...limitBreak3, ...limitBreak4, ...limitBreak5, ...limitBreak6])"
                     :src="images.styleSelectIcon(style.background)"
                     class="style position-relative">
              <span class="position-absolute limit-break rounded-bs-lg">
                <span class="text-deep-orange-lighten-1 ml-1">凸</span>
                <span class="text-white ml-3"><span style="font-size: 0.8rem;">Lv.</span>{{style.limitBreak}}</span>
              </span>
              </v-img>
            </v-sheet>
          </v-window-item>
        </v-window>
      </v-card-item>
    </v-card>

  </v-container>
  <v-footer app border v-if="tab === 'editor'">
    <v-checkbox-btn label="すべて表示" v-model="isShowAll"></v-checkbox-btn>
    <v-btn text="リセット" disabled></v-btn>
    <v-btn text="保存" @click="onSave"></v-btn>
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
.limit-break {
  font-size: 1rem;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
}
</style>