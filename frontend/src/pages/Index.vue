<script setup lang="ts">
import {useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {computed, ref, watch} from 'vue'
import {scripts} from '@/scripts'
import StyleImage from '@/components/StyleImage.vue'

const store = useStore()
const {isAdmin, styles, characters, skills, passives, chapters, events} = storeToRefs(store)
const isLoading = ref(false)
watch(isAdmin, (newValue) => {
  if (newValue) store.init('events', 'chapters')
})
function toLabelData(list: any[]): any {
  return list.reduce((previousValue, currentValue) => {
    previousValue[currentValue.label] = currentValue
    return previousValue
  }, {})
}
const stories = computed(() => ({...toLabelData(events.value), ...toLabelData(chapters.value.chapters ?? [])}))
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
    out_date: '',
    name: '',
    label: '',
    desc: '',
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
      <v-btn @click="onUpdateCache" text="DB更新" :loading="isLoading"/>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col class="overflow-y-auto" style="max-height: calc(100vh - 130px)">
              <v-card title="メインストーリー管理">
                <v-card-text>
                  <v-row>
                    <v-col v-for="(c, i) in chapters.chapters">
                      <v-card>
                        <v-card-text>
                          <v-text-field v-model="c.id" label="ID" type="number" />
                          <v-text-field v-model="c.label" label="Label" />
                          <v-text-field v-model="c.name" label="Name" />
                          <v-text-field v-model="c.desc" label="Desc" />
                          <v-text-field v-model="c.out_date" type="date" label="Out Date" />
                        </v-card-text>
                        <v-card-actions>
                          <v-btn text="削除" @click="chapters.chapters.splice(i, 1)"/>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn text="追加" @click="onAddChapter"/>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col class="overflow-y-auto"  style="max-height: calc(100vh - 130px)">
              <v-card title="ストーリー画像管理">
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="key in Object.keys(stories ?? {})">
                      <template #title>
                        <v-text-field :model-value="(chapters?.chapterImages ?? {})[key]"
                                      :label="stories[key]?.name"
                                      @update:model-value="chapters.chapterImages[key] = $event"/>
                      </template>
                      <template #append>
                        <StyleImage :src="(chapters?.chapterImages ?? {})[key]" cover />
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
  </v-container>
</template>

<style scoped>

</style>