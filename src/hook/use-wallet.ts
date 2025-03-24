import { createThirdwebClient } from "thirdweb"
import { inAppWallet, createWallet, Wallet } from "thirdweb/wallets"
import { useWalletStore } from '@/store/wallet'
import RangoService from '@/lib/api/services/rango'
import { useActiveWalletConnectionStatus } from "thirdweb/react"
import { useEffect } from "react"
import { useActiveWallet } from "thirdweb/react"

export const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "email",
        "x",
        "passkey",
        "coinbase",
        "github",
        "discord",
        "telegram",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("app.phantom"),
  createWallet("org.uniswap"),
  createWallet("com.ledger"),
  createWallet("io.rabby"),
  createWallet("me.rainbow"),
  createWallet("app.onto"),
  createWallet("global.safe"),
  createWallet("com.trustwallet.app"),
  createWallet("xyz.argent"),
  createWallet("co.family.wallet"),
  createWallet("com.roninchain.wallet"),
  createWallet("app.keplr"),
  createWallet("com.brave.wallet"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.exodus"),
]

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
  secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY as string
})

export const useWallet = () => {
  const activeWallet = useActiveWallet()
  const wallet = useWalletStore(state => state.wallet)
  const setLoading = useWalletStore(state => state.setLoading)
  const setWallet = useWalletStore(state => state.setWallet)
  const setToken = useWalletStore(state => state.setToken)
  const connectionStatus = useActiveWalletConnectionStatus()

  const handleConnect = async (wallet: Wallet) => {
    const address = `${wallet.id}:${(wallet.getAccount())?.address}`
    const token = await RangoService.auth(address)

    setWallet(address)
    setToken(token)
  }

  useEffect(() => {
    if (connectionStatus === "connecting" || connectionStatus === "unknown") {
      setLoading(true)
    }
    else {
      setLoading(false)
    }
  }, [connectionStatus])

  useEffect(() => {
    if (connectionStatus === 'connected' && activeWallet) {
      handleConnect(activeWallet)
    }
  }, [connectionStatus, activeWallet])

  const handleDisconnect = () => {
    setWallet(null)
    setToken(null)
  }

  return {
    wallet,
    connectionStatus,
    handleConnect,
    handleDisconnect
  }
}