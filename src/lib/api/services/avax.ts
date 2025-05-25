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
  }
}

export default AvaxService