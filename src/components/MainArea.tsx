import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Container, Tab, Tabs } from '@mui/material'
import { looksState } from '@/stores/looks'
import { LookDetail } from '@/components/LookDetail'
import { activeIndexState } from '@/stores/activeIndex'

type Props = {}

export const MainArea = (props: Props) => {
  const [looks, setLooks] = useRecoilState(looksState)
  const [activeIndex, setActiveIndex] = useRecoilState(activeIndexState)

  useEffect(() => {
    if (localStorage.getItem('looks')) {
      const parsed = JSON.parse(localStorage.getItem('looks')!)
      setLooks(parsed)
    }
  }, [])

  return (
    <Container maxWidth="lg" sx={{ pt: 1, pb: 3, mt: 12, mb: 30, border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fff' }}>
      <Tabs value={activeIndex} onChange={(e, value: number) => setActiveIndex(value)} variant='scrollable' sx={{ borderBottom: '1px solid #ddd', mb: 3 }}>
        {
          looks.map((look, i) => (
            <Tab key={i} label={`LOOK ${i + 1}`} />
          ))
        }
      </Tabs>
      <LookDetail i={activeIndex} />
    </Container>
  )
}