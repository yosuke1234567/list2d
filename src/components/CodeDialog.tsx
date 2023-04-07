import { useState } from 'react'
import { renderToString } from 'react-dom/server';
import { Button, Dialog, DialogContent, TextField } from '@mui/material'
import { MdCode } from 'react-icons/md'
import { codeStr } from './codeStr'
import { RecoilRoot, useRecoilValue } from 'recoil';
import { looksState } from '@/stores/looks';

type Props = {}

export const CodeDialog = (props: Props) => {
    const looks = useRecoilValue(looksState)

    const [openDialog, setOpenDialog] = useState(false)
    const [code, setCode] = useState('')

    const onOpenDialog = () => {
        setOpenDialog(true)
        setCode(codeStr(looks))
    }
    
    return (
        <>
            <Button onClick={onOpenDialog} startIcon={<MdCode />}>Export Code</Button>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
                maxWidth="md"
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