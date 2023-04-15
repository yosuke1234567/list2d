import { useEffect, useRef } from 'react'
import { TableCell, TableRow, TextField } from '@mui/material'
import { looksState } from '@/stores/looks'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeIndexState } from '@/stores/activeIndex'

type Props = {
    i: number
    j: number
}

export const EditRow = ({ i, j }: Props) => {
    const [looks, setLooks] = useRecoilState(looksState)
    const activeIndex = useRecoilValue(activeIndexState)

    const hrefRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLInputElement>(null)
    const productIdRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const sizesRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        hrefRef.current!.value = looks[i][j].href
        categoryRef.current!.value = looks[i][j].category
        productIdRef.current!.value = looks[i][j].productId
        priceRef.current!.value = looks[i][j].price
        if (looks[i][j].sizes) sizesRef.current!.value = looks[i][j].sizes!
    }, [activeIndex])

    const onPriceChange = () => {
        const replace = priceRef.current!.value.replace(/\D/g, '')
        const locale = replace ? Number(replace).toLocaleString() : ''
        priceRef.current!.value = locale
    }

    const updateLooks = (prop: string, value: string) => {
        const copy = [...looks]
        copy[i] = [...looks[i]]
        copy[i][j] = { ...copy[i][j], [prop]: value }
        setLooks(copy)
    }
    
    const onHrefBlur = () => {
        if (looks[i][j].href !== hrefRef.current!.value) {
            updateLooks('href', hrefRef.current!.value)
        }
    }
    
    const onCategoryBlur = () => {
        if (looks[i][j].category !== categoryRef.current!.value) {
            updateLooks('category', categoryRef.current!.value)
        }
    }
    
    const onProductIdBlur = () => {
        if (looks[i][j].productId !== productIdRef.current!.value) {
            updateLooks('productId', productIdRef.current!.value)
        }
    }
    
    const onPriceBlur = () => {
        if (looks[i][j].price !== priceRef.current!.value) {
            updateLooks('price', priceRef.current!.value)
        }
    }
    
    const onSizesBlur = () => {
        if (looks[i][j].sizes !== sizesRef.current!.value) {
            updateLooks('sizes', sizesRef.current!.value)
        }
    }

    return (
        <TableRow>
            <TableCell>
                <TextField inputRef={hrefRef} onBlur={onHrefBlur} size="small" fullWidth />
            </TableCell>
            <TableCell>
                <TextField inputRef={categoryRef} onBlur={onCategoryBlur} size="small" />
            </TableCell>
            <TableCell>
                <TextField inputRef={productIdRef} onBlur={onProductIdBlur} size="small" placeholder="101不要" />
            </TableCell>
            <TableCell>
                <TextField inputRef={priceRef} onBlur={onPriceBlur} onChange={onPriceChange} size="small" placeholder="円マーク不要" />
            </TableCell>
            <TableCell>
                <TextField inputRef={sizesRef} onBlur={onSizesBlur} size="small" placeholder="〇号～〇号" />
            </TableCell>
        </TableRow>
    )
}