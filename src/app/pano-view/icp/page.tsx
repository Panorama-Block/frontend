"use client"

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Tab, Tabs, Tooltip } from '@mui/material'

import { HashblockProps } from '@/components/hashblocks/hashblocks'
import Network from '@/modules/icp/components/network/network'
import CustomTabs from '@/modules/icp/components/custom-tabs/custom-tabs'
import BitcoinService from '@/lib/api/services/bitcoin'
import InfoModal from '@/components/info-modal/info-modal'
import TransactionInfo from '@/components/transaction-info/transaction-info'
import AddressInfo from '@/components/address-info/address-info'
import OpenChat from '@/components/open-chat/open-chat'
import WhaleHunting from '@/modules/icp/components/whale-hunting/whale-hunting'
import { getLastWeek, minutesInterval } from '@/utils/time'
import { ICPAreaChart } from '@/modules/icp/components/icp-area-chart/icp-area-chart'
import { ByTimeChart } from '@/components/by-time-chart/by-time-chart'
import Layout from '@/components/layout/Layout'
import CanistersTable from '@/modules/ck-btc/components/canisters-table/canisters-table'
import { InfoBox } from '@/components/info-box/info-box'
import TranscationsTable from '@/modules/ck-btc/components/transactions-table/transactions-table'

const Icp: React.FC = () => {
    const [actual, setActual] = useState('ICP')
    const [actualHashblock, setActualHashblock] = useState(null)
    const [hashblocks, setHashblocks] = useState<HashblockProps[]>()
    const [modalOpened, setModalOpened] = useState(false)
    const [chatOpened, setChatOpened] = useState(false)
    const [whaleOpened, setWhaleOpened] = useState(false)
    const [hashblockOpened, setHashblockOpened] = useState(false)
    const [value, setValue] = React.useState('0')
    const [info, setInfo] = useState<any>()
    const [data, setData] = useState(
        {
            description: "The Internet Computer is a public blockchain network enabled by new science from first principles. It is millions of times more powerful and can replace clouds and traditional IT. The network - created by ICP, or Internet Computer Protocol - is orchestrated by permissionless decentralized governance and is hosted on sovereign hardware devices run by independent parties. Its purpose is to extend the public internet with native cloud computing functionality.",
            activeUsers: '',
            avgTransactions: '',
            transactionsValue: '',
            address: "",
            block_height: "",
            transactions: "",
            fee: "",
            burned: "",
            circulating_supply: "",
            token: 'ICP USD'
        }
    )
    const [tvl, setTVL] = useState<any>([])
    const [burned, setBurned] = useState<any>([])
    const [supply, setSupply] = useState<any>([])
    const [canisters, setCanisters] = useState<any>([])
    const [transactions, setTransactions] = useState<any>([])
    const [cyclesRate, setCyclesRate] = useState<any>([])
    const [blocksHeight, setBlocksHeight] = useState<any>([])

    //CKBTC
    const [ckCanisters, setCkCanisters] = useState()
    const [ckTransactions, setCkTransactions] = useState()
    const [ckTotalSuply, setCkTotalSuply] = useState()
    const [ckNumberTransactions, setCkNumberTransactions] = useState()
    const [ckHeight, setCkHeight] = useState()
    const [ckMemory, setCkMemory] = useState()

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
        const getDailyStats = async () => {
            const response: any = await BitcoinService.getDailyStats()
            if (response) {
                setData({
                    ...data,
                    address: response.unique_accounts_per_day,
                    fee: response.icp_burned_fees,
                    burned: response.icp_burned_total,
                    transactions: response.total_transactions
                })
            }
        }

        getDailyStats()
    }, [])

    useEffect(() => {
        const now = new Date()
        const lastWeek = getLastWeek(now)

        const date = {
            start: Math.floor((+lastWeek) / 1000),
            end: Math.floor((+now) / 1000)
        }

        const getTVL = async (): Promise<void> => {
            const response = await BitcoinService.getTVL(date)

            setTVL(response)
        }

        const getBurned = async (): Promise<void> => {
            const response = await BitcoinService.getBurned(date)

            setBurned(response)
        }

        const getSupply = async (): Promise<void> => {
            const response = await BitcoinService.getSupply(date)

            setSupply(response)
        }

        getTVL()
        getBurned()
        getSupply()
    }, [])

    useEffect(() => {
        const getCanisters = async () => {
            const now = new Date()
            const lastWeek = getLastWeek(now)

            const date = {
                start: Math.floor((+lastWeek) / 1000),
                end: Math.floor((+now) / 1000)
            }

            const response: any = await BitcoinService.getCanisters(date)
            if (response) {
                setCanisters(response)
            }
        }

        getCanisters()
    }, [])

    useEffect(() => {
        const now = new Date()
        const lastWeek = getLastWeek(now)

        const date = {
            start: Math.floor((+lastWeek) / 1000),
            end: Math.floor((+now) / 1000)
        }

        const getCyclesRate = async () => {

            const response: any = await BitcoinService.getCyclesRate(date)
            if (response) {
                setCyclesRate(response)
            }
        }

        getCyclesRate()
    }, [])

    useEffect(() => {
        const now = new Date()
        const lastWeek = getLastWeek(now)

        const date = {
            start: Math.floor((+lastWeek) / 1000),
            end: Math.floor((+now) / 1000)
        }

        const getBlocksHeight = async () => {

            const response: any = await BitcoinService.getBlocksHeight(date)
            if (response) {
                setBlocksHeight(response)
            }
        }

        getBlocksHeight()
    }, [])

    // CKBTC
    useEffect(() => {
        const getCanisters = async () => {
            const response = await BitcoinService.getCkBTCCanisters()
            setCkCanisters(response)
        }

        getCanisters()
    }, [])

    useEffect(() => {
        const now = new Date()
        const lastWeek = getLastWeek(now)

        const date = {
            start: Math.floor(+lastWeek / 1000),
            end: Math.floor(+now / 1000),
        }

        const getTotalSuply = async () => {
            const response = await BitcoinService.getCkBTCSuply(date)
            setCkTotalSuply(response)
        }

        getTotalSuply()
    }, [])

    useEffect(() => {
        const getTransactions = async () => {
            const response = await BitcoinService.getCkBTCTransactions(24)
            setCkTransactions(response)
        }

        getTransactions()
    }, [])

    useEffect(() => {
        const now = new Date()
        const lastWeek = getLastWeek(now)

        const date = {
            start: Math.floor(+lastWeek / 1000),
            end: Math.floor(+now / 1000),
        }

        const getNumberTransactions = async () => {
            const response = await BitcoinService.getCkBTCNumberTransactions(date)
            setCkNumberTransactions(response)
        }

        getNumberTransactions()
    }, [])

    useEffect(() => {
        const now = new Date()
        const lastWeek = getLastWeek(now)

        const date = {
            start: Math.floor(+lastWeek / 1000),
            end: Math.floor(+now / 1000),
        }

        const getBlocksHeight = async () => {
            const response = await BitcoinService.getCkBTCHeight(date)
            setCkHeight(response)
        }

        getBlocksHeight()
    }, [])

    useEffect(() => {
        const now = new Date()
        const lastWeek = getLastWeek(now)

        const date = {
            start: Math.floor(+lastWeek / 1000),
            end: Math.floor(+now / 1000),
        }

        const getMemory = async () => {
            const response = await BitcoinService.getCkBTCStable(date)
            setCkMemory(response)
        }

        getMemory()
    }, [])

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

    const handleOpen = (page: string) => {
        if (page === 'Whale Hunting') {
            setWhaleOpened(true)
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <Layout
            sidebar={{ actual: actual, onChange: (coin: string) => setActual(coin), open: (page: string) => handleOpen(page) }}
            header={{ onSubmit: handleGetInfo }}
        >
            <div className={styles.home}>
                <div className={styles.container}>
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
                            aria-label="tweet tabs"
                        >
                            <Tab className={styles.tab} label="ICP" value="0" />
                            <Tab className={styles.tab} label="CkBTC" value="1" />
                        </Tabs>
                    </div>

                    {
                        value === '0' && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mx-[20px] md:mx-[40px]">
                                    <InfoBox
                                        title="Active Users"
                                        value={data.address}
                                        subtitle="Total users in last 24 hours"
                                        className={`${styles.infoList} border-[#1a2555]`}
                                    />

                                    <InfoBox
                                        title="Transactions"
                                        value={data.transactions}
                                        subtitle="Total transactions"
                                        className={`${styles.infoList} border-[#1a2555]`}
                                    />

                                    <InfoBox
                                        title="Burned Fees"
                                        value={data.fee}
                                        subtitle="Total fees burned"
                                        className={`${styles.infoList} border-[#1a2555]`}
                                    />

                                    <InfoBox
                                        title="Burned Total"
                                        value={data.burned}
                                        subtitle="Total tokens burned"
                                        className={`${styles.infoList} border-[#1a2555]`}
                                    />
                                </div>

                                <div className={styles.custom}>
                                    {
                                        tvl && <CustomTabs
                                            data={{ tvl: tvl, burned: burned, supply: supply }}
                                            labels={['TVL (7 days)', 'Total Supply (7 days)', 'Total Burned (7 days)']} />
                                    }
                                </div>

                                {
                                    canisters && <div className="flex flex-col mb-8 mx-[20px] text-white xl:mx-[40px]">
                                        <ByTimeChart
                                            className={styles.chartByTime}
                                            title="Canisters"
                                            data={canisters}
                                            dataSeries={[
                                                {
                                                    key: "canisters",
                                                    label: "Canisters",
                                                    color: "#3CDFEF99",
                                                    yAxisId: "left"
                                                }
                                            ]}
                                            autoAdjustDomain={true}
                                            domainPadding={0.2}
                                        />
                                    </div>
                                }


                                {
                                    cyclesRate && <div className="flex flex-col mb-8 mx-[20px] text-white xl:mx-[40px]">
                                        <ByTimeChart
                                            className={styles.chartByTime}
                                            title="Cycles"
                                            data={cyclesRate}
                                            dataSeries={[
                                                {
                                                    key: "cycles",
                                                    label: "Cycles",
                                                    color: "#3CDFEF99",
                                                    yAxisId: "left"
                                                }
                                            ]}
                                            autoAdjustDomain={true}
                                            domainPadding={0.2}
                                        />
                                    </div>
                                }

                                {
                                    blocksHeight && <div className="flex flex-col mb-8 mx-[20px] text-white xl:mx-[40px]">
                                        <ByTimeChart
                                            className={styles.chartByTime}
                                            title="Blocks"
                                            data={blocksHeight}
                                            dataSeries={[
                                                {
                                                    key: "height",
                                                    label: "Blocks",
                                                    color: "#3CDFEF99",
                                                    yAxisId: "left"
                                                }
                                            ]}
                                            autoAdjustDomain={true}
                                            domainPadding={0.2}
                                        />
                                    </div>
                                }
                            </>
                        )
                    }

                    {
                        value === '1' && (
                            <>
                                {ckTotalSuply && (
                                    <div className="flex flex-col mb-8 mx-12 text-white">
                                        <ByTimeChart
                                        className={styles.chartByTime}
                                            data={ckTotalSuply}
                                            title="Total Suply"
                                            dataSeries={[
                                                {
                                                    key: "total_suply",
                                                    label: "Total Suply",
                                                    color: "#3CDFEF99",
                                                    yAxisId: "left"
                                                }
                                            ]}
                                            autoAdjustDomain={true}
                                            domainPadding={0.2}
                                        />
                                    </div>
                                )}

                                {ckNumberTransactions && (
                                    <div className="flex flex-col mb-8 mx-12 text-white">
                                        <ByTimeChart
                                        className={styles.chartByTime}
                                            data={ckNumberTransactions}
                                            title="UTXos"
                                            dataSeries={[
                                                {
                                                    key: "number_of_utxos",
                                                    label: "Unspent Transaction Outputs",
                                                    color: "#3CDFEF99",
                                                    yAxisId: "left"
                                                }
                                            ]}
                                            autoAdjustDomain={true}
                                            domainPadding={0.2}
                                        />
                                    </div>
                                )}

                                {ckMemory && (
                                    <div className="flex flex-col mb-8 mx-12 text-white">
                                        <ByTimeChart
                                        className={styles.chartByTime}
                                            title="Stable Memory Usage"
                                            data={ckMemory}
                                            dataSeries={[
                                                {
                                                    key: "memory",
                                                    label: "Stable Memory",
                                                    color: "#3CDFEF99",
                                                    yAxisId: "left"
                                                }
                                            ]}
                                            autoAdjustDomain={true}
                                            domainPadding={0.2}
                                        />
                                    </div>
                                )}

                                {ckHeight && (
                                    <div className="flex flex-col mb-8 mx-12 text-white">
                                        <ByTimeChart
                                        className={styles.chartByTime}
                                            data={ckHeight}
                                            title="Block Height"
                                            dataSeries={[
                                                {
                                                    key: "height",
                                                    label: "Block Height",
                                                    color: "#3CDFEF99",
                                                    yAxisId: "left"
                                                }
                                            ]}
                                            autoAdjustDomain={true}
                                            domainPadding={0.2}
                                        />
                                    </div>
                                )}

                                {ckCanisters && (
                                    <div className="flex flex-col mb-4 mx-12 text-white">
                                        <CanistersTable title="Canisters" data={ckCanisters} />
                                    </div>
                                )}

                                {ckTransactions && (
                                    <div className="flex flex-col mb-4 mx-12 text-white">
                                        <TranscationsTable title="Transactions" data={ckTransactions} />
                                    </div>
                                )}

                                {/* <div className="flex flex-col mb-4 mx-12 text-white">
                                    <PoxTable title='Pox Explorer' data={stacksData.pox} />
                                </div>

                                <div className="flex flex-col mb-4 mx-12 text-white">
                                    <PoxMinersTable title='Pox Miners' data={stacksData.poxMiners} />
                                </div>

                                <div className="flex flex-col mb-4 mx-12 text-white">
                                    <VRFKeyTable title='VRF Key' data={stacksData.VRFKey} />
                                </div>

                                <div className="flex flex-col mb-4 mx-12 text-white">
                                    <OpsTable title='Ops' data={stacksData.ops} />
                                </div>

                                <div className="flex flex-col mb-6 mx-16 text-white">
                                    <SpendingChart data={stacksData.poxSubCycles} key="height" legend="Height" title="Stacking Cycles" range={[0, 4]} />
                                </div> */}
                            </>
                        )
                    }
                </div>

                {
                    modalOpened && <InfoModal data={info} onClose={() => handleClose()}>
                        {
                            info?.type === 'address' ? <AddressInfo title="Address Information" data={info?.['ok']} />
                                // : <TransactionInfo title="Transaction Information" data={info?.['ok'] && info?.['ok'][0] !== 'Invalid hex string' && JSON.parse(info?.['ok'][0])} />
                                : <TransactionInfo title="Transaction Information" data={info?.['ok']} />
                        }
                    </InfoModal>
                }

                <OpenChat />

                {
                    whaleOpened && (
                        <WhaleHunting onSelect={(id: string) => handleGetInfo('address', id)} onClose={() => setWhaleOpened(false)} />
                    )
                }
            </div>
        </Layout >
    )
}

export default Icp