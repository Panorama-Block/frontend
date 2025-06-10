import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_X_SERVICE_URL

const XService = {
  getTweets: async (page: number = 1, limit: number = 20) => {
    try {
      const response = await axios.get(`${BASE_URL}/tweets`, {
        params: {
          page,
          limit
        }
      })
      return response.data
    }
    catch (error) {
      return error
    }
  },
  getZicoTweets: async (page: number = 1, limit: number = 20) => {
    try {
      const response = await axios.get(`${BASE_URL}/tweets/zico`, {
        params: {
          page,
          limit
        }
      })
      return response.data
    }
    catch (error) {
      return error
    }
  },
  getAvaxTweets: async (page: number = 1, limit: number = 20) => {
    try {
      const response = await axios.get(`${BASE_URL}/tweets/avax`, {
        params: {
          page,
          limit
        }
      })
      return response.data
    }
    catch (error) {
      return error
    }
  }
}

export default XService