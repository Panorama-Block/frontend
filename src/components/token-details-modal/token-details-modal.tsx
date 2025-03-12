'use client'

import React from 'react'
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styles from './styles.module.scss'

interface Asset {
  blockchain: string;
  symbol: string;
  address: string;
}

interface Amount {
  amount: string;
  decimals: number;
}

interface Token {
  asset: Asset;
  amount: Amount;
  price: number;
}

interface TokenDetailsModalProps {
  open: boolean;
  onClose: () => void;
  address: string;
  tokens: Token[];
}

const TokenDetailsModal: React.FC<TokenDetailsModalProps> = ({
  open,
  onClose,
  address,
  tokens,
}) => {
  const formatAmount = (token: Token) => {
    const amount = parseFloat(token.amount.amount) / Math.pow(10, token.amount.decimals)
    return amount.toFixed(4)
  }

  const formatValue = (token: Token) => {
    const amount = parseFloat(token.amount.amount) / Math.pow(10, token.amount.decimals)
    return token.price ? `$${(amount * token.price).toFixed(2)}` : 'N/A'
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className={styles.dialog}
      PaperProps={{
        className: styles.paper,
      }}
      sx={{
        '& .MuiDialog-container': {
          paddingLeft: 'calc(64px + 240px)',
          paddingRight: '64px',
        },
        '& .MuiDialog-paper': {
          margin: '0 auto',
          width: '100%',
        }
      }}
    >
      <DialogTitle className={styles.title}>
        <div className={styles.titleContent}>
          <h2>{address}</h2>
          <IconButton onClick={onClose} className={styles.closeButton}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className={styles.content}>
        <div className={styles.tokenList}>
          {tokens.map((token, index) => (
            <div key={`token-${index}`} className={styles.tokenItem}>
              <div className={styles.tokenIcon}></div>
              <div className={styles.tokenInfo}>
                <h3>{token.asset.symbol}</h3>
                <div className={styles.tokenDetails}>
                  <span>{formatAmount(token)}</span>
                  <span>{formatValue(token)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TokenDetailsModal