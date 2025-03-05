'use client'

import Layout from '@/components/layout/Layout'
import styles from './styles.module.scss'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import BitcoinService from '@/lib/api/services/bitcoin'
import OpenChat from '@/components/open-chat/open-chat'
import { Tooltip } from '@mui/material'
import WhaleHunting from '@/components/whale-hunting/whale-hunting'
import { WidgetVariant } from '@rango-dev/widget-embedded'

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
        <Widget config={config} />

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
    </Layout>
  )
}

export default Page
