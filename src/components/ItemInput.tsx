import { looksState } from '@/stores/looks'
import { Button, TextField } from '@mui/material'
import { useRecoilState } from 'recoil'
import { useState } from 'react'
import { css } from '@emotion/css'

type Props = {
    lookIndex: number
}

export const ItemInput = (props: Props) => {
    const formSx = css({
        display: 'flex',
        alignItems: 'center',
        gap: '1em'
    })

    const [category, setCategory] = useState('')
    const [productId, setProductId] = useState('')
    const [price, setPrice] = useState('')
    const [sizes, setSizes] = useState('')
    const [href, setHref] = useState('')
    const [looks, setLooks] = useRecoilState(looksState)

    const onPriceChange = ( value: string ) => {
        const replace = value.replace(/\D/g, '')
        const locale = replace ? Number(replace).toLocaleString() : ''
        setPrice(locale)
    }

    const add = () => {
        const newLooks = [...looks]
        newLooks[props.lookIndex] = [...newLooks[props.lookIndex], {
            key: newLooks[props.lookIndex].length,
            href: href,
            category: category,
            productId: productId,
            price: price,
            sizes: sizes,
        }]
        setLooks(newLooks)

        console.log(newLooks)

        setHref('')
        setCategory('')
        setProductId('')
        setPrice('')
        setSizes('')
    }

    // const getSuggest = (prop: string) => {
    //     const list: string[] = []
    //     looks.forEach(look => {
    //         look.forEach(item => {
    //             if (prop === 'href') list.push(item.href)
    //             else if (prop === 'category') list.push(item.category)
    //             else if (prop === 'productId') list.push(item.productId)
    //             else if (prop === 'price') list.push(item.price)
    //             else if (prop === 'sizes' && item.sizes) list.push(item.sizes)
    //         })
    //     })
    // }
    
    return (
        <form onSubmit={(e) => e.preventDefault()} className={formSx}>
            <TextField label="href" value={href} onChange={(e) => setHref(e.target.value)} />
            <TextField name="category" label="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <TextField label="productId" value={productId} onChange={(e) => setProductId(e.target.value)} />
            <TextField label="price" value={price} onChange={(e) => onPriceChange(e.target.value)} />
            <TextField label="sizes" placeholder="〇号～〇号" value={sizes} onChange={(e) => setSizes(e.target.value)} />
            <Button onClick={add} type="submit">Add</Button>
        </form>
    )
}