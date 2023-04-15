import { useState } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { BiListPlus, BiListMinus } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { looksState } from '@/stores/looks'
import { EditRow } from './EditRow'

type Props = {
  i: number
}

export const LookDetail = ({ i }: Props) => {
  const [looks, setLooks] = useRecoilState(looksState)

  const addItem = () => {
    const copy = [...looks]
    copy[i] = [...copy[i], {
      key: Date.now(),
      href: '',
      category: '',
      productId: '',
      price: '',
      sizes: '',
    }]
    setLooks(copy)
  }

  const deleteItem = () => {
    const copy = [...looks]
    copy[i] = [...looks[i]]
    copy[i].pop()
    setLooks(copy)
  }

  return (
    <div role='tabpanel'>
      <Grid2 container justifyContent='space-between'>
        <Button onClick={addItem} startIcon={<BiListPlus />}>アイテムを追加</Button>
        <Button onClick={deleteItem} disabled={looks[i].length < 1} startIcon={<BiListMinus />} color='error'>末尾のアイテムを削除</Button>
      </Grid2>
      <TableContainer sx={{ mt: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f9' }}>
            <TableRow>
              <TableCell sx={{ width: 420 }}>リンク</TableCell>
              <TableCell>アイテム名</TableCell>
              <TableCell>品番</TableCell>
              <TableCell>値段</TableCell>
              <TableCell>サイズ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              looks[i] ? looks[i].map((item, j) => (
                <EditRow key={item.key} i={i} j={j} />
              )) : <></>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}