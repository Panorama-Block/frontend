'use client'

import Layout from '@/components/layout/Layout'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import BitcoinService from '@/lib/api/services/bitcoin'
import OpenChat from '@/components/open-chat/open-chat'
import { Tooltip, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import WhaleHunting from '@/components/whale-hunting/whale-hunting'
import { WidgetVariant } from '@rango-dev/widget-embedded'
import { Info, Close } from '@mui/icons-material'

const Widget = dynamic(
  () => import('@rango-dev/widget-embedded').then((module) => module.Widget),
  {
    ssr: false,
  }
)

const Page = () => {
  const [actual, setActual] = useState('Bitcoin')
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [infoModalOpen, setInfoModalOpen] = useState(false)

  const config = {
    variant: 'full-expanded' as WidgetVariant,
    theme: {
      borderRadius: 30,
      secondaryBorderRadius: 15,
      singleTheme: true,
      colors: {
        light: {
          primary: '#1cd5f1',
          secondary: '#419e9e',
          neutral: '#abd2d2',
          background: '#ffffff',
        },
      },
    },
    apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
    trezorManifest: {
      appUrl: 'https://widget.rango.exchange/',
      email: 'hi+trezorwidget@rango.exchange',
    },
    tonConnect: {
      manifestUrl:
        'https://raw.githubusercontent.com/rango-exchange/assets/refs/heads/main/manifests/tonconnect/manifest.json',
    },
  }

  const handleGetInfo = async (type: string, value: string) => {
    setModalOpened(true)

    if (type === 'address') {
      const response: any = await BitcoinService.getAddressInfo(value)

      if (response.data && response.data.chain_stats) {
        const data = {
          ok: response.data,
          type: type,
        }

        console.log(data)

        setInfo(data)
      } else {
        setInfo({ error: 'fail' })
      }
    } else if (type === 'transaction') {
      const response: any = await BitcoinService.getTransactionInfo(value)

      if (response.data) {
        const data = {
          ok: response.data,
          type: type,
        }

        setInfo(data)
      } else {
        setInfo({ error: 'fail' })
      }
    }
  }

  const handleOpen = (page: string) => {
    if (page === 'Whale Hunting') {
      setWhaleOpened(true)
    }
  }

  return (
    <Layout
      sidebar={{ actual, onChange: setActual, open: handleOpen }}
      header={{ onSubmit: handleGetInfo }}
    >
      <div className={styles.home}>
        <div className="flex items-center p-4 px-6 gap-2">
          <h1 className="text-2xl font-semibold text-white">Liquid Swap</h1>
          <IconButton onClick={() => setInfoModalOpen(true)} size="small" >
            <Info className='text-[#78c3ca]' />
          </IconButton>
        </div>

        <Dialog
          open={infoModalOpen}
          onClose={() => setInfoModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="flex text-white justify-between items-center bg-gradient-to-r from-[#177078] via-[#126067] to-[#0c4b51]">
            About Liquid Swap
            <IconButton onClick={() => setInfoModalOpen(false)} size="small">
              <Close className='text-[#78c3ca]' />
            </IconButton>
          </DialogTitle>
          <DialogContent className='bg-gradient-to-r from-[#177078] via-[#126067] to-[#0c4b51]'>
            <div className="flex flex-col gap-8 text-white max-w-4xl mx-auto">
              {/* <div className="bg-gradient-to-r from-[#17707812] via-[#12606750] to-[#0c4b51] p-8 rounded-lg backdrop-blur-md"> */}
              <div className="space-y-6">
                <p className="text-gray-200 leading-relaxed">
                  Liquid Swap is the initial feature of Liquid Path, an AI agent focusing on liquid staking/restaking protocols. It will provide the most efficient swap routes, while Liquid Path will focus on optimizing cross-chain yield opportunities.
                </p>
                <p className="text-gray-200 leading-relaxed">

                  The product will expand to cover more yield strategies in DeFi and will eventually be integrated into the DeFi Vista product.
                </p>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-gray-300">
                    For more details, please visit our{" "}
                    <a href="https://panoramablock.com" className="text-[#3CDFEF] hover:text-[#3CDFEF]/80 transition-colors">
                      Roadmap & Vision section
                    </a>{" "}
                    and our{" "}
                    <a href="https://docs.panoramablock.com/our-verticals/ai-marketplace " className="text-[#3CDFEF] hover:text-[#3CDFEF]/80 transition-colors">
                      Whitepaper
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className={styles.container}>
          <Widget config={config} />
        </div>

        {chatOpened ? (
          <OpenChat onClose={() => setChatOpened(false)} />
        ) : (
          <div className={styles.chat} onClick={() => setChatOpened(true)}>
            <Tooltip title="Community" placement="left">
              <img src="/openchat.svg" alt="" />
            </Tooltip>
          </div>
        )}

        {whaleOpened && (
          <WhaleHunting
            onSelect={(id: string) => handleGetInfo('address', id)}
            onClose={() => setWhaleOpened(false)}
          />
        )}
      </div>
    </Layout >
  )
}

export default Page
