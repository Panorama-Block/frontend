import axios from "axios"
import avaxJSON from '../data/avax.json'

const BASE_URL = process.env.NEXT_PUBLIC_AVAX_SERVICE_URL ?? "http://localhost:5000"

interface Data {
  date: string
  value: number
  transactions: number
  currentState?: boolean
}

const AvaxService = {
  getBridgeFee: async () => {
    try {
      const bridgeFeeData = avaxJSON.bridgeFee
      const response = {
        ...bridgeFeeData,
        label1: "Bridge Fee",
        label2: "Gas Fee",
        data: bridgeFeeData.data.map((data: any) => {
          return {
            date: data.date,
            value1: data.bridge_fee_usd,
            value2: data.gas_fee_usd
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getBridgeTx: async () => {
    try {
      const bridgeTx = avaxJSON.bridgeTx
      const response = {
        ...bridgeTx,
        label1: "Transactions",
        data: bridgeTx.data.map(data => {
          return {
            date: data.date,
            value1: data.tx_count
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getBridgeVol: async () => {
    try {
      const bridgeVol = avaxJSON.bridgeVol
      const response = {
        ...bridgeVol,
        label1: "Bridge Volume",
        label2: "DEX Swaps",
        data: bridgeVol.data.map(data => {
          return {
            date: data.timestamp_bridge,
            value1: data.bridge_tx_usd,
            value2: data.dex_swap_usd
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getBridgeSwap: async () => {
    try {
      const bridgeSwap = avaxJSON.bridgeSwap
      const response = {
        ...bridgeSwap,
        label1: "Bridge Swap",
        data: bridgeSwap.data.map(data => {
          return {
            date: data.block_number,
            value1: data.block_number,
            value2: data.swap_tx_hash
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getBridgeDailyVol: async () => {
    try {
      const bridgeDailyVol = avaxJSON.bridgeDailyVol
      const response = {
        ...bridgeDailyVol,
        label1: "Bridge Daily Volume",
        data: bridgeDailyVol.data.map(data => {
          return {
            date: data.date,
            value1: data.value_raw,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getBridgeSubnet: async () => {
    try {
      const bridgeSubnet = avaxJSON.bridgeSubnet
      const response = {
        ...bridgeSubnet,
        label: "Bridge Subnet",
        label1: "Bridge Volume USD",
        data: bridgeSubnet.data.map(data => {
          return {
            date: data.chain,
            value1: data.volume_usd,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getDexTvl: async () => {
    try {
      const dexTvl = avaxJSON.dexTvl
      const response = {
        ...dexTvl,
        label: "DEX Name",
        label1: "DEX TVL",
        data: dexTvl.data.map(data => {
          return {
            date: data.dex_name,
            value1: data.tvl_usd,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getDexVolume: async () => {
    try {
      const dexVolume = avaxJSON.dexVol
      const response = {
        ...dexVolume,
        label: "DEX Name",
        label1: "DEX Volume",
        data: dexVolume.data.map((data: any) => {
          return {
            date: data.dex_name,
            value1: data.total_volume_usd,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getDexFeeRatio: async () => {
    try {
      const dexFee = avaxJSON.dexFee
      const response = {
        ...dexFee,
        label: "DEX Name",
        label1: "DEX Fee / Volume",
        data: dexFee.data.map((data: any) => {
          return {
            date: data.dex_name,
            value1: data.fee_to_volume_ratio,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getDexStable: async () => {
    try {
      const dexStable = avaxJSON.dexStable
      const response = {
        ...dexStable,
        label: "DEX Name",
        label1: "Amount USD",
        data: dexStable.data.map((data: any) => {
          return {
            date: data.dex_name,
            value1: data.amount_usd,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getDexWhaleShare: async () => {
    try {
      const dexWhaleShare = avaxJSON.dexWhaleShare
      const response = {
        ...dexWhaleShare,
        label: "DEX Name",
        label1: "Amount USD",
        data: dexWhaleShare.data.map((data: any) => {
          return {
            date: data.dex_name,
            value1: data.amount_usd,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getGasUsed: async () => {
    try {
      const gasUsed = avaxJSON.gasUsed
      const response = {
        ...gasUsed,
        label: "Time",
        label1: "Gas Used",
        data: gasUsed.data.map((data: any) => {
          return {
            date: data.date,
            value1: data.gas_used,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getGasCost: async () => {
    try {
      const gasCost = avaxJSON.gasCost
      const response = {
        ...gasCost,
        label: "Time",
        label1: "Gas Cost",
        data: gasCost.data.map((data: any) => {
          return {
            date: data.date,
            value1: data.value_usd,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  },
  getGasPrice: async () => {
    try {
      const gasPrice = avaxJSON.gasPrice
      const response = {
        ...gasPrice,
        label: "Chain ID",
        label1: "Gas Price",
        data: gasPrice.data.map((data: any) => {
          return {
            date: data.chain_id,
            value1: data.gas_price_avg,
          }
        })
      }
      return response
    }
    catch (error) {
      return error
    }
  }
}

export default AvaxService