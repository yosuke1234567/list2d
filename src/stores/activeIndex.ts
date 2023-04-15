import { atom } from 'recoil'

export const activeIndexState = atom<number>({
    key: 'active-index-state',
    default: 0
})