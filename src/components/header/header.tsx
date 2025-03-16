import React, { FormEvent, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './header-styles.module.scss'
import { Button as Button2, TextField } from '@mui/material'
import { ConnectButton } from "thirdweb/react"
import SelectNetwork from '../select-network/select-network'
// import { useActiveAccount, useWalletBalance } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"
import { inAppWallet, createWallet, Wallet } from "thirdweb/wallets"
import { useWalletStore } from '@/store/wallet'
import RangoService from '@/lib/api/services/rango'

const wallets = [
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

type Props = {
  onSubmit: (type: string, value: string) => void
}

const Header: React.FC<Props> = ({ onSubmit }: Props) => {
  const currentPath = usePathname()
  const [values, setValues] = useState({
    address: '',
    addressError: '',
    transaction: '',
    transactionError: ''
  })

  const handleConnect = async (wallet: Wallet) => {
    const address = `${wallet.id}:${(wallet.getAccount())?.address}`
    const token = await RangoService.auth(address)

    useWalletStore.setState({ wallet: address })
    useWalletStore.setState({ token })
  }

  const handleDisconnect = () => {
    useWalletStore.setState({ wallet: null })
    useWalletStore.setState({ token: null })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>, type: 'address' | 'transaction') => {
    e.preventDefault()
    onSubmit(type, values[type])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target
    if (value) {
      setValues({ ...values, [id]: value })
    }
    else {
      setValues({ ...values, [`${id}Error`]: 'error' })
    }
  }

  return (
    <div className={styles.header}>
      {
        currentPath.includes("pano-view/bitcoin") && (
          <>
            <form id='form-address' onSubmit={(e) => handleSubmit(e, 'address')}>
              <TextField
                required
                className={styles.textField}
                id="address"
                variant="outlined"
                placeholder="Address"
                size="small"
                onChange={handleChange}
              />
              <Button2 className={styles.button} type='submit'>Get address info</Button2>
            </form>

            <form id='form-transaction' onSubmit={(e) => handleSubmit(e, 'transaction')}>
              <TextField
                required
                className={styles.textField}
                id="transaction"
                variant="outlined"
                placeholder="Transaction"
                size="small"
                onChange={handleChange}
              />
              <Button2 className={styles.button} type='submit'>Get transaction info</Button2>
            </form>
          </>
        )
      }

      <div className="ml-auto">
        <SelectNetwork />
      </div>

      <ConnectButton client={client} wallets={wallets} onConnect={handleConnect} onDisconnect={handleDisconnect} />

      {/* {account && balance ? (
        <div>
          <p>Wallet address: {account.address}</p>
          <p>
            Wallet balance: {balance?.displayValue} {balance?.symbol}
          </p>
        </div>
      ) : (
        <ConnectButton client={client} wallets={wallets} />
        // <ConnectButton className='bg-[#3CDFEF46] text-zinc-100 cursor-not-allowed' client={client} />
      )} */}
    </div>
  )
}

export default Header