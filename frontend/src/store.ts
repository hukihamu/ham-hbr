import {defineStore} from 'pinia'
import {Accessory, Character, Event, Passive, Skill, Style, StyleType, Chapter, ChapterImages} from '@ham-vue3-gas/shared'
import {scripts} from '@/scripts'

export const useStore = defineStore('store', {
  state: () => ({
    styles: <Style[]>[],
    characters: <Character[]>[],
    passives: <Passive[]>[],
    skills: <Skill[]>[],
    orb: <Accessory[]>[],
    souls: <Accessory[]>[],
    events: <Event[]>[],
    masterData: <{chapters: Chapter[], chapterImages: ChapterImages}>{chapters: [], chapterImages: {}},
    isAdmin: false,
    isLoading: false,
  }),
  actions: {
    init(...options: ('styles' | 'characters' | 'passives' | 'skills' | 'orb' | 'souls' | 'events' | 'masterData')[]) {
      const promiseList = [...(new Set(options))].map(it => {
        switch (it) {
          case 'characters':
            if (!this.characters.length) {
              return scripts.send('getCharacters').then(it => {
                this.characters = it
              })
            }
            break
          case 'passives':
            if (!this.passives.length) {
              return scripts.send('getPassives').then(it => {
                this.passives = it
              })
            }
            break
          case 'skills':
            if (!this.skills.length) {
              return scripts.send('getSkills').then(it => {
                this.skills = it
              })
            }
            break
          case 'styles':
            if (!this.styles.length) {
              return scripts.send('getStyles').then(it => {
                this.styles = it
              })
            }
            break
          case 'orb':
            if (!this.orb.length) {
              return scripts.send('getOrb').then(it => {
                this.orb = it
              })
            }
            break
          case 'events':
            if (!this.events.length) {
              return scripts.send('getEvents').then(it => {
                this.events = it
              })
            }
            break
          case 'souls':
            if (!this.souls.length) {
              return scripts.send('getSouls').then(it => {
                this.souls = it
              })
            }
            break
          case 'masterData':
            if (!Object.keys(this.masterData.chapterImages).length) {
              return scripts.send('getMasterData').then(it => {
                this.masterData = it
              })
            }
            break
        }
      }).filter(it => it)
      if (promiseList.length) {
        this.isLoading = true
        Promise.all(promiseList).then(() => {
          this.isLoading = false
        })
      }
    }
  }
})

export const useStorageStore = defineStore('localStorage', {
  persist: true,
  state: () => ({
    lb0: new Array<number>(),
    lb1: new Array<number>(),
    lb2: new Array<number>(),
    lb3: new Array<number>(),
    lb4: new Array<number>(),
    lb5: new Array<number>(),
    lb6: new Array<number>(),
    generalizeProgress: new Array<number>(),
    generalizeDone: new Array<number>(),
    growthProgress: new Array<number>(),
    growthDone: new Array<number>(),
    orbProgress: {} as {[id: number]: number[]},
    orbDone: {} as {[id: number]: number[]},
    bonus1: new Array<number>(),
    bonus2: new Array<number>(),
    bonus3: new Array<number>(),
    storiesDone: new Array<number>(),
    theme: 'light',
    userState: {
      tab: '',
    },
    stylesState: {
      tier: new Array<StyleType['tier']>(),
      type: new Array<StyleType['type']>(),
      element: new Array<StyleType['element'] | 'Nonelement'>(),
      character: new Array<number>(),
    }
  }),
  getters: {
    ownedStyles(): number[] {
      return [...this.lb0,
        ...this.lb1,
        ...this.lb2,
        ...this.lb3,
        ...this.lb4,
        ...this.lb5,
        ...this.lb6]
    }
  }
})