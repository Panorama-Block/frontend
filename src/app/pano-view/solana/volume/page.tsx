'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import BitcoinService from '@/lib/api/services/bitcoin'
import styles from './styles.module.scss'
import { LucideArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/card'
// import { TokenChart } from "../solana/components/token-chart/token-chart"
import { VolumeChart } from '@/modules/solana/components/volume-chart/volume-chart'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Layout from '@/components/layout/Layout'

const volumeData = [
  { legend: '09/27', desktop: 241029812 },
  { legend: '09/28', desktop: 200021827 },
  { legend: '09/29', desktop: 240178652 },
  { legend: '09/30', desktop: 220212348 },
  { legend: '10/01', desktop: 232791028 },
  { legend: '10/02', desktop: 232791028 },
  { legend: '10/03', desktop: 232791028 },
]

const usersData = [
  { legend: '09/27', desktop: 47576 },
  { legend: '09/28', desktop: 57812 },
  { legend: '09/29', desktop: 62389 },
  { legend: '09/30', desktop: 45128 },
  { legend: '10/01', desktop: 48924 },
  { legend: '10/02', desktop: 48924 },
  { legend: '10/03', desktop: 48924 },
]

const valueLockedData = [
  { legend: '09/27', desktop: 226128135 },
  { legend: '09/28', desktop: 228906126 },
  { legend: '09/29', desktop: 224081739 },
  { legend: '09/30', desktop: 223878126 },
  { legend: '10/01', desktop: 224509461 },
  { legend: '10/02', desktop: 224509461 },
  { legend: '10/03', desktop: 224509461 },
]

const totalTransfersData = [
  { legend: '09/27', desktop: 3827916 },
  { legend: '09/28', desktop: 4890224 },
  { legend: '09/29', desktop: 4790825 },
  { legend: '09/30', desktop: 3658921 },
  { legend: '10/01', desktop: 3649872 },
  { legend: '10/02', desktop: 3649872 },
  { legend: '10/03', desktop: 3649872 },
]

const SolanaVolume = () => {
  const router = useRouter()
  const [actual, setActual] = useState('Solana')
  const [actualHashblock, setActualHashblock] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)
  const [chatOpened, setChatOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [hashblockOpened, setHashblockOpened] = useState(false)
  const [info, setInfo] = useState<any>()

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

  const handleOpen = (page: string) => {
    if (page === 'Whale Hunting') {
      setWhaleOpened(true)
    }
  }

  return (
    <Layout
      sidebar={{
        actual: actual,
        onChange: (coin: string) => setActual(coin),
        open: (page: string) => handleOpen(page),
      }}
      header={{
        onSubmit: handleGetInfo,
      }}
    >
      <div className={styles.home}>
        <div className="mx-12 mt-4 mb-8 flex gap-3 text-zinc-100">
          <LucideArrowLeft
            className="hover:cursor-pointer"
            onClick={() => router.back()}
          />
          <h2>Volume</h2>

          <div className="flex-1">
            <Select>
              <SelectTrigger
                className="ml-auto w-[180px] mr-[120px] bg-[#004c53] text-zinc-900 border-none"
                defaultValue="raydium"
              >
                <SelectValue placeholder="Raydium" />
              </SelectTrigger>
              <SelectContent className="bg-[#004c53] text-zinc-900">
                <SelectGroup>
                  <SelectItem className='text-zinc-900' value="orca">Orca</SelectItem>
                  <SelectItem className='text-zinc-900' value="raydium">Raydium</SelectItem>
                  <SelectItem className='text-zinc-900' value="blueberry">jupiter</SelectItem>
                  <SelectItem className='text-zinc-900' value="grapes">Grapes</SelectItem>
                  <SelectItem className='text-zinc-900' value="lifinity">Lifinity</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={`mx-16 grid grid-cols-2 gap-[40px] text-zinc-100`}>
          <Card className={`${styles.card} mt-1 flex  w-[90%] border-none rounded-[14px]`}>
            <VolumeChart
              data={volumeData}
              key="volume"
              legend="Volume"
              title="Total Volume"
              range={[0, 5000000]}
            />
          </Card>

          <Card className={`${styles.card} mt-1 flex  w-[90%] border-none rounded-[14px]`}>
            <VolumeChart
              data={valueLockedData}
              key="valueLocked"
              legend="Value Locked"
              title="Total Value Locked"
              range={[0, 250000000]}
            />
          </Card>

          <Card className={`${styles.card} mt-1 flex  w-[90%] border-none rounded-[14px]`}>
            <VolumeChart
              data={usersData}
              key="users"
              legend="Users"
              title="Active Users"
              range={[0, 75000]}
            />
          </Card>

          <Card className={`${styles.card} mt-1 flex  w-[90%] border-none rounded-[14px]`}>
            <VolumeChart
              data={totalTransfersData}
              key="volume"
              legend="Transactions"
              title="Total Transactions"
              range={[0, 5000000]}
            />
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default SolanaVolume
