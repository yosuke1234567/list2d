import { atom } from 'recoil'

export const basePathState = atom<string>({
    key: 'base-path-state',
    default: ''
})