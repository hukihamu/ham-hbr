<script setup lang="ts">
import {useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {ref, watch} from 'vue'
import {scripts} from '@/scripts'
import {images} from '@/utils/images.ts'

const store = useStore()
const {isAdmin, styles, characters, skills, passives, chapters, events} = storeToRefs(store)
const isLoading = ref(false)
watch(isAdmin, (newValue) => {
  if (newValue) store.init('events', 'chapters', 'styles')
})
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
  chapters.value.chapters.push({
    id: chapters.value.chapters.length,
    in_date: '',
    name: '',
    label: '',
    desc: '',
    image: ''
  })
}
function onSave() {
  scripts.send('setChapters', chapters.value).then(it => {
    alert(it ? '完了' : '失敗')
  })
}
</script>

<template>
  <v-container fluid>
    <div v-if="isAdmin">
      <v-card>
        <v-card-title>
          <v-btn @click="onUpdateCache" text="DB更新" :loading="isLoading"/>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="overflow-y-auto" style="max-height: calc(100vh - 130px)">
              <v-card title="メインストーリー管理">
                <v-card-text>
                  <v-slide-group show-arrows>
                    <v-slide-group-item v-for="(c, i) in chapters.chapters.sort((a, b) => a.id -b.id)">
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
                          <v-btn text="削除" @click="chapters.chapters.splice(i, 1)"/>
                        </v-card-actions>
                      </v-card>
                    </v-slide-group-item>
                  </v-slide-group>
                </v-card-text>
                <v-card-actions>
                  <v-btn text="追加" @click="onAddChapter"/>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col class="overflow-y-auto"  style="max-height: calc(100vh - 130px)">
              <v-card title="イベントストーリー画像管理">
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="event in events">
                      <template #title>
                        <v-select :label="event.name"
                                  v-model="chapters.chapterImages[event.label]"
                                  :items="styles.filter(it => it.tier === 'SS')" item-title="name" item-value="bg">
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
            </v-col>
          </v-row>
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