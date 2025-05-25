import axios from "axios"
import suzakoJSON from '../data/suzako.json'

const BASE_URL = process.env.NEXT_PUBLIC_SUZAKO_SERVICE_URL ?? "http://localhost:5000"

export interface Token {
  id: string
  name: string
  symbol: string
  decimals: number
}

const SuzakoService = {
  getTokens: async (): Promise<Token[]> => {
    try {
      if (!suzakoJSON.data?.tokens) {
        console.error('No tokens found in suzakoJSON')
        return []
      }
      return suzakoJSON.data.tokens
    } catch (error) {
      console.error("Error fetching token data:", error)
      return []
    }
  },
  getProtocolInfo: async () => {
    try {
      return suzakoJSON.data.protocols[0]
    } catch (error) {
      console.error("Error fetching protocol info:", error)
      return null
    }
  }
}

export default SuzakoService