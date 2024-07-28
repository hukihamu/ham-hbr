<script setup lang="ts">
import {useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {computed, ref, watch} from 'vue'
import {scripts} from '@/scripts'
import {images} from '@/utils/images'

const store = useStore()
const {isAdmin, styles, characters, skills, passives, masterData, events} = storeToRefs(store)
const isLoading = ref(false)
watch(isAdmin, (newValue) => {
  if (newValue) store.init('events', 'masterData', 'styles')
}, {immediate: true})
const showStyles = computed(() => styles.value
    .filter(it => it.tier !== 'A'))

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
                          <v-text-field v-model="c.id" label="ID" type="number"/>
                          <v-text-field v-model="c.label" label="Label"/>
                          <v-text-field v-model="c.name" label="Name"/>
                          <v-text-field v-model="c.desc" label="Desc"/>
                          <v-text-field v-model="c.image" label="Image"/>
                          <v-text-field v-model="c.in_date" type="date" label="Out Date"/>
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
                <v-card-text class="overflow-y-auto" style="max-height: calc(100vh - 170px)">
                  <v-list>
                    <v-list-item v-for="event in events">
                      <template #title>
                        <v-select :label="event.name"
                                  v-model="masterData.chapterImages[event.label]"
                                  :items="showStyles" item-title="name" item-value="bg">
                          <template #selection="{item}">
                            <v-avatar :image="images.styleIcon(item.raw.bg)"/>
                            {{ item.title }}
                          </template>
                          <template #item="{item, props}">
                            <v-list-item :title="item.title" v-bind="props">
                              <template #prepend>
                                <v-avatar :image="images.styleIcon(item.raw.bg)"/>
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