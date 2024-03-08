<script setup lang="ts">
import {ref, computed} from 'vue'
import {useStorageStore, useStore} from '@/store'
import {images} from '@/utils/images'
import {storeToRefs} from 'pinia'
import {Style} from '@ham-vue3-gas/shared'

const store = useStore()
const {styles, characters} = storeToRefs(store)
store.init('styles', 'characters')
const {stylesState} = storeToRefs(useStorageStore())

const showStyles = computed<Style[]>(() => {
  return styles.value.filter(it =>
      (!stylesState.value.character.length || stylesState.value.character.includes(it.character_id)) &&
      (!stylesState.value.tier.length || stylesState.value.tier.includes(it.tier)) &&
      (!stylesState.value.type.length || stylesState.value.type.includes(it.type)) &&
      (!stylesState.value.element.length || stylesState.value.element.some(e => it.elements.includes(e as any) || (e === 'Nonelement' && !it.elements.length)))
  );
});
const styleSortBy = ref<{key: string, order: string}[]>([])
const styleHeaders = [
  {key: 'id', title: '', minWidth: '170px', maxWidth: '300px'},
  {key: 'name', title: '名前'},
  {key: 'tier', title: 'レア', width: '80px'},
  {key: 'role', title: 'ロール', width: '100px'},
  {key: 'type', title: '属性', width: '80px'},
  {key: 'elements', title: '元素', width: '160px'},
  // {key: 'skills', title: 'スキル'},
  // {key: 'passives', title: 'パッシブ'},
  {key: 'in_date', title: '追加日', width: '100px'},
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
                      v-model="stylesState.character"
                      clearable
                      item-value="id"
                      item-title="chara"
                      :items="characters">
              <template #item="{item, props}">
                <v-list-item v-bind="props">
                  <template #prepend>
                    <v-avatar :image="images.charSmallIcon(item.raw.chara_label)" />
                  </template>
                </v-list-item>
              </template>
              <template #selection="{item}">
                <v-avatar :image="images.charSmallIcon(item.raw.chara_label)" />
              </template>
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-select multiple
                      label="レア"
                      v-model="stylesState.tier"
                      clearable
                      :items="['SS', 'S', 'A']">
              <template #item="{item, props}">
                <v-list-item v-bind="props">
                  <template #title>
                    <v-avatar :image="images.rarityIcon(item.title)" />
                  </template>
                </v-list-item>
              </template>
              <template #selection="{item}">
                <v-avatar :image="images.rarityIcon(item.title)" />
              </template>
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-select multiple
                      label="属性"
                      v-model="stylesState.type"
                      clearable
                      :items="['Slash', 'Stab', 'Strike']">
              <template #item="{item, props}">
                <v-list-item v-bind="props">
                  <template #title>
                    <v-avatar :image="images.typeIcon(item.title)" />
                  </template>
                </v-list-item>
              </template>
              <template #selection="{item}">
                <v-avatar :image="images.typeIcon(item.title)" />
              </template>
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-select multiple
                      label="元素"
                      v-model="stylesState.element"
                      clearable
                      :items="['Fire', 'Ice', 'Thunder', 'Light', 'Dark', 'Nonelement']">
              <template #item="{item, props}">
                <v-list-item v-bind="props">
                  <template #title>
                    <v-avatar :image="images.elementIcon(item.title)" />
                  </template>
                </v-list-item>
              </template>
              <template #selection="{item}">
                <v-avatar :image="images.elementIcon(item.title)" />
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-data-table :headers="styleHeaders"
                    :items="showStyles"
                    :items-per-page="showStyles.length"
                    v-model:sort-by="styleSortBy"
                    multi-sort
                    hover
                    fixed-header
                    height="calc(100vh - 155px)">
        <template #headers="{columns, toggleSort, getSortIcon, isSorted}">
          <tr>
            <th v-for="col in columns"
                :class="['v-data-table__td', 'v-data-table-column--align-start', 'v-data-table__th', col.sortable ? 'v-data-table__th--sortable' : '', 'sort-icon-hover']"
                :key="col.key"
                :colspan="col.colspan"
                :rowspan="col.rowspan"
                @click="col.sortable ? toggleSort(col) : null">
              <div class="v-data-table-header__content">
                <span>{{col.title}}</span>
                <div>
                  <v-icon v-if="col.sortable"
                          :icon="getSortIcon(col)"
                          density="compact"
                          :color="isSorted(col) ? 'rgba(var(--v-theme-on-surface),0.6)': 'rgba(var(--v-theme-on-surface),0.3)'"></v-icon>
                  <span>{{getSortOrder(col.key)}}</span>
                </div>
              </div>
            </th>
          </tr>
        </template>
        <template #[`item.id`]="{item}">
          <v-img :src="images.styleSelectIcon(item.bg)" height="52px" min-width="170px" max-width="300px" cover/>
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
        <template #[`item.in_date`]="{item}">
          <span>{{new Date(item.in_date).toLocaleDateString('ja-JP')}}</span>
        </template>
        <template #bottom><div></div></template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style scoped>
.sort-icon-hover:hover i {
  color: rgb(var(--v-theme-on-surface), 0.9) !important;
}
</style>