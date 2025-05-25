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

import TokensTable from "@/modules/avax/components/table/table"

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
import { Tab, Tabs } from "@mui/material"
import SuzakoService, { Token } from "@/lib/api/services/suzaku"

const Avax: React.FC = () => {
  const router = useRouter()
  const [actual, setActual] = useState("AVAX")
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
  const [value, setValue] = React.useState('0')
  const [modalOpened, setModalOpened] = useState(false)
  const [whaleOpened, setWhaleOpened] = useState(false)
  const [hashblockOpened, setHashblockOpened] = useState(false)
  const [bridgeFee, setBridgeFee] = useState<any>()
  const [bridgeTx, setBridgeTx] = useState<any>()
  const [bridgeVol, setBridgeVol] = useState<any>()
  const [bridgeSwap, setBridgeSwap] = useState<any>()
  const [bridgeDailyVol, setBridgeDailyVol] = useState<any>()
  const [bridgeSubnet, setBridgeSubnet] = useState<any>()
  const [dexTvl, setDexTvl] = useState<any>()
  const [dexVolume, setDexVolume] = useState<any>()
  const [dexFeeRatio, setDexFeeRatio] = useState<any>()
  const [dexStable, setDexStable] = useState<any>()
  const [dexWhaleShare, setDexWhaleShare] = useState<any>()
  const [gasUsed, setGasUsed] = useState<any>()
  const [gasCost, setGasCost] = useState<any>()
  const [gasPrice, setGasPrice] = useState<any>()
  const [gasSpike, setGasSpike] = useState<any>()
  const [gasMaxSpike, setGasMaxSpike] = useState<any>()
  const [gasTotalFee, setGasTotalFee] = useState<any>()
  const [poolHighVol, setPoolHighVol] = useState<any>()
  const [poolLiquidity, setPoolLiquidity] = useState<any>()
  const [poolLiquidityGTE, setPoolLiquidityGTE] = useState<any>()
  const [poolSupply, setPoolSupply] = useState<any>()
  const [poolTvl, setPoolTvl] = useState<any>()
  const [poolVol, setPoolVol] = useState<any>()
  const [poolToken, setPoolToken] = useState<any>()
  const [poolRisingVol, setPoolRisingVol] = useState<any>()
  const [poolStablecoin, setPoolStablecoin] = useState<any>()
  const [stakeConcentration, setStakeConcentration] = useState<any>()
  const [stakeTvl, setStakeTvl] = useState<any>()
  const [stakeValidators, setStakeValidators] = useState<any>()
  const [throughputBlock, setThroughputBlock] = useState<any>()
  const [throughputVariance, setThroughputVariance] = useState<any>()
  const [throughputEfficiency, setThroughputEfficiency] = useState<any>()
  const [throughputTrend, setThroughputTrend] = useState<any>()
  const [throughputValidation, setThroughputValidation] = useState<any>()
  const [tokenLaunch, setTokenLaunch] = useState<any>()
  const [tokenPrice, setTokenPrice] = useState<any>()
  const [tokenPriceImpact, setTokenPriceImpact] = useState<any>()
  const [tokenSupply, setTokenSupply] = useState<any>()
  const [tokenVolatility, setTokenVolatility] = useState<any>()
  const [tokenTrend, setTokenTrend] = useState<any>()

  const [tokens, setTokens] = useState<Token[]>([])

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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeFee()

      setBridgeFee(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeTx()

      setBridgeTx(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeVol()

      setBridgeVol(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeDailyVol()

      setBridgeDailyVol(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getBridgeSubnet()

      setBridgeSubnet(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexTvl()

      setDexTvl(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexVolume()

      setDexVolume(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexFeeRatio()

      setDexFeeRatio(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexStable()

      setDexStable(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getDexWhaleShare()

      setDexWhaleShare(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getGasUsed()

      setGasUsed(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getGasPrice()

      setGasPrice(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getGasCost()

      setGasCost(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getGasSpike()

      setGasSpike(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getGasMaxSpike()

      setGasMaxSpike(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getGasTotalFee()

      setGasTotalFee(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getPoolHighVol()

      setPoolHighVol(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getPoolLiquidity()

      setPoolLiquidity(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getPoolLiquidityGTE()

      setPoolLiquidityGTE(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getPoolSupply()

      setPoolSupply(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getPoolTvl()

      setPoolTvl(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getPoolVol()

      setPoolVol(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getPoolToken()

      setPoolToken(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getPoolRisingVol()

      setPoolRisingVol(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getPoolStablecoin()

      setPoolStablecoin(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getStakeConcentration()

      setStakeConcentration(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getStakeTvl()

      setStakeTvl(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getStakeValidators()

      setStakeValidators(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getThroughputBlock()

      setThroughputBlock(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getThroughputVariance()

      setThroughputVariance(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getThroughputEfficiency()

      setThroughputEfficiency(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getThroughputTrend()

      setThroughputTrend(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getThroughputValidation()

      setThroughputValidation(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getTokenLaunch()

      setTokenLaunch(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getTokenPrice()

      setTokenPrice(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getTokenPriceImpact()

      setTokenPriceImpact(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getTokenSupply()

      setTokenSupply(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getTokenVolatility()

      setTokenVolatility(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await AvaxService.getTokenTrend()

      setTokenTrend(data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await SuzakoService.getTokens()

      setTokens(data)
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
        <div className="mb-8 mx-[20px] md:mx-[40px]">
          <Tabs
            sx={{
              marginBottom: '4px',
              '.Mui-selected': {
                color: `#3BEBFC !important`,
              },
            }}
            value={value}
            onChange={handleChange}
            slotProps={{ indicator: { style: { background: '#3BEBFC' } } }}
            aria-label="avax tabs"
          >
            <Tab className={styles.tab} label="AVAX" value="0" />
            <Tab className={styles.tab} label="Suzaku" value="1" />
          </Tabs>
        </div>
        {
          value === '0' && (
            <>
              <Hashblocks
                coin={actual}
                data={hashblocks}
                onSelect={(hashblock: any) => handleHashblock(hashblock)}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-12 mt-6">
                <div className="flex flex-col col-span-3 md:col-span-3 gap-6">
                  {
                    bridgeFee && (
                      <ChartByTime
                        data={bridgeFee.data}
                        className={styles.chartByTime}
                        title={bridgeFee.chart}
                        description={bridgeFee.description}
                        label1={bridgeFee.label1}
                        label2={bridgeFee.label2}
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
                    bridgeVol && (
                      <ChartByTime
                        data={bridgeVol.data}
                        className={styles.chartByTime}
                        title={bridgeVol.chart}
                        description={bridgeVol.description}
                        label1={bridgeVol.label1}
                        label2={bridgeVol.label2}
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
                    bridgeSwap && (
                      <ChartByTime
                        data={bridgeSwap.data}
                        className={styles.chartByTime}
                        title={bridgeSwap.chart}
                        description={bridgeSwap.description}
                        label={bridgeSwap.label1}
                        label1={bridgeSwap.label1}
                        label2={bridgeSwap.label2}
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
                    bridgeDailyVol && (
                      <ChartByTime
                        data={bridgeDailyVol.data}
                        className={styles.chartByTime}
                        title={bridgeDailyVol.chart}
                        description={bridgeDailyVol.description}
                        label1={bridgeDailyVol.label1}
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
                    bridgeSubnet && (
                      <ChartByTime
                        data={bridgeSubnet.data}
                        className={styles.chartByTime}
                        title={bridgeSubnet.chart}
                        description={bridgeSubnet.description}
                        label={bridgeSubnet.label}
                        label1={bridgeSubnet.label1}
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
                    dexTvl && (
                      <ChartByTime
                        data={dexTvl.data}
                        className={styles.chartByTime}
                        title={dexTvl.chart}
                        description={dexTvl.description}
                        label={dexTvl.label}
                        label1={dexTvl.label1}
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
                    dexVolume && (
                      <ChartByTime
                        data={dexVolume.data}
                        className={styles.chartByTime}
                        title={dexVolume.chart}
                        description={dexVolume.description}
                        label={dexVolume.label}
                        label1={dexVolume.label1}
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
                    dexFeeRatio && (
                      <ChartByTime
                        data={dexFeeRatio.data}
                        className={styles.chartByTime}
                        title={dexFeeRatio.chart}
                        description={dexFeeRatio.description}
                        label={dexFeeRatio.label}
                        label1={dexFeeRatio.label1}
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
                    dexStable && (
                      <ChartByTime
                        data={dexStable.data}
                        className={styles.chartByTime}
                        title={dexStable.chart}
                        description={dexStable.description}
                        label={dexStable.label}
                        label1={dexStable.label1}
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
                    dexWhaleShare && (
                      <ChartByTime
                        data={dexWhaleShare.data}
                        className={styles.chartByTime}
                        title={dexWhaleShare.chart}
                        description={dexWhaleShare.description}
                        label={dexWhaleShare.label}
                        label1={dexWhaleShare.label1}
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
                    gasUsed && (
                      <ChartByTime
                        data={gasUsed.data}
                        className={styles.chartByTime}
                        title={gasUsed.chart}
                        description={gasUsed.description}
                        label={gasUsed.label}
                        label1={gasUsed.label1}
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
                    gasCost && (
                      <ChartByTime
                        data={gasCost.data}
                        className={styles.chartByTime}
                        title={gasCost.chart}
                        description={gasCost.description}
                        label={gasCost.label}
                        label1={gasCost.label1}
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
                    gasPrice && (
                      <ChartByTime
                        data={gasPrice.data}
                        className={styles.chartByTime}
                        title={gasPrice.chart}
                        description={gasPrice.description}
                        label={gasPrice.label}
                        label1={gasPrice.label1}
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
                    gasSpike && (
                      <ChartByTime
                        data={gasSpike.data}
                        className={styles.chartByTime}
                        title={gasSpike.chart}
                        description={gasSpike.description}
                        label={gasSpike.label}
                        label1={gasSpike.label1}
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
                    gasMaxSpike && (
                      <ChartByTime
                        data={gasMaxSpike.data}
                        className={styles.chartByTime}
                        title={gasMaxSpike.chart}
                        description={gasMaxSpike.description}
                        label={gasMaxSpike.label}
                        label1={gasMaxSpike.label1}
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
                    gasTotalFee && (
                      <ChartByTime
                        data={gasTotalFee.data}
                        className={styles.chartByTime}
                        title={gasTotalFee.chart}
                        description={gasTotalFee.description}
                        label={gasTotalFee.label}
                        label1={gasTotalFee.label1}
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
                    poolHighVol && (
                      <ChartByTime
                        data={poolHighVol.data}
                        className={styles.chartByTime}
                        title={poolHighVol.chart}
                        description={poolHighVol.description}
                        label={poolHighVol.label}
                        label1={poolHighVol.label1}
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
                    poolLiquidity && (
                      <ChartByTime
                        data={poolLiquidity.data}
                        className={styles.chartByTime}
                        title={poolLiquidity.chart}
                        description={poolLiquidity.description}
                        label={poolLiquidity.label}
                        label1={poolLiquidity.label1}
                        label2={poolLiquidity.label2}
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
                    poolLiquidityGTE && (
                      <ChartByTime
                        data={poolLiquidityGTE.data}
                        className={styles.chartByTime}
                        title={poolLiquidityGTE.chart}
                        description={poolLiquidityGTE.description}
                        label={poolLiquidityGTE.label}
                        label1={poolLiquidityGTE.label1}
                        label2={poolLiquidityGTE.label2}
                        label3={poolLiquidityGTE.label3}
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
                    poolSupply && (
                      <ChartByTime
                        data={poolSupply.data}
                        className={styles.chartByTime}
                        title={poolSupply.chart}
                        description={poolSupply.description}
                        label={poolSupply.label}
                        label1={poolSupply.label1}
                        label2={poolSupply.label2}
                        label3={poolSupply.label3}
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
                    poolTvl && (
                      <ChartByTime
                        data={poolTvl.data}
                        className={styles.chartByTime}
                        title={poolTvl.chart}
                        description={poolTvl.description}
                        label={poolTvl.label}
                        label1={poolTvl.label1}
                        label2={poolTvl.label2}
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
                    poolVol && (
                      <ChartByTime
                        data={poolVol.data}
                        className={styles.chartByTime}
                        title={poolVol.chart}
                        description={poolVol.description}
                        label={poolVol.label}
                        label1={poolVol.label1}
                        valueColor="#10B981"
                        transactionsColor="#3CDFEF99"
                        periods={[
                          { value: '1H', label: '1H' },
                          { value: '24H', label: '24H' },
                        ]}
                        defaultPeriod="24H"
                      />
                    )
                  }

                  {
                    poolToken && (
                      <ChartByTime
                        data={poolToken.data}
                        className={styles.chartByTime}
                        title={poolToken.chart}
                        description={poolToken.description}
                        label={poolToken.label}
                        label1={poolToken.label1}
                        valueColor="#10B981"
                        transactionsColor="#3CDFEF99"
                        periods={[
                          { value: '1H', label: '1H' },
                          { value: '24H', label: '24H' },
                        ]}
                        defaultPeriod="24H"
                      />
                    )
                  }

                  {
                    poolRisingVol && (
                      <ChartByTime
                        data={poolRisingVol.data}
                        className={styles.chartByTime}
                        title={poolRisingVol.chart}
                        description={poolRisingVol.description}
                        label={poolRisingVol.label}
                        label1={poolRisingVol.label1}
                        label2={poolRisingVol.label2}
                        valueColor="#10B981"
                        transactionsColor="#3CDFEF99"
                        periods={[
                          { value: '1H', label: '1H' },
                          { value: '24H', label: '24H' },
                        ]}
                        defaultPeriod="24H"
                      />
                    )
                  }

                  {
                    poolStablecoin && (
                      <ChartByTime
                        data={poolStablecoin.data}
                        className={styles.chartByTime}
                        title={poolStablecoin.chart}
                        description={poolStablecoin.description}
                        label={poolStablecoin.label}
                        label1={poolStablecoin.label1}
                        label2={poolStablecoin.label2}
                        valueColor="#10B981"
                        transactionsColor="#3CDFEF99"
                        periods={[
                          { value: '1H', label: '1H' },
                          { value: '24H', label: '24H' },
                        ]}
                        defaultPeriod="24H"
                      />
                    )
                  }

                  {
                    stakeConcentration && (
                      <ChartByTime
                        data={stakeConcentration.data}
                        className={styles.chartByTime}
                        title={stakeConcentration.chart}
                        description={stakeConcentration.description}
                        label={stakeConcentration.label}
                        label1={stakeConcentration.label1}
                        valueColor="#10B981"
                        transactionsColor="#3CDFEF99"
                        periods={[
                          { value: '1H', label: '1H' },
                          { value: '24H', label: '24H' },
                        ]}
                        defaultPeriod="24H"
                      />
                    )
                  }

                  {
                    stakeTvl && (
                      <ChartByTime
                        data={stakeTvl.data}
                        className={styles.chartByTime}
                        title={stakeTvl.chart}
                        description={stakeTvl.description}
                        label={stakeTvl.label}
                        label1={stakeTvl.label1}
                        valueColor="#10B981"
                        transactionsColor="#3CDFEF99"
                        periods={[
                          { value: '1H', label: '1H' },
                          { value: '24H', label: '24H' },
                        ]}
                        defaultPeriod="24H"
                      />
                    )
                  }

                  {
                    stakeValidators && (
                      <ChartByTime
                        data={stakeValidators.data}
                        className={styles.chartByTime}
                        title={stakeValidators.chart}
                        description={stakeValidators.description}
                        label={stakeValidators.label}
                        label1={stakeValidators.label1}
                        label2={stakeValidators.label2}
                        valueColor="#10B981"
                        transactionsColor="#3CDFEF99"
                        periods={[
                          { value: '1H', label: '1H' },
                          { value: '24H', label: '24H' },
                        ]}
                        defaultPeriod="24H"
                      />
                    )
                  }

                  {
                    throughputBlock && (
                      <ChartByTime
                        data={throughputBlock.data}
                        className={styles.chartByTime}
                        title={throughputBlock.chart}
                        description={throughputBlock.description}
                        label={throughputBlock.label}
                        label1={throughputBlock.label1}
                        valueColor="#10B981"
                        transactionsColor="#3CDFEF99"
                        periods={[
                          { value: '1H', label: '1H' },
                          { value: '24H', label: '24H' },
                        ]}
                        defaultPeriod="24H"
                      />
                    )
                  }

                  {
                    throughputVariance && (
                      <ChartByTime
                        data={throughputVariance.data}
                        className={styles.chartByTime}
                        title={throughputVariance.chart}
                        description={throughputVariance.description}
                        label={throughputVariance.label}
                        label1={throughputVariance.label1}
                        label2={throughputVariance.label2}
                        valueColor="#10B981"
                        transactionsColor="#3CDFEF99"
                        periods={[
                          { value: '1H', label: '1H' },
                          { value: '24H', label: '24H' },
                        ]}
                        defaultPeriod="24H"
                      />
                    )
                  }

                  {
                    throughputEfficiency && (
                      <ChartByTime
                        data={throughputEfficiency.data}
                        className={styles.chartByTime}
                        title={throughputEfficiency.chart}
                        description={throughputEfficiency.description}
                        label={throughputEfficiency.label}
                        label1={throughputEfficiency.label1}
                        label2={throughputEfficiency.label2}
                        label3={throughputEfficiency.label3}
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
                    throughputTrend && (
                      <ChartByTime
                        data={throughputTrend.data}
                        className={styles.chartByTime}
                        title={throughputTrend.chart}
                        description={throughputTrend.description}
                        label={throughputTrend.label}
                        label1={throughputTrend.label1}
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
                    throughputValidation && (
                      <ChartByTime
                        data={throughputValidation.data}
                        className={styles.chartByTime}
                        title={throughputValidation.chart}
                        description={throughputValidation.description}
                        label={throughputValidation.label}
                        label1={throughputValidation.label1}
                        label2={throughputValidation.label2}
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
                    tokenLaunch && (
                      <ChartByTime
                        data={tokenLaunch.data}
                        className={styles.chartByTime}
                        title={tokenLaunch.chart}
                        description={tokenLaunch.description}
                        label={tokenLaunch.label}
                        label1={tokenLaunch.label1}
                        label2={tokenLaunch.label2}
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
                    tokenPrice && (
                      <ChartByTime
                        data={tokenPrice.data}
                        className={styles.chartByTime}
                        title={tokenPrice.chart}
                        description={tokenPrice.description}
                        label={tokenPrice.label}
                        label1={tokenPrice.label1}
                        label2={tokenPrice.label2}
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
                    tokenPriceImpact && (
                      <ChartByTime
                        data={tokenPriceImpact.data}
                        className={styles.chartByTime}
                        title={tokenPriceImpact.chart}
                        description={tokenPriceImpact.description}
                        label={tokenPriceImpact.label}
                        label1={tokenPriceImpact.label1}
                        label2={tokenPriceImpact.label2}
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
                    tokenSupply && (
                      <ChartByTime
                        data={tokenSupply.data}
                        className={styles.chartByTime}
                        title={tokenSupply.chart}
                        description={tokenSupply.description}
                        label={tokenSupply.label}
                        label1={tokenSupply.label1}
                        label2={tokenSupply.label2}
                        label3={tokenSupply.label3}
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
                    tokenVolatility && (
                      <ChartByTime
                        data={tokenVolatility.data}
                        className={styles.chartByTime}
                        title={tokenVolatility.chart}
                        description={tokenVolatility.description}
                        label={tokenVolatility.label}
                        label1={tokenVolatility.label1}
                        valueColor="#10B981"
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
                    tokenTrend && (
                      <ChartByTime
                        data={tokenTrend.data}
                        className={styles.chartByTime}
                        title={tokenTrend.chart}
                        description={tokenTrend.description}
                        label={tokenTrend.label}
                        label1={tokenTrend.label1}
                        label2={tokenTrend.label2}
                        label3={tokenTrend.label3}
                        valueColor="#10B981"
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
                </div>
              </div>
            </>
          )}

        {
          value === '1' && (
            <>
              {tokens && (
                <div className="flex flex-col mb-4 mx-4 sm:mx-8 lg:mx-12 text-white overflow-x-auto">
                  <TokensTable title="Tokens" data={tokens} />
                </div>
              )}
            </>
          )
        }

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
