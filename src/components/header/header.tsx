import React, { FormEvent, useState } from 'react'
import {usePathname} from 'next/navigation'
import styles from './header-styles.module.scss'
import { Button as Button2, TextField, Tooltip } from '@mui/material'
import { Button } from '@/components/ui/button'
import SelectNetwork from '../select-network/select-network'

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
        currentPath.includes("pano-view") && (
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

      <Tooltip title="Coming Soon" placement="bottom">
      <Button variant="outline" className='hover:cursor-not-allowed bg-[#3CDFEF46]'>Connect your wallet</Button>
      </Tooltip>
    </div>
  )
}

export default Header