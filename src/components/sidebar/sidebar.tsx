'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './sidebar-styles.module.scss'
import MenuItems from '../menu-items/menu-items'
import { Menu, X } from 'lucide-react'

type Props = {
  actual: string
  onChange: (coin: string) => void
  open: (page: string) => void
  active?: string
}

const AppSidebar: React.FC<Props> = ({
  actual,
  onChange,
  open,
  active,
}: Props) => {
  const router = useRouter()
  const [coins, setCoins] = useState([
    {
      title: 'Bitcoin',
      icon: '/coins/bitcoin.png',
      url: '/pano-view/bitcoin',
    },
    {
      title: 'Ethereum',
      icon: '/coins/eth.png',
      disabled: true,
      url: '/pano-view/ethereum',
    },
    {
      title: 'ICP',
      icon: '/coins/icp.png',
      url: '/pano-view/icp',
    },
    {
      title: 'Solana',
      icon: '/coins/solana.png',
      url: '/pano-view/solana',
    },
  ])

  const [pages, setPages] = useState([
    {
      title: 'Pano View',
      icon: '/account/dash.png',
      url: `/pano-view/${actual.toLowerCase()}`,
    },
    {
      title: 'AI Agents',
      icon: '/account/research.png',
      url: '/ai-agents',
      disabled: false,
    },
    {
      title: 'Wallet Tracking',
      icon: '/account/wallet.png',
      url: '/wallet-tracking',
    },
    {
      title: 'AI Agents on X',
      icon: '/account/research.png',
      url: '/x-ai-agents',
      disabled: false,
    },
    {
      title: 'Liquid Swap',
      icon: '/account/transfers.png',
      url: '/liquid-swap',
    },
    {
      title: 'DeFi Vista',
      icon: '/account/defi-vista.png',
      url: '/defi-vista',
    },
    {
      title: 'AI Marketplace',
      icon: '/account/market.png',
      url: '/ai-marketplace'
    },
    {
      title: 'Portfolio',
      icon: '/account/portfolio.png',
      url: '/portfolio',
    },
  ])

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getActive = (title: string) => {
    const active = window.location.href.toLowerCase()

    switch (title.toLowerCase()) {
      case 'solana':
        return active.includes('solana')
      default:
        return active.includes('bitcoin')
    }
  }

  const handleClick = (type: string, value: string) => {
    if (type === 'coin') {
      onChange(value)

      if (value == 'Bitcoin') {
        router.push(`/pano-view/bitcoin`)
      } else {
        router.push(`/pano-view/${value.toLowerCase()}`)
      }
    } else {
      open(value)
    }
  }

  return (
    <>
      <button
        className={`fixed top-4 left-4 z-50 p-2 rounded-lg bg-gradient-to-r from-[#2cc3ce] via-[#27b8c3] to-[#23a1ab] text-white transition-all duration-200 hover:from-[#31ccd8] hover:via-[#2cc3ce] hover:to-[#27b8c3] md:hidden`}
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`
          fixed top-0 left-0 h-full bg-[#04292c] z-40
          transition-all duration-300 ease-in-out
          ${isMobile ? 'w-[280px]' : 'w-[320px]'}
          ${isMobile ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          shadow-xl
        `}
      >
        <div className="flex mx-auto my-4 min-w-[70%] items-center gap-2 z-50 cursor-pointer" onClick={() => router.push('/')}>
          <img
            src="/logo.png"
            alt="Panorama Block"
            className="mx-auto h-10 md:h-12"
          />
        </div>

        <div className={styles.body}>
          <div className="mt-4">
            <MenuItems
              items={pages}
              action={(value) => {
                handleClick('page', value)
              }}
              panelActive={active}
            />
          </div>
        </div>
      </div>

      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default AppSidebar
