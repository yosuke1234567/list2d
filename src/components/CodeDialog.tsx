import { useState } from 'react'
import { Button, Dialog, DialogContent, TextField } from '@mui/material'
import { MdCode } from 'react-icons/md'
import { codeStr } from './codeStr'
import { useRecoilValue } from 'recoil';
import { looksState } from '@/stores/looks';
import { basePathState } from '@/stores/basePath'

type Props = {}

export const CodeDialog = (props: Props) => {
    const looks = useRecoilValue(looksState)
    const basePath = useRecoilValue(basePathState)

    const [openDialog, setOpenDialog] = useState(false)
    const [code, setCode] = useState('')

    const onOpenDialog = () => {
        setOpenDialog(true)
        setCode(codeStr(looks, basePath))
    }
    
    return (
        <>
            <Button onClick={onOpenDialog} startIcon={<MdCode />}>Export Code</Button>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
                maxWidth="lg"
            >
                <DialogContent>
                    <TextField multiline fullWidth value={code}
                        inputProps={{ style: {
                             fontFamily: 'Consolas, "Courier New", Meiryo, monospace',
                             fontSize: '0.875rem'
                        } }}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}