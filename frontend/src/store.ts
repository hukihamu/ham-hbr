import {defineStore} from 'pinia'
import {Character, Passive, Skill, Style, StyleType} from '@ham-vue3-gas/shared'
import {scripts} from '@/scripts.ts'

export const useStore = defineStore('store', {
  state: () => ({
    styles: <Style[]>[],
    characters: <Character[]>[],
    passives: <Passive[]>[],
    skills: <Skill[]>[],
    isAdmin: false,
  }),
  actions: {
    init(...options: ('styles' | 'characters' | 'passives' | 'skills')[]) {
      new Set(options).forEach(it => {
        switch (it) {
          case 'characters':
            if (!this.characters.length) {
              scripts.send('getCharacters').then(it => {
                this.characters = it
              })
            }
            break
          case 'passives':
            if (!this.passives.length) {
              scripts.send('getPassives').then(it => {
                this.passives = it
              })
            }
            break
          case 'skills':
            if (!this.skills.length) {
              scripts.send('getSkills').then(it => {
                this.skills = it
              })
            }
            break
          case 'styles':
            if (!this.styles.length) {
              scripts.send('getStyles').then(it => {
                this.styles = it
              })
            }
            break
        }
      })
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