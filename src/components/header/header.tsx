import React, { FormEvent, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './header-styles.module.scss'
import { Button as Button2, TextField } from '@mui/material'
import { ConnectButton } from "thirdweb/react"
import SelectNetwork from '../select-network/select-network'
import { useWallet } from '@/hook/use-wallet'
import { wallets, client } from '@/hook/use-wallet'

type Props = {
  onSubmit: (type: string, value: string) => void
}

const Header: React.FC<Props> = ({ onSubmit }: Props) => {
  const { handleConnect, handleDisconnect } = useWallet()
  const currentPath = usePathname()
  const [values, setValues] = useState({
    address: '',
    addressError: '',
    transaction: '',
    transactionError: ''
  })

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
    <header className={styles.header}>
      <div className={styles.content}>
        {currentPath.includes("pano-view/bitcoin") && (
          <div className={styles.forms}>
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
          </div>
        )}

        <div className={styles.actions}>
          <SelectNetwork />
          <ConnectButton client={client} wallets={wallets} onConnect={handleConnect} onDisconnect={handleDisconnect} />
        </div>
      </div>
    </header>
  )
}

export default Header