import { useState } from 'react'
import { Alert, Button, Container, Snackbar } from '@mui/material'
import { css } from '@emotion/css'
import { useRecoilState } from 'recoil'
import { looksState } from '@/stores/looks'
import { MdAdd, MdSave } from 'react-icons/md'
import { CodeDialog } from './CodeDialog'

type Props = {}

export const Header = (props: Props) => {
  const [looks, setLooks] = useRecoilState(looksState)
  const [showAlert, setShowAlert] = useState(false)

  const headerSx = css({
    position: 'fixed',
    top: 0,
    width: '100%',
    padding: '16px 0',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    zIndex: 10,
  })

  const save = () => {
    if (looks[0]) {
      const looksStr = JSON.stringify(looks)
      localStorage.setItem('looks', looksStr)

      setShowAlert(true)
    }
  }

  return (
    <header className={headerSx}>
      <Container maxWidth="lg" sx={{ display: 'flex', gap: 3 }}>
        <Button onClick={() => setLooks([...looks, []])} startIcon={<MdAdd />}>New Look</Button>
        <Button onClick={save} startIcon={<MdSave />}>Save</Button>
        <CodeDialog />
        <Snackbar open={showAlert} onClose={() => setShowAlert(false)}
          autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="info">保存しました</Alert>
        </Snackbar>
      </Container>
    </header>
  )
}