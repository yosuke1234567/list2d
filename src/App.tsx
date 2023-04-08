import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, createTheme, Dialog, DialogActions, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from '@mui/material'
import { MdExpandMore } from 'react-icons/md'
import { looksState } from '@/stores/looks'
import { Header } from './components/Header'
import { EditRow } from './components/EditRow'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

const App = () => {
  const muiTheme = createTheme({
    typography: {
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
  })

  const [looks, setLooks] = useRecoilState(looksState)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletedLook, setDeletedLook] = useState<number>(0)

  useEffect(() => {
    if (localStorage.getItem('looks')) {
      const parsed = JSON.parse(localStorage.getItem('looks')!)
      setLooks(parsed)
    }
  }, [])

  const add = (i: number) => {
    const copy = [...looks]
    copy[i] = [...copy[i], {
      key: copy[i].length,
      href: '',
      category: '',
      productId: '',
      price: '',
      sizes: '',
    }]
    setLooks(copy)
  }

  const confirmDelete = (i: number) => {
    setDeletedLook(i)
    setShowDeleteDialog(true)
  }

  const deleteTable = (i: number) => {
    const newLooks = looks.filter((look, index) => (index !== i))
    setLooks(newLooks)
    setShowDeleteDialog(false)
  }

  return (
    <div className="App">
      <ThemeProvider theme={muiTheme}>
        <Header />
        <Container maxWidth="lg" sx={{ pt: 13, pb: 36 }}>
          <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
            <DialogContent sx={{ width: 320 }}>LOOK {deletedLook + 1} を削除しますか？</DialogContent>
            <DialogActions><Button onClick={() => deleteTable(deletedLook)}>OK</Button></DialogActions>
          </Dialog>
          {
            looks.map((look, i) => (
              <Accordion key={i}>
                <AccordionSummary expandIcon={<MdExpandMore size={'1.5em'} />}>LOOK {i + 1}</AccordionSummary>
                <AccordionDetails sx={{ padding: 2, borderTop: '1px solid #ddd', }}>
                  <Grid2 container justifyContent='space-between'>
                    <Button onClick={() => add(i)}>Add Row</Button>
                    <Button onClick={() => confirmDelete(i)} color="error">Delete Table</Button>
                  </Grid2>
                  <TableContainer sx={{ mt: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#f5f5f9' }}>
                        <TableRow>
                          <TableCell sx={{ width: 300 }}>href</TableCell>
                          <TableCell>category</TableCell>
                          <TableCell>productId</TableCell>
                          <TableCell>price</TableCell>
                          <TableCell>sizes</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          look.map((item, j) => (
                            <EditRow key={item.key} i={i} j={j} />
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))
          }
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
