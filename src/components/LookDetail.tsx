import { useState } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useRecoilState } from 'recoil'
import { looksState } from '@/stores/looks'
import { EditRow } from './EditRow'

type Props = {
  i: number
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export const LookDetail = ({ i, setShowDeleteDialog }: Props) => {
  const [looks, setLooks] = useRecoilState(looksState)

  const add = () => {
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

  return (
    <div role='tabpanel'>
      <Grid2 container justifyContent='space-between'>
        <Button onClick={add}>アイテムを追加</Button>
        <Button onClick={() => setShowDeleteDialog(true)} color="error">このLOOKを削除</Button>
      </Grid2>
      <TableContainer sx={{ mt: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f9' }}>
            <TableRow>
              <TableCell sx={{ width: 400 }}>リンク</TableCell>
              <TableCell>アイテム名</TableCell>
              <TableCell>品番</TableCell>
              <TableCell>値段</TableCell>
              <TableCell>サイズ</TableCell>
              <TableCell></TableCell>
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