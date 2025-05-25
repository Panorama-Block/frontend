import axios from "axios"

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
      const response = await axios.get(`${BASE_URL}/api/live/suzaku`)
      if (!response.data?.tokens) {
        console.error('No tokens found in response')
        return []
      }
      return response.data.tokens
    } catch (error) {
      console.error("Error fetching token data:", error)
      return []
    }
  }
}

export default SuzakuService