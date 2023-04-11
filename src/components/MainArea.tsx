import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Button, Container, Dialog, DialogActions, DialogContent, Tab, Tabs } from '@mui/material'
import { looksState } from '@/stores/looks'
import { LookDetail } from '@/components/LookDetail'

type Props = {}

export const MainArea = (props: Props) => {
  const [looks, setLooks] = useRecoilState(looksState)

  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('looks')) {
      const parsed = JSON.parse(localStorage.getItem('looks')!)
      setLooks(parsed)
    }
  }, [])

  const deleteTable = () => {
    const newLooks = looks.filter((look, index) => (index !== activeTabIndex))
    setActiveTabIndex(activeTabIndex == (looks.length - 1) ? (activeTabIndex - 1) : activeTabIndex)
    setLooks(newLooks)
    setShowDeleteDialog(false)
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 1, pb: 3, mt: 12, mb: 30, border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fff' }}>
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogContent sx={{ width: 320 }}>LOOK {activeTabIndex + 1} を削除しますか？<br />後続のLOOKは前に詰められます。</DialogContent>
        <DialogActions><Button onClick={deleteTable} color='error'>OK</Button></DialogActions>
      </Dialog>
      <div>
        <Tabs value={activeTabIndex} onChange={(e, value: number) => setActiveTabIndex(value)} variant='scrollable' sx={{ borderBottom: '1px solid #ddd', mb: 3 }}>
          {
            looks.map((look, i) => (
              <Tab key={i} label={`LOOK ${i + 1}`} />
            ))
          }
        </Tabs>
        <LookDetail i={activeTabIndex} setShowDeleteDialog={setShowDeleteDialog} />
      </div>
    </Container>
  )
}