<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import {computed, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useStorageStore, useStore} from '@/store'
import {images} from '@/utils/images'
import {getListById} from '@/utils/utiles'

const store = useStore()
store.init('styles', 'characters')
const {styles, characters} = storeToRefs(store)
const {lb0, lb1, lb2, lb3, lb4, lb5, lb6, ownedStyles, bonus1, bonus2, bonus3} = storeToRefs(useStorageStore())
const selectCharacter = ref<number[]>([])
const is3LBBonus = ref(false)
const showStyles = computed(() => styles.value.map(style => {
  const temp: any = style
  if (!temp.bonus) temp.bonus = 0
  style.limit_break.bonus_per_level.forEach(bpl => {
    bpl.bonus.forEach(b => {
      if (b.category === 'Passive') {
        if (bonus3.value.find(it => it === b.id)) {
          temp.bonus += 3
        } else if (bonus2.value.find(it => it === b.id)) {
          temp.bonus += 2
        } else if (bonus1.value.find(it => it === b.id)) {
          temp.bonus += 1
        }
      }
    })
  })
  return temp
}))
const limitBreak = computed(() => styles.value.filter(it => it.tier === 'SS' && !ownedStyles.value.includes(it.id)))
const limitBreak0 = computed({
  get: () => getListById(lb0.value, showStyles.value),
  set: (values) => lb0.value = values.map(it => it!!.id),
})
const limitBreak1 = computed({
  get: () => getListById(lb1.value, showStyles.value),
  set: (values) => lb1.value = values.map(it => it!!.id),
})
const limitBreak2 = computed({
  get: () => getListById(lb2.value, showStyles.value),
  set: (values) => lb2.value = values.map(it => it!!.id),
})
const limitBreak3 = computed({
  get: () => getListById(lb3.value, showStyles.value),
  set: (values) => lb3.value = values.map(it => it!!.id),
})
const limitBreak4 = computed({
  get: () => getListById(lb4.value, styles.value),
  set: (values) => lb4.value = values.map(it => it!!.id),
})
const limitBreak5 = computed({
  get: () => getListById(lb5.value, styles.value),
  set: (values) => lb5.value = values.map(it => it!!.id),
})
const limitBreak6 = computed({
  get: () => getListById(lb6.value, styles.value),
  set: (values) => lb6.value = values.map(it => it!!.id),
})

</script>

<template>
  <v-card class="overflow-auto" max-height="calc(100vh - 160px)">
    <v-card-title>
      <v-select multiple
                label="キャラ"
                v-model="selectCharacter"
                clearable
                item-value="id"
                item-title="chara"
                :items="characters">
        <template #item="{item, props}">
          <v-list-item v-bind="props">
            <template #prepend>
              <v-avatar :image="images.charSmallIcon(item.raw.chara_label)"/>
            </template>
          </v-list-item>
        </template>
        <template #selection="{item}">
          <v-avatar :image="images.charSmallIcon(item.raw.chara_label)"/>
        </template>
      </v-select>
      <v-checkbox label="3凸優先順位" v-model="is3LBBonus"></v-checkbox>
    </v-card-title>
    <v-card-text>
      <div class="d-flex flex-row">
        <div class="border column">
          <VueDraggable :model-value="limitBreak"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">未所持</div>
            </template>
            <template #item="{element}">
              <div v-if="!selectCharacter.length || selectCharacter.includes(element.character_id)">
                <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
              </div>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak0"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">0凸</div>
            </template>
            <template #item="{element}">
              <div v-if="!selectCharacter.length || selectCharacter.includes(element.character_id)" class="position-relative">
                <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
                <div v-if="element.bonus && is3LBBonus" style="bottom: 0; left: 0;" class="bg-white position-absolute">+{{element.bonus}}</div>
              </div>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak1"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">1凸</div>
            </template>
            <template #item="{element}">
              <div v-if="!selectCharacter.length || selectCharacter.includes(element.character_id)" class="position-relative">
                <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
                <div v-if="element.bonus && is3LBBonus" style="bottom: 0; left: 0;" class="bg-white position-absolute">+{{element.bonus}}</div>
              </div>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak2"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">2凸</div>
            </template>
            <template #item="{element}">
              <div v-if="!selectCharacter.length || selectCharacter.includes(element.character_id)" class="position-relative">
                <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
                <div v-if="element.bonus && is3LBBonus" style="bottom: 0; left: 0;" class="bg-white position-absolute">+{{element.bonus}}</div>
              </div>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak3"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">2.5凸</div>
            </template>
            <template #item="{element}">
              <div v-if="!selectCharacter.length || selectCharacter.includes(element.character_id)" class="position-relative">
                <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
                <div v-if="element.bonus && is3LBBonus" style="bottom: 0; left: 0;" class="bg-white position-absolute">+{{element.bonus}}</div>
              </div>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak4"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">3凸</div>
            </template>
            <template #item="{element}">
              <div v-if="!selectCharacter.length || selectCharacter.includes(element.character_id)">
                <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
              </div>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak5"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">3.5凸</div>
            </template>
            <template #item="{element}">
              <div v-if="!selectCharacter.length || selectCharacter.includes(element.character_id)">
                <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
              </div>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="limitBreak6"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="lb">
            <template #header>
              <div class="title">4凸</div>
            </template>
            <template #item="{element}">
              <div v-if="!selectCharacter.length || selectCharacter.includes(element.character_id)">
                <v-img :src="images.styleSelectIcon(element.bg)" width="178px" height="72px" class="ma-1"/>
              </div>
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