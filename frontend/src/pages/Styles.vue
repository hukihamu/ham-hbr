<script setup lang="ts">
import {ref, computed, reactive, watch} from 'vue'
import {useStore} from '@/store.ts'
import {images} from '@/utils/images'
import {storeToRefs} from 'pinia'

const {styles, characters} = storeToRefs(useStore())
const showStyles = computed(() => {
  return styles.value.filter(it =>
      (!styleFilter.character.length || styleFilter.character.includes(it.character)) &&
      (!styleFilter.tier.length || styleFilter.tier.includes(it.tier)) &&
      (!styleFilter.type.length || styleFilter.type.includes(it.type)) &&
      (!styleFilter.element.length || styleFilter.element.some(e => it.elements.includes(e) || (e === 'Nonelement' && !it.elements.length)))
  );
});
const styleFilter = reactive({
  tier: [] as any[],
  type: [] as any[],
  element: [] as any[],
  character: [] as any[],
})
const styleSortBy = ref([{key: 'sortKey', order: 'asc'}])
const styleHeaders = [
  {key: 'icon', title: '', sortable: false},
  {key: 'name', title: '名前'},
  {key: 'tier', title: 'レア'},
  {key: 'role', title: 'ロール'},
  {key: 'type', title: '属性'},
  {key: 'elements', title: '元素'},
  {key: 'paramTrend', title: 'param傾向'},
  // {key: 'skills', title: 'スキル'},
  // {key: 'passives', title: 'パッシブ'},
  {key: 'inDate', title: '追加日'},
  {key: 'sortKey', title: 'sort'},
]
function getSortOrder(key: string): string {
  const index = styleSortBy.value.findIndex(it => it.key === key)
  return index === -1 ? '' : (index + 1).toString()
}

</script>

<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-select multiple
                      label="キャラ"
                      v-model="styleFilter.character"
                      clearable
                      chips
                      item-value="id"
                      item-title="name"
                      :items="Object.values(characters)">
              <template #item="{item, props}">
                <v-list-item v-bind="props">
                  <template #prepend>
                    <v-avatar :image="images.charSmallIcon(item.raw.label)" />
                  </template>
                </v-list-item>
              </template>
              <template #chip="{item}">
                <v-chip>
                  <v-avatar :image="images.charSmallIcon(item.raw.label)" />
                </v-chip>
              </template>
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-select multiple
                      label="レア"
                      v-model="styleFilter.tier"
                      clearable
                      chips
                      :items="['SS', 'S', 'A']">
              <template #item="{item, props}">
                <v-list-item v-bind="props">
                  <template #title>
                    <v-avatar :image="images.rarityIcon(item.title)" />
                  </template>
                </v-list-item>
              </template>
              <template #chip="{item}">
                <v-chip>
                  <v-avatar :image="images.rarityIcon(item.title)" />
                </v-chip>
              </template>
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-select multiple
                      label="属性"
                      v-model="styleFilter.type"
                      clearable
                      chips
                      :items="['Slash', 'Stab', 'Strike']">
              <template #item="{item, props}">
                <v-list-item v-bind="props">
                  <template #title>
                    <v-avatar :image="images.typeIcon(item.title)" />
                  </template>
                </v-list-item>
              </template>
              <template #chip="{item}">
                <v-chip>
                  <v-avatar :image="images.typeIcon(item.title)" />
                </v-chip>
              </template>
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-select multiple
                      label="元素"
                      v-model="styleFilter.element"
                      clearable
                      chips
                      :items="['Fire', 'Ice', 'Thunder', 'Light', 'Dark', 'Nonelement']">
              <template #item="{item, props}">
                <v-list-item v-bind="props">
                  <template #title>
                    <v-avatar :image="images.elementIcon(item.title)" />
                  </template>
                </v-list-item>
              </template>
              <template #chip="{item}">
                <v-chip>
                  <v-avatar :image="images.elementIcon(item.title)" />
                </v-chip>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider />
    <v-data-table :headers="styleHeaders" :items="showStyles" :items-per-page="showStyles.length" v-model:sort-by="styleSortBy" multi-sort hover fixed-header>
      <template #headers="{columns, toggleSort, getSortIcon, isSorted}">
        <tr>
          <th v-for="col in columns"
              :class="['v-data-table__td', 'v-data-table-column--align-start', 'v-data-table__th', col.sortable ? 'v-data-table__th--sortable' : '']"
              :key="col.key"
              :colspan="col.colspan"
              :rowspan="col.rowspan"
              @click="col.sortable ? toggleSort(col) : null">
            <div class="v-data-table-header__content">
              <span>{{col.title}}</span>
              <div>
                <v-icon v-if="col.sortable"
                        :icon="getSortIcon(col)"
                        class="v-data-table-header__sort-icon"
                        density="compact"
                        :color="isSorted(col) ? 'rgba(0,0,0,0.6)': 'rgba(0,0,0,0.3)'"></v-icon>
                <span>{{getSortOrder(col.key)}}</span>
              </div>
            </div>
          </th>
        </tr>
      </template>
      <template #[`item.icon`]="{item}">
        <v-avatar :image="images.styleIcon(item.background)"/>
      </template>
      <template #[`item.type`]="{item}">
        <v-avatar :image="images.typeIcon(item.type)" />
      </template>
      <template #[`item.tier`]="{item}">
        <v-avatar :image="images.rarityIcon(item.tier)" />
      </template>
      <template #[`item.elements`]="{item}">
        <v-avatar v-for="element in item.elements" :image="images.elementIcon(element)" />
      </template>
      <template #bottom><div></div></template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
.v-data-table-header__content:hover {
  color: rgba(0,0,0,1);
}
</style>