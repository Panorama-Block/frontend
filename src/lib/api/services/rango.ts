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
  auth: async (address: string): Promise<string> => {
    try {
      const response = await axios.post<{ token: string }>(`${BASE_URL}/api/auth/login`, {
        "wallet_address": address
      })
      return response.data.token
    }
    catch (error) {
      console.log(error)
      throw new Error('Failed to authenticate wallet')
    }
  },
  getAddresses: async (token: string): Promise<string[]> => {
    try {
      const response = await axios.get<string[]>(`${BASE_URL}/api/wallets/addresses`, {
        headers: {
          'Authorization': token
        }
      })
      return response.data
    }
    catch (error) {
      console.log(error)
      throw new Error('Failed to fetch addresses')
    }
  },
  getTokens: async (address: string, token: string): Promise<Token[]> => {
    try {
      const response = await axios.get<Token[]>(`${BASE_URL}/api/wallets/tokens?address=${address}`, {
        headers: {
          'Authorization': token
        }
      })
      return response.data
    }
    catch (error) {
      console.log(error)
      throw new Error('Failed to fetch tokens')
    }
  },
  storeAddress: async (address: string, token: string): Promise<WalletDetails[]> => {
    try {
      const response = await axios.get<WalletDetails[]>(`${BASE_URL}/api/wallets/details?address=${address}`, {
        headers: {
          'Authorization': token
        }
      })
      return response.data
    }
    catch (error) {
      console.log(error)
      throw new Error('Failed to fetch wallet details')
    }
  },
}

export default RangoService