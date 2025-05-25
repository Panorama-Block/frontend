"use client"

import React, { useState, useEffect } from "react"
import styles from "./styles.module.scss"
import {
  ArrowRight,
}
  from "lucide-react"
import { useRouter } from "next/navigation"

import Hashblocks from "@/components/hashblocks/hashblocks"
import HashblockInfo from "@/components/hashblock-info/hashblock-info"

import InfoModal from "@/components/info-modal/info-modal"
import AddressInfo from "@/components/address-info/address-info"

import OpenChat from "@/components/open-chat/open-chat"
import WhaleHunting from "@/components/whale-hunting/whale-hunting"
import { minutesInterval } from "@/utils/time"
import TransactionInfo from "@/components/transaction-info/transaction-info"
import { Card } from "@/components/ui/card"

import Layout from "@/components/layout/Layout"
import Image from "next/image"
import AvaxService from "@/lib/api/services/avax"
import { ChartByTime } from "@/modules/avax/components/chart-by-time/chart-by-time"

const Avax: React.FC = () => {
  const router = useRouter()
  const [actual, setActual] = useState("Avax")
  const [actualHashblock, setActualHashblock] = useState(null)
  const [hashblocks, setHashblocks] = useState([
    {
      id: "1206070",
      tx_count: 1211,
      size: 140000,
      height: 8982,
      value: 5.475,
      fee: 0.134,
      timestamp: 0,
    },
    {
      id: "1206069",
      tx_count: 2510,
      size: 140000,
      height: 8981,
      value: 5.475,
      fee: 0.134,
      timestamp: 0,
    },
    {
      id: "1206068",
      tx_count: 3245,
      size: 140000,
      height: 8980,
      value: 5.475,
      fee: 0.134,
      timestamp: 0,
    },
    {
      id: "1206067",
      tx_count: 1827,
      size: 140000,
      height: 8979,
      value: 5.475,
      fee: 0.134,
      timestamp: 0,
    },
    {
      id: "1206066",
      tx_count: "2517",
      size: 140000,
      height: 8978,
      value: 5.475,
      fee: 0.134,
      timestamp: 0,
    },
    {
      id: "1206065",
      tx_count: 3225,
      size: 140000,
      height: 8977,
      value: 5.475,
      fee: 0.134,
      timestamp: 0,
    },
    {
      id: "1206064",
      tx_count: 1981,
      size: 140000,
      height: 8976,
      value: 5.475,
      fee: 0.134,
      timestamp: 0,
    },
    {
      id: "1206063",
      tx_count: 1258,
      size: 140000,
      height: 8975,
      value: 5.475,
      fee: 0.134,
      timestamp: 0,
    },
    {
      id: "1206062",
      tx_count: 1428,
      size: 140000,
      height: 8974,
      value: 5.475,
      fee: 0.134,
      timestamp: 0,
    },
  ])
  const [modalOpened, setModalOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [hashblockOpened, setHashblockOpened] = useState(false)
  const [BridgeFee, setBridgeFee] = useState<any>()
  const [BridgeTx, setBridgeTx] = useState<any>()
  const [BridgeVol, setBridgeVol] = useState<any>()
  const [BridgeSwap, setBridgeSwap] = useState<any>()
  const [BridgeDailyVol, setBridgeDailyVol] = useState<any>()
  const [BridgeSubnet, setBridgeSubnet] = useState<any>()
  const [DexTvl, setDexTvl] = useState<any>()
  const [DexVolume, setDexVolume] = useState<any>()
  const [DexFeeRatio, setDexFeeRatio] = useState<any>()
  const [DexStable, setDexStable] = useState<any>()
  const [DexWhaleShare, setDexWhaleShare] = useState<any>()
  const [GasUsed, setGasUsed] = useState<any>()
  const [GasCost, setGasCost] = useState<any>()
  const [GasPrice, setGasPrice] = useState<any>()

  useEffect(() => {
    const now = Date.now();
    setHashblocks(prev => prev.map((block, index) => ({
      ...block,
      timestamp: now - (index * 300000) // 5 minutes intervals
    })));
  }, []);

  const verifyCacheInterval = (cache: any) => {
    if (cache.date) {
      const interval = minutesInterval(Date.now(), cache.date)

      if (interval >= 0 && interval < 5) {
        return true
      }
    }
    return false
  }

  // const handleClose = () => {
  //   setInfo(null)
  //   setModalOpened(false)
  // }

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
    if (page === "Whale Hunting") {
      setWhaleOpened(true)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeFee()
      console.log(data)
      setBridgeFee(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeTx()
      console.log(data)
      setBridgeTx(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeVol()
      console.log(data)
      setBridgeVol(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeDailyVol()
      console.log(data)
      setBridgeDailyVol(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeSubnet()
      console.log(data)
      setBridgeSubnet(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexTvl()
      console.log(data)
      setDexTvl(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexVolume()
      console.log(data)
      setDexVolume(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexFeeRatio()
      console.log(data)
      setDexFeeRatio(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexStable()
      console.log(data)
      setDexStable(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexWhaleShare()
      console.log(data)
      setDexWhaleShare(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getGasUsed()
      console.log(data)
      setGasUsed(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getGasPrice()
      console.log(data)
      setGasPrice(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getGasCost()
      console.log(data)
      setGasCost(data)
    }
    getData()
  }, [])

  return (
    <Layout
      noPadding
      sidebar={{
        actual: actual,
        onChange: (coin: string) => setActual(coin),
        open: (page: string) => handleOpen(page),
      }}
      header={{
        onSubmit: () => { },
      }}
    >
      <div className={styles.home}>
        <Hashblocks
          coin={actual}
          data={hashblocks}
          onSelect={(hashblock: any) => handleHashblock(hashblock)}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-12 mt-6">
          <div className="flex flex-col col-span-3 md:col-span-3 gap-6">
            {
              BridgeFee && (
                <ChartByTime
                  data={BridgeFee.data}
                  className={styles.chartByTime}
                  title={BridgeFee.chart}
                  description={BridgeFee.description}
                  label1={BridgeFee.label1}
                  label2={BridgeFee.label2}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' },
                    { value: '30D', label: '30D' },
                  ]}
                  defaultPeriod="30D"
                />
              )
            }

            {
              BridgeVol && (
                <ChartByTime
                  data={BridgeVol.data}
                  className={styles.chartByTime}
                  title={BridgeVol.chart}
                  description={BridgeVol.description}
                  label1={BridgeVol.label1}
                  label2={BridgeVol.label2}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' },
                    { value: '30D', label: '30D' },
                  ]}
                  defaultPeriod="30D"
                />
              )
            }

            {
              BridgeSwap && (
                <ChartByTime
                  data={BridgeSwap.data}
                  className={styles.chartByTime}
                  title={BridgeSwap.chart}
                  description={BridgeSwap.description}
                  label={BridgeSwap.label1}
                  label1={BridgeSwap.label1}
                  label2={BridgeSwap.label2}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' },
                    { value: '30D', label: '30D' },
                  ]}
                  defaultPeriod="30D"
                />
              )
            }

            {
              BridgeDailyVol && (
                <ChartByTime
                  data={BridgeDailyVol.data}
                  className={styles.chartByTime}
                  title={BridgeDailyVol.chart}
                  description={BridgeDailyVol.description}
                  label1={BridgeDailyVol.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' },
                    { value: '30D', label: '30D' },
                  ]}
                  defaultPeriod="30D"
                />
              )
            }

            {
              BridgeSubnet && (
                <ChartByTime
                  data={BridgeSubnet.data}
                  className={styles.chartByTime}
                  title={BridgeSubnet.chart}
                  description={BridgeSubnet.description}
                  label={BridgeSubnet.label}
                  label1={BridgeSubnet.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' },
                    { value: '30D', label: '30D' },
                  ]}
                  defaultPeriod="30D"
                />
              )
            }

            {
              DexTvl && (
                <ChartByTime
                  data={DexTvl.data}
                  className={styles.chartByTime}
                  title={DexTvl.chart}
                  description={DexTvl.description}
                  label={DexTvl.label}
                  label1={DexTvl.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' },
                    { value: '30D', label: '30D' },
                  ]}
                  defaultPeriod="30D"
                />
              )
            }

            {
              DexVolume && (
                <ChartByTime
                  data={DexVolume.data}
                  className={styles.chartByTime}
                  title={DexVolume.chart}
                  description={DexVolume.description}
                  label={DexVolume.label}
                  label1={DexVolume.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' }
                  ]}
                  defaultPeriod="7D"
                />
              )
            }

            {
              DexFeeRatio && (
                <ChartByTime
                  data={DexFeeRatio.data}
                  className={styles.chartByTime}
                  title={DexFeeRatio.chart}
                  description={DexFeeRatio.description}
                  label={DexFeeRatio.label}
                  label1={DexFeeRatio.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' }
                  ]}
                  defaultPeriod="7D"
                />
              )
            }

            {
              DexStable && (
                <ChartByTime
                  data={DexStable.data}
                  className={styles.chartByTime}
                  title={DexStable.chart}
                  description={DexStable.description}
                  label={DexStable.label}
                  label1={DexStable.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' }
                  ]}
                  defaultPeriod="7D"
                />
              )
            }

            {
              DexWhaleShare && (
                <ChartByTime
                  data={DexWhaleShare.data}
                  className={styles.chartByTime}
                  title={DexWhaleShare.chart}
                  description={DexWhaleShare.description}
                  label={DexWhaleShare.label}
                  label1={DexWhaleShare.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' }
                  ]}
                  defaultPeriod="7D"
                />
              )
            }

            {
              GasUsed && (
                <ChartByTime
                  data={GasUsed.data}
                  className={styles.chartByTime}
                  title={GasUsed.chart}
                  description={GasUsed.description}
                  label={GasUsed.label}
                  label1={GasUsed.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' }
                  ]}
                  defaultPeriod="7D"
                />
              )
            }

            {
              GasCost && (
                <ChartByTime
                  data={GasCost.data}
                  className={styles.chartByTime}
                  title={GasCost.chart}
                  description={GasCost.description}
                  label={GasCost.label}
                  label1={GasCost.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' }
                  ]}
                  defaultPeriod="7D"
                />
              )
            }

            {
              GasPrice && (
                <ChartByTime
                  data={GasPrice.data}
                  className={styles.chartByTime}
                  title={GasPrice.chart}
                  description={GasPrice.description}
                  label={GasPrice.label}
                  label1={GasPrice.label1}
                  valueColor="#10B981"
                  transactionsColor="#3CDFEF99"
                  periods={[
                    { value: '1H', label: '1H' },
                    { value: '24H', label: '24H' },
                    { value: '7D', label: '7D' }
                  ]}
                  defaultPeriod="7D"
                />
              )
            }
          </div>
        </div>

        {hashblockOpened && actualHashblock && (
          <HashblockInfo
            data={actualHashblock}
            onClose={() => handleHashblock()}
          />
        )}

        <OpenChat />
      </div>
    </Layout>
  )
}

export default Avax
