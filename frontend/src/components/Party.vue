<script setup lang="ts">
import {useStorageStore, useStore} from '@/store'
import {storeToRefs} from 'pinia'
import {images} from '@/utils/images'
import {computed, ref, watch} from 'vue'

const store = useStore()
store.init('styles', 'skills', 'passives')
const {passives, styles, skills} = storeToRefs(store)
const {ownedStyles} = storeToRefs(useStorageStore())
const ownedStyleData = computed(() => styles.value
    .filter(it => (it.tier === 'SS' && ownedStyles.value.includes(it.id)) || it.tier === 'S' || it.tier === 'A'))
const showStyles = computed(() => ownedStyleData.value
    .filter(it =>
        // 選択済みの別キャラを除外
        selectStyles.value.length < 6
            ? !selectStyles.value.some(ss =>  ss.target.id !== it.id && ss.target.character_id === it.character_id)
            : selectStyles.value.some(ss =>  ss.target.id === it.id)
    ))
const selectStyleIds = ref<number[]>([])
const selectStyles = ref<any[]>([])
watch(selectStyleIds, (newValue) => {
  selectStyles.value = newValue
      .map(id => {
        const target = styles.value.find(it => it.id === id)
        return {
          target,
          characterStyles: ownedStyleData.value.filter(it => it.character_id === target?.character_id && it.id !== target?.id),
        }
      })
      .map(style => ({
        target: style.target,
        level: 0, // TODO
        status: { // TODO
          dp: 0,  // DP
          str: 0, // 力
          wis: 0, //
          dex: 0, //
          spr: 0, //
          luk: 0, // 運
          con: 0, //
        },
        passives: [
            ...(style.target?.passive_ids.map(id => passives.value.find(it => it.id === id)) ?? []),
            ...(style.target?.limit_break.bonus_per_level.reduce<any[]>((acc, data) => {
              acc.push(...data.bonus)
              return acc
            }, []) ?? [])
        ],
        skills: [
            ...(style.target?.skill_ids.map(id => skills.value.find(it => it.id === id)) ?? []),
            ...(style.characterStyles.reduce<any[]>((acc, data) => {
              acc.push(...data.skill_ids.map(id => skills.value.find(it => it.id === id)).filter(it => it?.is_restricted === 0 || it?.isGeneralize))
              return acc
            }, [])),
        ].filter(it => it.name !== '通常攻撃' && it.name !== '追撃'),
      }))
})
</script>

<template>
  <v-card class="overflow-auto" max-height="calc(100vh - 160px)">
    <v-card-title>
      <v-select multiple
                label="所持スタイル"
                v-model="selectStyleIds"
                clearable
                item-value="id"
                item-title="name"
                :items="showStyles">
        <template #item="{item, props}">
          <v-list-item v-bind="props" :title="item.title">
            <template #prepend>
              <v-avatar :image="images.styleIcon(item.raw.bg)"/>
            </template>
          </v-list-item>
        </template>
        <template #selection="{item}">
          <v-avatar :image="images.styleIcon(item.raw.bg)"/>
        </template>
      </v-select>
    </v-card-title>
    <v-card-text>
      <v-data-iterator items-per-page="6" :items="selectStyles">
        <template #default="{items}">
          <v-row>
            <v-col v-for="item in items">
              <v-card>
                <v-card-title>
                  <v-avatar :image="images.styleIcon(item.raw.target.bg)"/>
                  {{item.raw.target.name}}
                </v-card-title>
                <v-card-text>
                  <v-expansion-panels variant="accordion">
                    <v-expansion-panel title="ステータス">
                      <v-expansion-panel-text>
                        <v-table class="text-caption" density="compact">
                          <tbody>
                          <tr class="text-right">
                            <th>DP</th>
                            <td>{{item.raw.status.dp}}</td>
                          </tr>
                          <tr class="text-right">
                            <th>力</th>
                            <td>{{item.raw.status.dp}}</td>
                          </tr>
                          <tr class="text-right">
                            <th>器用さ</th>
                            <td>{{item.raw.status.dp}}</td>
                          </tr>
                          <tr class="text-right">
                            <th>体力</th>
                            <td>{{item.raw.status.dp}}</td>
                          </tr>
                          <tr class="text-right">
                            <th>精神</th>
                            <td>{{item.raw.status.dp}}</td>
                          </tr>
                          <tr class="text-right">
                            <th>知性</th>
                            <td>{{item.raw.status.dp}}</td>
                          </tr>
                          <tr class="text-right">
                            <th>運</th>
                            <td>{{item.raw.status.dp}}</td>
                          </tr>
                          </tbody>
                        </v-table>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel title="アビリティ">
                      <v-expansion-panel-text>
                        <v-table class="text-caption" density="compact">
                          <tbody>
                          <tr>
                            <th>name</th>
                            <th>desc</th>
                            <th>info</th>
                            <th>timing</th>
                            <th>condition</th>
                            <th>activ_rate</th>
                            <th>effect</th>
                            <th>auto_type</th>
                          </tr>
                          <tr v-for="p in item.raw.passives">
                            <td>{{p.name}}</td>
                            <td>{{p.desc}}</td>
                            <td>{{p.info}}</td>
                            <td>{{p.timing}}</td>
                            <td>{{p.condition}}</td>
                            <td>{{p.activ_rate}}</td>
                            <td>{{p.effect}}</td>
                            <td>{{p.auto_type}}</td>
                          </tr>
                          </tbody>
                        </v-table>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel title="スキル">
                      <v-expansion-panel-text>
                        <v-table class="text-caption" density="compact">
                          <tbody>
                          <tr>
                            <th>name</th>
                            <th>desc</th>
                            <th>hit_count</th>
                            <th>target_type</th>
                            <th>effect</th>
                            <th>isGeneralize</th>
                          </tr>
                          <tr v-for="s in item.raw.skills">
                            <td>{{ s.name }}</td>
                            <td>{{ s.desc }}</td>
                            <td>{{ s.hit_count }}</td>
                            <td>{{ s.target_type }}</td>
                            <td>{{ s.effect }}</td>
                            <td>{{ s.isGeneralize }}</td>
                          </tr>
                          </tbody>
                        </v-table>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>