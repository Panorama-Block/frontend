'use client'

import React, { useState, useEffect } from 'react'
import TokenDetailsModal from '@/components/token-details-modal/token-details-modal'
import styles from './styles.module.scss'
import Layout from '@/components/layout/Layout'
import OpenChat from '@/components/open-chat/open-chat'
import RangoService from '@/lib/api/services/rango'
import { Dialog, DialogTitle, DialogContent, IconButton, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface Asset {
  blockchain: string;
  symbol: string;
  address: string;
}

interface Amount {
  amount: string;
  decimals: number;
}

interface Token {
  asset: Asset;
  amount: Amount;
  price: number;
}

interface WalletData {
  address: string;
  network: string;
  tokens: Token[];
  totalTokens: number;
  balance: number;
}

const Page: React.FC = () => {
  const [actual, setActual] = useState('Bitcoin')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false)
  const [selectedBlockchain, setSelectedBlockchain] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [walletData, setWalletData] = useState<WalletData[]>([])
  const [filteredData, setFilteredData] = useState<WalletData[]>([])
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState(true)

  const blockchains = ['Ethereum', 'BSC', 'Polygon', 'Solana']
  const fetchData = async () => {
    try {
      setLoading(true)
      const addresses = await RangoService.getAddresses()
      console.log(addresses)

      if (addresses && addresses.length > 0) {
        const walletsData: WalletData[] = await Promise.all(
          addresses.map(async (address) => {
            const [network, walletAddress] = address.split('.')
            try {
              const tokens = await RangoService.getTokens(address)

              // If tokens is an error response or not an array, return empty wallet data
              if ('error' in tokens || !Array.isArray(tokens)) {
                return {
                  address: walletAddress,
                  network,
                  tokens: [],
                  totalTokens: 0,
                  balance: 0
                }
              }

              // Calculate total balance and token count for valid token responses
              const totalBalance = tokens.reduce((sum, token) => {
                const amount = parseFloat(token.amount.amount) / Math.pow(10, token.amount.decimals)
                return sum + (amount * token.price)
              }, 0)

              return {
                address: walletAddress,
                network,
                tokens,
                totalTokens: tokens.length,
                balance: totalBalance
              }
            } catch (error) {
              console.error(`Error fetching tokens for address ${address}:`, error)
              return {
                address: walletAddress,
                network,
                tokens: [],
                totalTokens: 0,
                balance: 0
              }
            }
          })
        )

        setWalletData(walletsData)
        setFilteredData(walletsData)
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)

    const filtered = walletData.filter(item =>
      item.address.toLowerCase().includes(query) ||
      item.network.toLowerCase().includes(query)
    )
    setFilteredData(filtered)
  }

  const handleTrackAddress = async () => {
    if (!selectedBlockchain || !newAddress) return;

    try {
      // Here you would add the API call to track the new address
      // For now, we'll just close the modal
      setIsTrackModalOpen(false)
      setSelectedBlockchain('')
      setNewAddress('')
      // Refresh the data
      fetchData()
    } catch (error) {
      console.error('Error tracking address:', error)
    }
  }

  const handleWalletClick = (wallet: WalletData) => {
    setSelectedWallet(wallet)
  }

  return (
    <Layout
      sidebar={{
        actual,
        onChange: (coin: string) => setActual(coin),
        open: () => void 0,
      }}
      header={{
        onSubmit: () => { },
      }}
    >
      <div className={styles.home}>
        <div className="flex flex-col ml-12 mr-12 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl ml-8 font-bold">Wallet Tracking</h1>
            <div className="flex gap-4">
              <Button
                variant="contained"
                onClick={() => setIsTrackModalOpen(true)}
                sx={{
                  backgroundColor: 'rgba(128, 177, 255, 0.1)',
                  color: '#80B1FF',
                  '&:hover': {
                    backgroundColor: 'rgba(128, 177, 255, 0.2)',
                  },
                }}
              >
                Track New Address
              </Button>
              <div className={styles.search}>
                <input
                  type="text"
                  placeholder="Search by address, name or network..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className={styles.searchInput}
                />
              </div>
            </div>
          </div>

          <Dialog
            open={isTrackModalOpen}
            onClose={() => setIsTrackModalOpen(false)}
            maxWidth="sm"
            fullWidth
            disableEscapeKeyDown
            onBackdropClick={() => null}
            PaperProps={{
              style: {
                backgroundColor: '#121212',
                color: 'white',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
            }}
            sx={{
              '& .MuiBackdrop-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
            }}
          >
            <DialogTitle 
              className="flex justify-between items-center border-b border-[rgba(255,255,255,0.1)] pb-4"
              sx={{ px: 3, py: 2.5 }}
            >
              <span className="text-lg font-medium">Track New Address</span>
              <IconButton
                onClick={() => setIsTrackModalOpen(false)}
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ px: 3, py: 3 }}>
              <div className="flex flex-col gap-4">
                <FormControl fullWidth>
                  <InputLabel id="blockchain-select-label" sx={{ 
                    color: 'rgba(255, 255, 255, 0.5)',
                    '&.Mui-focused': {
                      color: '#80B1FF',
                    },
                  }}>
                    Select Blockchain
                  </InputLabel>
                  <Select
                    labelId="blockchain-select-label"
                    value={selectedBlockchain}
                    onChange={(e) => setSelectedBlockchain(e.target.value)}
                    sx={{
                      color: 'white',
                      backgroundColor: '#121212',
                      height: '48px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#80B1FF',
                        borderWidth: '1px',
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: '#121212',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          marginTop: '8px',
                          '& .MuiMenuItem-root': {
                            color: 'white',
                            padding: '12px 16px',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            },
                            '&.Mui-selected': {
                              backgroundColor: 'rgba(128, 177, 255, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(128, 177, 255, 0.2)',
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
                  fullWidth
                  label="Enter Wallet Address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: '#121212',
                      height: '48px',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#80B1FF',
                        borderWidth: '1px',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      '&.Mui-focused': {
                        color: '#80B1FF',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleTrackAddress}
                  fullWidth
                  disabled={!selectedBlockchain || !newAddress}
                  sx={{
                    mt: 1,
                    height: '48px',
                    backgroundColor: '#80B1FF',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#6090FF',
                    },
                    '&.Mui-disabled': {
                      backgroundColor: 'rgba(128, 177, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  Track Address
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className={`${styles.card} m-4`}>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div className={styles.headerCell}>Address</div>
                <div className={styles.headerCell}>Network</div>
                <div className={styles.headerCell}>Tokens</div>
                <div className={styles.headerCell}>Total Balance</div>
              </div>
              {loading ? (
                <div className="text-center py-4 text-gray-400">Loading...</div>
              ) : filteredData.map((item, index) => (
                <div
                  className={styles.tableRow}
                  key={`wallet-${index}`}
                  onClick={() => handleWalletClick(item)}
                >
                  <div className={styles.cell}>
                    <span className={styles.copy}></span>
                    <span className={styles.address}>{item.address}</span>
                  </div>
                  <div className={styles.cell}>{item.network}</div>
                  <div className={styles.cell}>{item.totalTokens}</div>
                  <div className={styles.cell}>${item.balance.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedWallet && (
        <TokenDetailsModal
          open={!!selectedWallet}
          onClose={() => setSelectedWallet(null)}
          address={selectedWallet.address}
          tokens={selectedWallet.tokens}
        />
      )}

      <OpenChat />
    </Layout>
  )
}

export default Page
