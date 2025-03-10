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
  network: string;
  tokens: Token[];
  totalTokens: number;
  balance: number;
}

const data: WalletData[] = [
  {
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    network: 'BSC',
    tokens: [
      { name: 'Pancake (CAKE)', amount: '245.8 CAKE', value: '$642.31' },
      { name: 'Venus (XVS)', amount: '12.5 XVS', value: '$89.37' },
      { name: 'BUSD', amount: '1,240 BUSD', value: '$1,240.00' }
    ],
    totalTokens: 3,
    balance: 1971.68
  },
  {
    address: '0x8894e0a0c962cb723c1976a4421c95949be2d4e3',
    network: 'ETH',
    tokens: [
      { name: 'Ethereum (ETH)', amount: '1.85 ETH', value: '$4,588.15' },
      { name: 'Chainlink (LINK)', amount: '156.2 LINK', value: '$2,187.42' },
      { name: 'Uniswap (UNI)', amount: '89.4 UNI', value: '$589.04' }
    ],
    totalTokens: 3,
    balance: 7364.61
  },
  {
    address: '0x9B5c2BE2210318128598f0B0bFe3E902b2bE9E24',
    network: 'AVAX',
    tokens: [
      { name: 'Avalanche (AVAX)', amount: '45.8 AVAX', value: '$1,237.14' },
      { name: 'Joe Token (JOE)', amount: '850.4 JOE', value: '$289.13' }
    ],
    totalTokens: 2,
    balance: 1526.27
  },
  {
    address: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
    network: 'XRPL',
    tokens: [
      { name: 'XRP', amount: '4,580 XRP', value: '$2,748.00' },
      { name: 'Coreum (CORE)', amount: '1,250 CORE', value: '$437.50' }
    ],
    totalTokens: 2,
    balance: 3185.50
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    network: 'ETH',
    tokens: [
      { name: 'Maker (MKR)', amount: '1.2 MKR', value: '$1,824.00' },
      { name: 'Aave (AAVE)', amount: '4.8 AAVE', value: '$432.96' }
    ],
    totalTokens: 2,
    balance: 2256.96
  },
  {
    address: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
    network: 'ETH',
    tokens: [
      { name: 'Compound (COMP)', amount: '8.4 COMP', value: '$378.00' },
      { name: 'Lido (LDO)', amount: '245.6 LDO', value: '$589.44' }
    ],
    totalTokens: 2,
    balance: 967.44
  },
  {
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'BTC',
    tokens: [
      { name: 'Bitcoin (BTC)', amount: '0.089 BTC', value: '$4,628.00' }
    ],
    totalTokens: 1,
    balance: 4628.00
  },
  {
    address: '0x839395e20bbB182fa440d08F850E6c7A8f6F0780',
    network: 'ARBITRUM',
    tokens: [
      { name: 'GMX', amount: '24.5 GMX', value: '$882.00' },
      { name: 'Magic (MAGIC)', amount: '456.8 MAGIC', value: '$438.52' }
    ],
    totalTokens: 2,
    balance: 1320.52
  }
]

const Page: React.FC = () => {
  const [actual, setActual] = useState('Bitcoin')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBlockchain, setSelectedBlockchain] = useState('Select blockchain')
  const [isBlockchainDropdownOpen, setIsBlockchainDropdownOpen] = useState(false)
  const [filteredData, setFilteredData] = useState(data)
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null)

  const blockchains = ['Ethereum', 'BSC', 'Polygon', 'Solana']

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)

    const filtered = data.filter(item =>
      item.address.toLowerCase().includes(query) ||
      item.network.toLowerCase().includes(query)
    )
    setFilteredData(filtered)
  }

  const handleBlockchainSelect = (blockchain: string) => {
    setSelectedBlockchain(blockchain)
    setIsBlockchainDropdownOpen(false)
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
            <h1 className="text-xl ml-8 font-bold">Wallet Tracking - Coming Soon</h1>
            <div className="flex gap-4">
              <div
                className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer relative"
                // onClick={() => setIsBlockchainDropdownOpen(!isBlockchainDropdownOpen)}
                onClick={() => {}}
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
              {filteredData.map((item, index) => (
                <div
                  className={styles.tableRow}
                  key={`wallet-${index}`}
                  onClick={() => handleWalletClick(item)}
                >
                  <div className={styles.cell}>
                    {/* <input 
                      type="checkbox" 
                      className={styles.checkbox}
                      onClick={(e) => e.stopPropagation()}
                    /> */}
                    <span className={styles.copy}></span>
                    <span className={styles.address}>{item.address}</span>
                  </div>
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
