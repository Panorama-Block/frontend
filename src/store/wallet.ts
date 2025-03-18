import { create } from 'zustand'

interface WalletStore {
  wallet: string | null
  setWallet: (wallet: string | null) => void
  token: string | null
  setToken: (token: string | null) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useWalletStore = create<WalletStore>()((set) => ({
  wallet: null,
  setWallet: (wallet: string | null) => set({ wallet }),
  token: null,
  setToken: (token: string | null) => set({ token }),
  loading: true,
  setLoading: (loading: boolean) => set({ loading })
}))