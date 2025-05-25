"use client"

import React, { useState, useEffect } from "react"
import styles from "./styles.module.scss"
import {
  ArrowRight,
}
  from "lucide-react"
import { useRouter } from "next/navigation"

import HashblockInfo from '@/components/hashblock-info/hashblock-info'
import NftTable from "@/modules/solana/components/nft-table/nft-table"
import MemeTable from "@/modules/solana/components/meme-token-table/meme-token-table"
import CustomTabs2 from "@/modules/solana/components/custom-tabs2/custom-tabs2"
import CustomTabs from "@/modules/solana/components/custom-tabs2/custom-tabs2"

import Hashblocks from "@/components/hashblocks/hashblocks"
import Network, { NetworkData } from "@/components/network/network"
import BitcoinService from "@/lib/api/services/bitcoin"
import InfoModal from "@/components/info-modal/info-modal"
import AddressInfo from "@/components/address-info/address-info"
import OpenChat from "@/components/open-chat/open-chat"
import WhaleHunting from "@/components/whale-hunting/whale-hunting"
import { minutesInterval } from "@/utils/time"
import TransactionInfo from "@/components/transaction-info/transaction-info"
import { Card } from "@/components/ui/card"

import Layout from "@/components/layout/Layout"

const Solana: React.FC = () => {
  const router = useRouter()
  const [actual, setActual] = useState("Solana")
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
  const [info, setInfo] = useState<any>()
  const [data, setData] = useState<NetworkData>({
    description:
      "Solana network shows high transactional activity with an increase in active addresses however, there has been a slight decrease in transaction volume on exchanges, suggesting a possible accumulation of tokens in private wallets and reduced trading movement in the short term",
    transactions: "2.020.749 transactions",
    transactionsValue: "2980937292746 SOL",
    avgTransactions: "418.861 transactions",
    address: "12300289033 addresses",
    token: "SOL USD"
  })

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

  const handleGetInfo = async (type: string, value: string) => {
    setModalOpened(true)

    if (type === 'address') {
      const response: any = await BitcoinService.getAddressInfo(value)

      if (response.data && response.data.chain_stats) {
        const data = {
          ok: response.data,
          type: type
        }

        setInfo(data)
      }
      else {
        setInfo({ error: 'fail' })
      }
    }
    else if (type === 'transaction') {
      const response: any = await BitcoinService.getTransactionInfo(value)

      if (response.data) {
        const data = {
          ok: response.data,
          type: type
        }

        setInfo(data)
      }
      else {
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
    if (page === "Whale Hunting") {
      setWhaleOpened(true)
    }
  }

  return (
    <Layout
      noPadding
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
        <Hashblocks
          coin={actual}
          data={hashblocks}
          onSelect={(hashblock: any) => handleHashblock(hashblock)}
        />
        <div className={`${styles.info} grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6`}>
          <Network data={data} />
          <div className={`${styles.custom} md:block hidden`}>
            <CustomTabs
              hashblocks={hashblocks}
              labels={[
                "Active Addresses",
                "Fees",
                "Token Transfers",
                "Transactions",
                "Current Epoch",
              ]}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6 px-3 md:px-10">
          <div className={`${styles.custom} flex-1`}>
            <CustomTabs2
              hashblocks={hashblocks}
              labels={["TPS", "AVG Ping Time", "TVL"]}
            />
          </div>

          <Card className={`${styles.card} flex-1 flex my-2 md:my-4 pt-4`}>
            <div className="flex flex-col p-4 w-full">
              <h3 className=" text-zinc-100">Volume</h3>
              <div className="flex">
                <Card className="mt-1 bg-[#3CDFEF99] flex w-[80%] border-none">
                  <p className=" p-4 text-zinc-100 font-medium">
                    $2,875,933,651
                  </p>
                  <div
                    className="flex items-center ml-auto mr-8 hover:cursor-pointer"
                    onClick={() => router.push("/pano-view/solana/volume")}
                  >
                    <ArrowRight className="text-zinc-100 w-8 h-8 center" />
                  </div>
                </Card>
                <Card className="flex items-center justify-items-center ml-4 w-[60px] bg-[#2C7300] border-none">
                  <p className="text-zinc-100 m-auto text-xs">+5.46%</p>
                </Card>
              </div>

              <h3 className="mt-4 text-zinc-100">Market Cap</h3>
              <div className="flex">
                <Card className="mt-1 flex bg-[#D3D3D3]  w-[90%] border-none">
                  <p className=" p-4 text-zinc-900 font-medium">
                    $64,233,356,606
                  </p>
                  <div className="flex items-center w-[38px] h-[38px] bg-[#3CDFEF99] m-auto mr-8 rounded-md hover:cursor-pointer">
                    <ArrowRight className="text-zinc-100 w-8 h-8 m-auto center" />
                  </div>
                </Card>
              </div>

              <h3 className="mt-4 text-zinc-100">Supply</h3>
              <div className="flex">
                <Card className="mt-1 flex bg-[#D3D3D3]  w-[90%] border-none">
                  <p className=" p-4 text-zinc-900 font-medium">
                    585,827,435 SOL
                  </p>
                  <div className="flex items-center  w-[38px] h-[38px] bg-[#3CDFEF99] m-auto mr-8 rounded-md hover:cursor-pointer">
                    <ArrowRight className="text-zinc-100 w-8 h-8 m-auto center" />
                  </div>
                </Card>
              </div>

              <h3 className="mt-4 text-zinc-100">Total Stake</h3>
              <div className="flex">
                <Card className="mt-1 flex bg-[#D3D3D3]  w-[90%] border-none">
                  <p className=" p-4 text-zinc-900 font-medium">
                    392,545,171.92 SOL
                  </p>
                  <div className="flex items-center  w-[38px] h-[38px] bg-[#3CDFEF99] m-auto mr-8 rounded-md hover:cursor-pointer">
                    <ArrowRight className="text-zinc-100 w-8 h-8 m-auto center" />
                  </div>
                </Card>
              </div>

              <h3 className="mt-4 text-zinc-100">Token Balances</h3>
              <div className="flex">
                <Card className="mt-1 flex bg-[#D3D3D3]  w-[90%] border-none">
                  <p className=" p-4 text-zinc-900 font-medium">
                    263,762,293 SOL
                  </p>
                  <div className="flex items-center  w-[38px] h-[38px] bg-[#3CDFEF99] m-auto mr-8 rounded-md hover:cursor-pointer">
                    <ArrowRight className="text-zinc-100 w-8 h-8 m-auto center" />
                  </div>
                </Card>
              </div>

              <h3 className="mt-4 text-zinc-100">Exchange Flow</h3>
              <div className="flex">
                <Card className="mt-1 flex bg-[#D3D3D3]  w-[90%] border-none">
                  <p className=" p-4 text-zinc-900 font-medium">
                    263,762,293 SOL
                  </p>
                  <div className="flex items-center  w-[38px] h-[38px] bg-[#3CDFEF99] m-auto mr-8 rounded-md hover:cursor-pointer">
                    <ArrowRight className="text-zinc-100 w-8 h-8 m-auto center" />
                  </div>
                </Card>
              </div>

              <h3 className="mt-4 text-zinc-100">Active Validators</h3>
              <div className="flex">
                <Card className="mt-1 flex bg-[#D3D3D3]  w-[90%] border-none">
                  <p className=" p-4 text-zinc-900 font-medium">1461</p>
                  <div className="flex items-center w-[38px] h-[38px] bg-[#3CDFEF99] m-auto mr-8 rounded-md hover:cursor-pointer">
                    <ArrowRight className="text-zinc-100 w-8 h-8 m-auto center" />
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          <Card className={`${styles.card} flex-1 flex my-2 md:my-4 pt-4`}>
            <NftTable title="Top NFTs" />
          </Card>

          <Card className={`${styles.card} flex-1 flex my-2 md:my-4 pt-4`}>
            <MemeTable title="Top Meme Coins" />
          </Card>
        </div>

        {modalOpened && (
          <InfoModal data={info} onClose={() => handleClose()}>
            {info?.type === "address" ? (
              <AddressInfo title="Address Information" data={info?.["ok"]} />
            ) : (
              // : <TransactionInfo title="Transaction Information" data={info?.['ok'] && info?.['ok'][0] !== 'Invalid hex string' && JSON.parse(info?.['ok'][0])} />
              <TransactionInfo
                title="Transaction Information"
                data={info?.["ok"]}
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
            onSelect={(id: string) => handleGetInfo("address", id)}
            onClose={() => setWhaleOpened(false)}
          />
        )}
      </div>
    </Layout>
  )
}

export default Solana
