'use client'

import React from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'

interface TrackAddressModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (blockchain: string, address: string) => void;
  blockchains: string[];
}

const TrackAddressModal: React.FC<TrackAddressModalProps> = ({
  open,
  onClose,
  onSubmit,
  blockchains,
}) => {
  const [selectedBlockchain, setSelectedBlockchain] = React.useState('')
  const [newAddress, setNewAddress] = React.useState('')

  const handleSubmit = () => {
    onSubmit(selectedBlockchain, newAddress)
    setSelectedBlockchain('')
    setNewAddress('')
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className={styles.trackDialog}
      disableEscapeKeyDown
      onBackdropClick={() => null}
      PaperProps={{
        className: styles.paper,
      }}
      sx={{
        '& .MuiDialog-container': {
          paddingLeft: '240px',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '& .MuiDialog-paper': {
          margin: '0',
          width: '100%',
          maxWidth: '800px',
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <DialogTitle className={styles.title}>
        <div className={styles.titleContent}>
          <h2>Track New Address</h2>
          <IconButton onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className={styles.content}>
        <div className="flex flex-row gap-4 py-4">
          <FormControl className="flex-1">
            <InputLabel id="blockchain-select-label" sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-focused': {
                color: 'white',
              },
            }}>
              Select Blockchain
            </InputLabel>
            <Select
              labelId="blockchain-select-label"
              value={selectedBlockchain}
              onChange={(e) => setSelectedBlockchain(e.target.value)}
              className={styles.formField}
              sx={{
                color: 'white',
                height: '48px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    background: 'linear-gradient(125deg, #17707835 15%, #12606750 35%, #0c4b51 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    marginTop: '8px',
                    '& .MuiMenuItem-root': {
                      color: 'white',
                      padding: '12px 16px',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-selected': {
                        background: 'rgba(255, 255, 255, 0.05)',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                        },
                      },
                    },
                  },
                },
              }}
            >
              {blockchains.map((blockchain) => (
                <MenuItem key={blockchain} value={blockchain}>
                  {blockchain}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={`${styles.formField} flex-1`}
            label="Enter Wallet Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                height: '48px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: 'white',
                },
              },
            }}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!selectedBlockchain || !newAddress}
          className={`${styles.formField} p-5 mt-4 w-full`}
        >
          Track Address
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default TrackAddressModal
