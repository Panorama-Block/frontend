'use client'

import React, { useState, useEffect } from 'react'
import TokenDetailsModal from '@/components/token-details-modal/token-details-modal'
import styles from './styles.module.scss'
import Layout from '@/components/layout/Layout'
import OpenChat from '@/components/open-chat/open-chat'
import RangoService from '@/lib/api/services/rango'

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
  const [selectedBlockchain, setSelectedBlockchain] = useState('Select blockchain')
  const [isBlockchainDropdownOpen, setIsBlockchainDropdownOpen] = useState(false)
  const [walletData, setWalletData] = useState<WalletData[]>([])
  const [filteredData, setFilteredData] = useState<WalletData[]>([])
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState(true)

  const blockchains = ['Ethereum', 'BSC', 'Polygon', 'Solana']

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const addresses = await RangoService.getAddresses()

        if (addresses) {
          const walletsData: WalletData[] = await Promise.all(
            addresses.map(async (addressObj) => {
              const [network, address] = addressObj.address.split('.')
              const tokens = await RangoService.getTokens(addressObj.address)

              // Calculate total balance and token count
              const totalBalance = tokens.reduce((sum, token) => {
                const amount = parseFloat(token.amount.amount) / Math.pow(10, token.amount.decimals)
                return sum + (amount * token.price)
              }, 0)

              return {
                address,
                network,
                tokens,
                totalTokens: tokens.length,
                balance: totalBalance
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

  const handleBlockchainSelect = (blockchain: string) => {
    setSelectedBlockchain(blockchain)
    setIsBlockchainDropdownOpen(false)

    const filtered = blockchain === 'Select blockchain'
      ? walletData
      : walletData.filter(item => item.network.toLowerCase() === blockchain.toLowerCase())
    setFilteredData(filtered)
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
              <div
                className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer relative"
                onClick={() => setIsBlockchainDropdownOpen(!isBlockchainDropdownOpen)}
              >
                <span>{selectedBlockchain}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${isBlockchainDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M8 10.5L4 6.5H12L8 10.5Z" fill="#80B1FF" />
                </svg>
                {isBlockchainDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#121212] border border-[rgba(255,255,255,0.1)] rounded-lg shadow-lg z-10">
                    {blockchains.map((blockchain) => (
                      <div
                        key={blockchain}
                        className="px-4 py-2 hover:bg-[rgba(255,255,255,0.1)] cursor-pointer text-gray-300"
                        onClick={() => handleBlockchainSelect(blockchain)}
                      >
                        {blockchain}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
