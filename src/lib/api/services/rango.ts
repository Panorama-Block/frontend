import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_RANGO_BASE_URL || 'http://localhost:3000/api'

interface Token {
  asset: {
    blockchain: string
    symbol: string
    address: string
  }
  amount: {
    amount: string
    decimals: number
  }
  price: number
}

interface WalletDetails {
  id: string
  blockchain: string
  address: string
  failed: boolean
  explorerUrl: string
}

const RangoService = {
  getAddresses: async (): Promise<string[]> => {
    try {
      const response = await axios.get<string[]>(`${BASE_URL}/api/wallets/addresses`)
      return response.data
    }
    catch (error) {
      console.log(error)
      throw new Error('Failed to fetch addresses')
    }
  },
  getTokens: async (address: string): Promise<Token[]> => {
    try {
      const response = await axios.get<Token[]>(`${BASE_URL}/api/wallets/tokens?address=${address}`)
      return response.data
    }
    catch (error) {
      console.log(error)
      throw new Error('Failed to fetch tokens')
    }
  },
  storeAddress: async (address: string): Promise<WalletDetails[]> => {
    try {
      const response = await axios.get<WalletDetails[]>(`${BASE_URL}/api/wallets/details?address=${address}`)
      return response.data
    }
    catch (error) {
      console.log(error)
      throw new Error('Failed to fetch wallet details')
    }
  },
}

export default RangoService