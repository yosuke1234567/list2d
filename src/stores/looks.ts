import { atom } from 'recoil'

export type Item = {
    key: number
    href: string
    category: string
    productId: string
    price: string
    sizes?: string
}

export const looksState = atom<Item[][]>({
    key: 'looks-state',
    default: []
})