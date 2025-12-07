// src/stores/skillsStore.ts
import { defineStore } from 'pinia'

// 正确：用 defineStore 定义 Store，返回一个函数
export const useSkillsStore = defineStore('skillsStore', { // 第一个参数是唯一 ID
    state: () => ({
        skills: [] as string[] // 初始化一个空数组（避免 undefined）
    }),
    actions: {
        setSkillsData(data: string[]) {
            this.skills = data
        },
        clearSkillsData(){
            this.skills = []
        }
    }
})