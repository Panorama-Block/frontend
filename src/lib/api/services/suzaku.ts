import axios from "axios"
import suzakuJSON from '../data/suzaku.json'

const BASE_URL = process.env.NEXT_PUBLIC_SUZAKU_SERVICE_URL ?? "http://localhost:5000"

export interface Token {
  id: string
  name: string
  symbol: string
  decimals: number
}

const SuzakuService = {
  getTokens: async (): Promise<Token[]> => {
    try {
      if (!suzakuJSON.data?.tokens) {
        console.error('No tokens found in suzakuJSON')
        return []
      }
      return suzakuJSON.data.tokens
    } catch (error) {
      console.error("Error fetching token data:", error)
      return []
    }
  },
  getProtocolInfo: async () => {
    try {
      return suzakuJSON.data.protocols[0]
    } catch (error) {
      console.error("Error fetching protocol info:", error)
      return null
    }
  }
}

export default SuzakuService