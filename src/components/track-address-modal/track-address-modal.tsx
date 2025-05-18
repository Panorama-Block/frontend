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
  error?: string | null;
  isLoading?: boolean;
}

const blockchains = [
  "ETH",
  "BSC",
  "ARBITRUM",
  "POLYGON",
  "ZKSYNC",
  "STARKNET",
  "OPTIMISM",
  "AVAX_CCHAIN",
  "POLYGONZK",
  "BASE",
  "LINEA",
  "MODE",
  "TRON",
  "BTC",
  "SCROLL",
  "BLAST",
  "COSMOS",
  "OSMOSIS",
  "NEUTRON",
  "NOBLE",
  "DYDX",
  "SOLANA",
  "CRONOS",
  "BNB",
  "FANTOM",
  "AURORA",
  "MAYA",
  "THOR",
  "BOBA",
  "MOONBEAM",
  "MOONRIVER",
  "OKC",
  "BOBA_BNB",
  "BOBA_AVALANCHE",
  "LTC",
  "BCH",
  "HARMONY",
  "EVMOS",
  "HECO",
  "METIS",
  "SIF",
  "BRISE",
  "STARGAZE",
  "FUSE",
  "CRYPTO_ORG",
  "CHIHUAHUA",
  "BANDCHAIN",
  "COMDEX",
  "REGEN",
  "IRIS",
  "EMONEY",
  "GNOSIS",
  "JUNO",
  "AXELAR",
  "STRIDE",
  "KCC",
  "MARS",
  "TERRA",
  "TELOS",
  "BITSONG",
  "AKASH",
  "KI",
  "PERSISTENCE",
  "MEDIBLOC",
  "KUJIRA",
  "SENTINEL",
  "INJECTIVE",
  "SECRET",
  "KONSTELLATION",
  "STARNAME",
  "BITCANNA",
  "UMEE",
  "DESMOS",
  "LUMNETWORK",
  "TERRA_CLASSIC",
  "CELO",
  "DASH",
  "SHIMMER",
  "XLAYER",
  "IOTA",
  "POLKADOT",
  "DOGE",
  "GOERLI",
  "GOERLI_ARBITRUM",
  "GOERLI_OPTIMISM"
]

const TrackAddressModal: React.FC<TrackAddressModalProps> = ({
  open,
  onClose,
  onSubmit,
  error,
  isLoading = false,
}) => {
  const [blockchain, setAddress] = React.useState('')
  const [address, setBlockchain] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(blockchain, address)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      classes={{
        paper: styles.modalPaper
      }}
      sx={{
        '& .MuiDialog-paper': {
          margin: { xs: '16px', sm: '32px' },
          width: { xs: 'calc(100% - 32px)', sm: '100%' },
          maxWidth: { xs: '100%', sm: '600px' },
          background: '#051718',
          border: '1px solid rgba(60, 223, 239, 0.1)',
          borderRadius: '16px',
        }
      }}
    >
      <DialogTitle className="flex justify-between items-center p-6">
        <span className="text-white text-xl font-semibold">Track New Address</span>
        <IconButton
          onClick={onClose}
          className="text-white hover:text-gray-300"
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="flex flex-col gap-6 p-6 pt-2">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <FormControl className="flex-1 min-w-0">
            <InputLabel id="blockchain-label" className={styles.inputLabel}>
              Select Network
            </InputLabel>
            <Select
              labelId="blockchain-label"
              value={blockchain}
              onChange={(e) => setBlockchain(e.target.value)}
              className={styles.select}
              required
              sx={{
                color: 'white',
                backgroundColor: 'rgba(60, 223, 239, 0.05)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(60, 223, 239, 0.2)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(60, 223, 239, 0.3)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3CDFEF',
                },
                '& .MuiSelect-icon': {
                  color: 'rgba(60, 223, 239, 0.5)',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#051718',
                    border: '1px solid rgba(60, 223, 239, 0.1)',
                    '& .MuiMenuItem-root': {
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(60, 223, 239, 0.1)',
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(60, 223, 239, 0.15)',
                      },
                    },
                  },
                },
              }}
            >
              {blockchains.map((chain) => (
                <MenuItem key={chain} value={chain}>
                  {chain}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address"
            required
            className="flex-1 min-w-0"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(60, 223, 239, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(60, 223, 239, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(60, 223, 239, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3CDFEF',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
            }}
          />
        </form>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!blockchain || !address || isLoading}
          className="w-full bg-gradient-to-r from-[#2cc3ce] via-[#27b8c3] to-[#23a1ab] hover:from-[#31ccd8] hover:via-[#2cc3ce] hover:to-[#27b8c3] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? 'Tracking...' : 'Track Address'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default TrackAddressModal
