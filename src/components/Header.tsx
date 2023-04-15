import { useEffect, useState } from 'react'
import { Alert, Button, Container, Dialog, DialogActions, DialogContent, Snackbar, TextField } from '@mui/material'
import { css } from '@emotion/css'
import { useRecoilState } from 'recoil'
import { looksState } from '@/stores/looks'
import { basePathState } from '@/stores/basePath'
import { activeIndexState } from '@/stores/activeIndex'
import { MdAdd, MdSave, MdRemoveCircleOutline } from 'react-icons/md'
import { CodeDialog } from './CodeDialog'

const headerSx = css({
  position: 'fixed',
  top: 0,
  width: '100%',
  padding: '18px 0 16px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#fff',
  zIndex: 10,
})

type Props = {}

export const Header = (props: Props) => {
  const [looks, setLooks] = useRecoilState(looksState)
  const [basePath, setBasePath] = useRecoilState(basePathState)
  const [activeIndex, setActiveIndex] = useRecoilState(activeIndexState)

  const [showAlert, setShowAlert] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('base-path')) {
      setBasePath(localStorage.getItem('base-path')!)
    }
  }, [])

  const save = () => {
    if (looks[0]) {
      const looksStr = JSON.stringify(looks)
      localStorage.setItem('looks', looksStr)

      localStorage.setItem('base-path', basePath)

      setShowAlert(true)
    }
  }

  const deleteTable = () => {
    const newLooks = looks.filter((look, index) => index !== (looks.length - 1))
    setActiveIndex(activeIndex == (looks.length - 1) ? (activeIndex - 1) : activeIndex)
    setLooks(newLooks)
    setShowDeleteDialog(false)
  }

  return (
    <header className={headerSx}>
      <Container maxWidth="lg" sx={{ display: 'flex', gap: 3 }}>
        <Button onClick={() => setLooks([...looks, []])} startIcon={<MdAdd />}>LOOKを追加</Button>
        <Button onClick={save} startIcon={<MdSave />}>保存</Button>
        <CodeDialog />
        <Button onClick={() => setShowDeleteDialog(true)} color='error' startIcon={<MdRemoveCircleOutline />}>
          LOOKを1つ減らす
        </Button>
        <TextField value={basePath} onChange={(e) => setBasePath(e.target.value)} label="対象パス" size="small" sx={{ width: 280, ml: 'auto' }} />
      </Container>

      <Snackbar open={showAlert} onClose={() => setShowAlert(false)}
        autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="info">保存しました</Alert>
      </Snackbar>
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogContent sx={{ width: 320 }}>LOOKを1つ減らしますか？<br />LOOK {looks.length} が削除されます。</DialogContent>
        <DialogActions><Button onClick={deleteTable} color='error'>OK</Button></DialogActions>
      </Dialog>
    </header>
  )
}