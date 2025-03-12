'use client'

import React, { useState, useEffect } from 'react'
import TokenDetailsModal from '@/components/token-details-modal/token-details-modal'
import styles from './styles.module.scss'
import Layout from '@/components/layout/Layout'
import OpenChat from '@/components/open-chat/open-chat'
import RangoService from '@/lib/api/services/rango'
import { Button } from '@/components/ui/button'
import TrackAddressModal from '@/components/track-address-modal/track-address-modal'

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
                className='bg-[#3CDFEF46] hover:bg-[#3CDFEF25]'
                onClick={() => setIsTrackModalOpen(true)}
              >
                Track New Address
              </Button>
              <div className={styles.search}>
                <input
                  type="text"
                  placeholder="Search by address or network..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className={styles.searchInput}
                />
              </div>
            </div>
          </div>

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

      <TrackAddressModal
        open={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        onSubmit={handleTrackAddress}
        blockchains={blockchains}
      />

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
