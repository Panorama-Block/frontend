'use client'

import React, { useState } from 'react'
import TokenDetailsModal from '@/components/token-details-modal/token-details-modal'
import styles from './styles.module.scss'
import Layout from '@/components/layout/Layout'

interface Token {
  name: string;
  amount: string;
  value: string;
}

interface WalletData {
  address: string;
  name: string;
  network: string;
  tokens: Token[];
  totalTokens: number;
  balance: number;
}

const data: WalletData[] = [
  {
    address: '0xnc780fhn.809jl25h',
    name: 'Grace Moreta',
    network: 'BSC',
    tokens: [
      { name: '3D Digital Art', amount: '3 XYZ', value: '$1400' },
      { name: 'Abstrac point', amount: '3 XYZ', value: '$1400' },
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' }
    ],
    totalTokens: 32,
    balance: 14.99
  },
  {
    address: '0xnc780fhn.809jl25h',
    name: 'Allison Siphron',
    network: 'ETH',
    tokens: [
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' }
    ],
    totalTokens: 1,
    balance: 14.99
  },
  {
    address: '0xnc780fhn.809jl25h',
    name: 'Angel Westervelt',
    network: 'AVAX',
    tokens: [
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' },
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' }
    ],
    totalTokens: 8,
    balance: 14.99
  },
  {
    address: '0xnc780fhn.809jl25h',
    name: 'Makenna Doman',
    network: 'XRPL',
    tokens: [
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' }
    ],
    totalTokens: 7,
    balance: 14.99
  },
  {
    address: '0xnc780fhn.809jl25h',
    name: 'Ahmad Vetrovs',
    network: 'ETH',
    tokens: [
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' },
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' }
    ],
    totalTokens: 11,
    balance: 14.99
  },
  {
    address: '0xnc780fhn.809jl25h',
    name: 'Kaylynn Madsen',
    network: 'ETH',
    tokens: [
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' }
    ],
    totalTokens: 12,
    balance: 14.99
  },
  {
    address: '0xnc780fhn.809jl25h',
    name: 'Lydia Baptista',
    network: 'BTC',
    tokens: [
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' }
    ],
    totalTokens: 2,
    balance: 14.99
  },
  {
    address: '0xnc780fhn.809jl25h',
    name: 'Kaylynn Vetrovs',
    network: 'ARBITRUM',
    tokens: [
      { name: 'Token XYZ', amount: '3 XYZ', value: '$1400' }
    ],
    totalTokens: 2,
    balance: 14.99
  }
]

const Page: React.FC = () => {
  const [actual, setActual] = useState('Bitcoin')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)

    const filtered = data.filter(item =>
      item.address.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.network.toLowerCase().includes(query)
    )
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
        onSubmit: () => {},
      }}
    >
      <div className={styles.home}>
        <div className="flex flex-col ml-12 mr-12 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl ml-8 font-bold">Wallet Tracking</h1>
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

          <div className={`${styles.card} m-4`}>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div className={styles.headerCell}>Address</div>
                <div className={styles.headerCell}>Custom Name</div>
                <div className={styles.headerCell}>Network</div>
                <div className={styles.headerCell}>Tokens</div>
                <div className={styles.headerCell}>Total Balance</div>
              </div>
              {filteredData.map((item, index) => (
                <div 
                  className={styles.tableRow} 
                  key={`wallet-${index}`}
                  onClick={() => handleWalletClick(item)}
                >
                  <div className={styles.cell}>
                    <input 
                      type="checkbox" 
                      className={styles.checkbox}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className={styles.copy}></span>
                    <span className={styles.address}>{item.address}</span>
                  </div>
                  <div className={styles.cell}>{item.name}</div>
                  <div className={styles.cell}>{item.network}</div>
                  <div className={styles.cell}>{item.totalTokens}</div>
                  <div className={styles.cell}>${item.balance}</div>
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
    </Layout>
  )
}

export default Page
