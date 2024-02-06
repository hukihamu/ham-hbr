<script setup lang="ts">
import {useStorageStore, useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {ref, watch} from 'vue'
import {scripts} from '@/scripts'
import {images} from '@/utils/images'

const store = useStore()
const {isAdmin, styles, characters, skills, passives, masterData, events} = storeToRefs(store)
const isLoading = ref(false)
watch(isAdmin, (newValue) => {
  if (newValue) store.init('events', 'masterData', 'styles')
}, {immediate: true})
function onUpdateCache() {
  isLoading.value = true
  scripts.send('updateCache').then(isSuccessful => {
    isLoading.value = false
    alert(isSuccessful ? '完了' : '失敗')
    if (isSuccessful) {
      if (styles.value.length) {
        scripts.send('getStyles').then(it => {
          styles.value = it
        })
      }
      if (characters.value.length) {
        scripts.send('getCharacters').then(it => {
          characters.value = it
        })
      }
      if (skills.value.length) {
        scripts.send('getSkills').then(it => {
          skills.value = it
        })
      }
      if (passives.value.length) {
        scripts.send('getPassives').then(it => {
          passives.value = it
        })
      }
    }
  })
}
function onAddChapter() {
  masterData.value.chapters.push({
    id: masterData.value.chapters.length,
    in_date: '',
    name: '',
    label: '',
    desc: '',
    image: ''
  })
}
const {orbDone, orbProgress, storiesDone, growthDone, growthProgress, generalizeDone, generalizeProgress, lb0, lb1, lb2, lb3, lb4, lb5, lb6} = storeToRefs(useStorageStore())
async function setAdminData() {
  if (await scripts.send('setAdminData', {
    storiesDone: storiesDone.value,
    orbDone: orbDone.value,
    orbProgress: orbProgress.value,
    growthDone: growthDone.value,
    growthProgress: growthProgress.value,
    generalizeDone: generalizeDone.value,
    generalizeProgress: generalizeProgress.value,
    lb0: lb0.value,
    lb1: lb1.value,
    lb2: lb2.value,
    lb3: lb3.value,
    lb4: lb4.value,
    lb5: lb5.value,
    lb6: lb6.value,
  })) {
    alert('up完了')
  }
}
async function getAdminData() {
  const data = await scripts.send('getAdminData')
  if (data) {
    storiesDone.value = data.storiesDone
    orbDone.value = data.orbDone
    orbProgress.value = data.orbProgress
    growthDone.value = data.growthDone
    growthProgress.value = data.growthProgress
    generalizeDone.value = data.generalizeDone
    generalizeProgress.value = data.generalizeProgress
    lb0.value = data.lb0
    lb1.value = data.lb1
    lb2.value = data.lb2
    lb3.value = data.lb3
    lb4.value = data.lb4
    lb5.value = data.lb5
    lb6.value = data.lb6
    alert('取得完了')
  }
}
function onSave() {
  scripts.send('setMasterData', masterData.value).then(it => {
    alert(it ? '完了' : '失敗')
  })
}
const tab = ref()
</script>

<template>
  <v-container fluid>
    <div v-if="isAdmin">
      <v-card>
        <v-card-title>
          <v-tabs v-model="tab">
            <v-tab value="action">管理者アクション</v-tab>
            <v-tab value="story">メインストーリー管理</v-tab>
            <v-tab value="event">イベントストーリー画像管理</v-tab>
          </v-tabs>
        </v-card-title>
        <v-card-text>
          <v-window v-model="tab" disabled>
            <v-window-item value="action">
              <v-card>
                <v-card-text>
                  <v-btn @click="onUpdateCache" text="DB更新" :loading="isLoading"/>
                  <v-btn @click="setAdminData" text="データアップロード"/>
                  <v-btn @click="getAdminData" text="データダウンロード"/>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="story">
              <v-card>
                <v-card-text>
                  <v-slide-group show-arrows>
                    <v-slide-group-item v-for="(c, i) in masterData.chapters.sort((a, b) => a.id -b.id)">
                      <v-card>
                        <v-card-text>
                          <v-text-field v-model="c.id" label="ID" type="number" />
                          <v-text-field v-model="c.label" label="Label" />
                          <v-text-field v-model="c.name" label="Name" />
                          <v-text-field v-model="c.desc" label="Desc" />
                          <v-text-field v-model="c.image" label="Image" />
                          <v-text-field v-model="c.in_date" type="date" label="Out Date" />
                        </v-card-text>
                        <v-card-actions>
                          <v-btn text="削除" @click="masterData.chapters.splice(i, 1)"/>
                        </v-card-actions>
                      </v-card>
                    </v-slide-group-item>
                  </v-slide-group>
                </v-card-text>
                <v-card-actions>
                  <v-btn text="追加" @click="onAddChapter"/>
                </v-card-actions>
              </v-card>
            </v-window-item>
            <v-window-item value="event">
              <v-card>
                <v-card-text class="overflow-y-auto"  style="max-height: calc(100vh - 170px)">
                  <v-list>
                    <v-list-item v-for="event in events">
                      <template #title>
                        <v-select :label="event.name"
                                  v-model="masterData.chapterImages[event.label]"
                                  :items="styles.filter(it => it.tier !== 'A')" item-title="name" item-value="bg">
                          <template #selection="{item}">
                            <v-avatar :image="images.styleIcon(item.raw.bg)" />{{item.title}}
                          </template>
                          <template #item="{item, props}">
                            <v-list-item :title="item.title" v-bind="props">
                              <template #prepend>
                                <v-avatar :image="images.styleIcon(item.raw.bg)" />
                              </template>
                            </v-list-item>
                          </template>
                        </v-select>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card-text>
        <v-card-actions>
          <v-btn text="保存" @click="onSave"/>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>
      <v-list nav>
        <v-list-item to="/" title="index" prepend-icon="mdi-home"/>
        <v-list-item to="/styles" title="スタイル" prepend-icon="mdi-palette-swatch"/>
        <v-list-item to="/user" title="ユーザ情報" prepend-icon="mdi-account"/>
      </v-list>
    </div>
  </v-container>
</template>

<style scoped>

</style>