'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Hashblocks, { HashblockProps } from '@/components/hashblocks/hashblocks'
import Network, { NetworkData } from '@/components/network/network'
import CustomTabs from '@/components/custom-tabs/custom-tabs'
import BitcoinService from '@/lib/api/services/bitcoin'
// import { jsonParseBigint } from '@/utils/json-parse-bigint'
import InfoModal from '@/components/info-modal/info-modal'
import TransactionInfo from '@/components/transaction-info/transaction-info'
import AddressInfo from '@/components/address-info/address-info'
import HashblockInfo from '@/modules/bitcoin/components/hashblock-info/hashblock-info'
import OpenChat from '@/components/open-chat/open-chat'
import WhaleHunting from '@/components/whale-hunting/whale-hunting'
import { minutesInterval } from '@/utils/time'
import Layout from '@/components/layout/Layout'
import { jsonParseBigint } from '@/utils/json-parse-bigint'
import { compareTimestampDesc } from '@/utils/sort'

const Home: React.FC = () => {
  const [actual, setActual] = useState('Bitcoin')
  const [actualHashblock, setActualHashblock] = useState(null)
  const [hashblocks, setHashblocks] = useState<HashblockProps[]>()
  const [modalOpened, setModalOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [hashblockOpened, setHashblockOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [data, setData] = useState<NetworkData>({
    description:
      'Bitcoin is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a public distributed ledger, called a blockchain.',
    transactions: '2.487.316 transactions',
    avgTransactions: '59.267 BTC',
    transactionsValue: '414.869 BTC',
    address: '2.118.955 addresses',
    token: 'BTC USD',
  })

  const verifyCacheInterval = (cache: any) => {
    if (cache.date) {
      const interval = minutesInterval(Date.now(), cache.date)

      if (interval >= 0 && interval < 5) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    const getHashblocks = async (): Promise<void> => {
      const cache = localStorage.getItem('hashblocks')

      if (cache && verifyCacheInterval(JSON.parse(cache))) {
        setHashblocks(JSON.parse(cache).ok)
      } else {
        const data: { ok: HashblockProps[]; date: number } = {
          ok: [],
          date: 0,
        }
        let lastIdAdded = ''

        const pagePromises = Array.from({ length: 50 }, (_, i) =>
          BitcoinService.getHashblocks(i)
        )
        const responses = await Promise.all(pagePromises)

        for (const response of responses) {
          if (response.data && response.data.length > 0) {
            const json = await jsonParseBigint(response.data)
            const jsonFormated = json.map((hashblock: any) => ({
              ...hashblock,
              timestamp: hashblock['timestamp'] * 1000,
            }))
            const sorted: HashblockProps[] =
              jsonFormated.sort(compareTimestampDesc)

            if (lastIdAdded === sorted[0].id) {
              continue
            }

            lastIdAdded = sorted[0].id
            data.ok.push(...sorted)
          }
        }

        if (data.ok.length > 0) {
          data.date = Date.now()
          const uniqueHashblocks = Array.from(
            new Map(data.ok.map((item) => [item.id, item])).values()
          )
          const finalSorted = uniqueHashblocks.sort(compareTimestampDesc)
          setHashblocks(finalSorted)
          localStorage.setItem(
            'hashblocks',
            JSON.stringify({ ok: finalSorted, date: data.date })
          )
        }
      }
    }

    getHashblocks()
  }, [])

  const handleGetInfo = async (type: string, value: string) => {
    setModalOpened(true)

    if (type === 'address') {
      const response: any = await BitcoinService.getAddressInfo(value)

      if (response.data && response.data.chain_stats) {
        const data = {
          ok: response.data,
          type: type,
        }


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

  const handleClose = () => {
    setInfo(null)
    setModalOpened(false)
  }

  const handleHashblock = (hashblock?: any) => {
    if (hashblock) {
      setActualHashblock(hashblock)
      setHashblockOpened(true)
    } else {
      setActualHashblock(null)
      setHashblockOpened(false)
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
      noPadding
    >
      <div className={styles.home}>
        <Hashblocks
          coin={actual}
          data={hashblocks}
          onSelect={(hashblock: any) => handleHashblock(hashblock)}
        />

        <div className={styles.info}>
          <Network data={data} />
          <CustomTabs
            hashblocks={hashblocks}
            labels={['by hashblocks', 'by time']}
          />
        </div>

        {modalOpened && (
          <InfoModal data={info} onClose={() => handleClose()}>
            {info?.type === 'address' ? (
              <AddressInfo title="Address Information" data={info?.['ok']} />
            ) : (
              // : <TransactionInfo title="Transaction Information" data={info?.['ok'] && info?.['ok'][0] !== 'Invalid hex string' && JSON.parse(info?.['ok'][0])} />
              <TransactionInfo
                title="Transaction Information"
                data={info?.['ok']}
              />
            )}
          </InfoModal>
        )}

        {hashblockOpened && actualHashblock && (
          <HashblockInfo
            data={actualHashblock}
            onClose={() => handleHashblock()}
          />
        )}

        <OpenChat />

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

export default Home