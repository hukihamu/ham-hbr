<script setup lang="ts">
import {useStorageStore, useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {computed} from 'vue'
import {PassiveBonus} from '@ham-vue3-gas/shared'
import VueDraggable from 'vuedraggable'
import {images} from '@/utils/images'
import {getListById} from '@/utils/utiles'

type MyPassiveBonus = { styleBGs: string[] } & PassiveBonus
const store = useStore()
store.init('styles')
const {styles} = storeToRefs(store)
const {bonus1, bonus2, bonus3} = storeToRefs(useStorageStore())
const bonus = computed(() => {
  return styles.value.filter(it => it.tier == 'SS').reduce<MyPassiveBonus[]>((list, currentValue) => {
    currentValue.limit_break.bonus_per_level.forEach(bpl => {
      bpl.bonus.forEach(b => {
        if (b.category === 'Passive') {
          const callbackBonus = list.find(it => it.id === b.id)
          if (callbackBonus) {
            callbackBonus.styleBGs.push(currentValue.bg)
          } else {
            list.push({...b, styleBGs: [currentValue.bg]})
          }
        }
      })
    })
    return list
  }, []).sort((a, b) => a.name.split('').reverse().join('') < b.name.split('').reverse().join('') ? 1 : -1)
})
const b0 = computed(() => bonus.value.filter(it =>
    !bonus1.value.includes(it.id)
    && !bonus2.value.includes(it.id)
    && !bonus3.value.includes(it.id)
))
const b1 = computed({
  get: () => getListById(bonus1.value, bonus.value),
  set: (values) => bonus1.value = values.map(it => it.id),
})
const b2 = computed({
  get: () => getListById(bonus2.value, bonus.value),
  set: (values) => bonus2.value = values.map(it => it.id),
})
const b3 = computed({
  get: () => getListById(bonus3.value, bonus.value),
  set: (values) => bonus3.value = values.map(it => it.id),
})
</script>

<template>
  <v-card>
    <v-card-text>
      <div class="d-flex flex-row">
        <div class="border column">
          <VueDraggable :model-value="b0"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="b">
            <template #header>
              <div class="title">未設定</div>
            </template>
            <template #item="{element}">
              <v-card :title="element.name" :subtitle="element.info" :text="element.desc" class="ma-2">
                <v-tooltip activator="parent" location="top">
                  <v-avatar v-for="bg in element.styleBGs" :image="images.styleIcon(bg)" size="50px" class="mr-1"/>
                </v-tooltip>
              </v-card>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="b1"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="b">
            <template #header>
              <div class="title">低</div>
            </template>
            <template #item="{element}">
              <v-card :title="element.name" :subtitle="element.info" :text="element.desc" class="ma-2">
                <v-tooltip activator="parent" location="top">
                  <v-avatar v-for="bg in element.styleBGs" :image="images.styleIcon(bg)" size="50px" class="mr-1"/>
                </v-tooltip>
              </v-card>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="b2"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="b">
            <template #header>
              <div class="title">中</div>
            </template>
            <template #item="{element}">
              <v-card :title="element.name" :subtitle="element.info" :text="element.desc" class="ma-2">
                <v-tooltip activator="parent" location="top">
                  <v-avatar v-for="bg in element.styleBGs" :image="images.styleIcon(bg)" size="50px" class="mr-1"/>
                </v-tooltip>
              </v-card>
            </template>
          </VueDraggable>
        </div>
        <div class="border column">
          <VueDraggable v-model="b3"
                        direction="vertical"
                        item-key="id"
                        class="w-100 h-100"
                        group="b">
            <template #header>
              <div class="title">高</div>
            </template>
            <template #item="{element}">
              <v-card :title="element.name" :subtitle="element.info" :text="element.desc" class="ma-2">
                <v-tooltip activator="parent" location="top">
                  <v-avatar v-for="bg in element.styleBGs" :image="images.styleIcon(bg)" size="50px" class="mr-1"/>
                </v-tooltip>
              </v-card>
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
  min-width: 200px;
}
</style>