<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useStorageStore, useStore} from '@/store'
import {images} from '@/utils/images'
import {computed} from 'vue'
import {Style} from '@ham-vue3-gas/shared'
import {zeroToOne} from 'frontend/src/utils/utiles'

const store = useStore()
store.init('styles')
const {styles} = storeToRefs(store)
const ssStyles = computed<Style[]>(() => styles.value.filter(it => it.tier === 'SS'))
const {ownedStyles} = storeToRefs(useStorageStore())
const teams = ['31A', '31B', '31C', '31D', '31E', '31F', '31X', '30G', 'Angel Beats']
type OwnerStyle = Style & { owned?: boolean }
const sortStyles = computed<{[team: string]: {ownerCount: number, styles: OwnerStyle[]}}>(() => teams.reduce((obj: any, team) => {
  let ownerCount = 0
  const s = ssStyles.value.filter(it => it.team === team).map(it => {
    const s: OwnerStyle = it
    s.owned = ownedStyles.value.includes(it.id)
    if (s.owned) ownerCount++
    return s
  })
  obj[team] = {
    styles: s,
    ownerCount
  }
  return obj
}, {}))
</script>

<template>
  <v-card class="overflow-y-auto" max-height="calc(100vh - 160px)">
    <v-card-title>
      {{ownedStyles.length}}/{{ssStyles.length}} {{Math.round(ownedStyles.length / zeroToOne(ssStyles.length) * 1000) / 10}}%
    </v-card-title>
    <v-card-text>
      <div v-for="team in teams" class="d-flex my-2 align-center">
        <span style="min-width: 60px" class="text-right">
          {{sortStyles[team].ownerCount}}/{{sortStyles[team].styles.length}}<br />
          {{Math.round(sortStyles[team].ownerCount / zeroToOne(sortStyles[team].styles.length) * 1000) / 10}}%
        </span>
        <v-avatar :image="images.teamIcon(team)" size="70px"/>
        <div class="d-flex flex-wrap">
          <div v-for="style in sortStyles[team].styles">
            <v-avatar :image="images.styleIcon(style.bg)" size="50px" class="mr-1"
                      :style="{opacity: style.owned ? 1 : 0.3}"/>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>