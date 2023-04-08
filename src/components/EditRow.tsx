import { IconButton, TableCell, TableRow, TextField } from '@mui/material'
import { looksState } from '@/stores/looks'
import { useRecoilState } from 'recoil'
import { MdDelete } from 'react-icons/md'

type Props = {
    i: number
    j: number
}

export const EditRow = ({ i, j }: Props) => {
    const [looks, setLooks] = useRecoilState(looksState)

    const updateInput = (prop: string, value: string) => {
        const copy = [...looks]
        copy[i] = [...looks[i]]
        copy[i][j] = {...copy[i][j], [prop]: value}
        setLooks(copy)
    }

    const updatePrice = (value: string) => {
        const replace = value.replace(/\D/g, '')
        const locale = replace ? Number(replace).toLocaleString() : ''
        updateInput('price', locale)
    }

    const deleteRow = () => {
        const copy = [...looks]
        copy[i] = looks[i].filter((item, index) => (index !== j))
        setLooks(copy)
    }

    return (
        <TableRow>
            <TableCell>
                <TextField value={looks[i][j].href} onChange={(e) => updateInput('href', e.target.value)} size="small" fullWidth />
            </TableCell>
            <TableCell>
                <TextField value={looks[i][j].category} onChange={(e) => updateInput('category', e.target.value)} size="small" />
            </TableCell>
            <TableCell>
                <TextField value={looks[i][j].productId} onChange={(e) => updateInput('productId', e.target.value)} size="small" placeholder="101不要" />
            </TableCell>
            <TableCell>
                <TextField value={looks[i][j].price} onChange={(e) => updatePrice(e.target.value)} size="small" placeholder="円マーク不要" />
            </TableCell>
            <TableCell>
                <TextField value={looks[i][j].sizes} onChange={(e) => updateInput('sizes', e.target.value)} size="small" placeholder="〇号～〇号" />
            </TableCell>
            <TableCell>
                <IconButton onClick={deleteRow} aria-label='delete row'>
                    <MdDelete />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}