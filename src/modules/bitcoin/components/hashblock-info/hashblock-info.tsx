import React, { useState, useEffect } from 'react'
import styles from './hashblock-info-styles.module.scss'
import { Box, Modal, Tab, Tabs, Tooltip } from '@mui/material'
import InfoModal from "@/components/info-modal/info-modal"
import TransactionInfo from "@/components/transaction-info/transaction-info"

import { HashblockProps } from '@/components/hashblocks/hashblocks'
import { TabContext, TabPanel } from '@mui/lab'
import { customId } from '@/utils/custom-id'
import BitcoinService from '@/lib/api/services/bitcoin'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
  data: HashblockProps
  onClose: () => void
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxWidth: '50%',
  minHeight: 450,
  bgcolor: '#0C1541',
  border: '0',
  borderRadius: '4px',
  boxShadow: 24,
  outline: 'none'
}

const labels = ["Info", "Transactions"]

const HashblockInfo: React.FC<Props> = ({ data, onClose }: Props) => {
  const [value, setValue] = React.useState('0')
  const [modalOpened, setModalOpened] = useState(false)
  const [info, setInfo] = useState<any>()
  const [transactionIds, setTransactionIds] = useState<string[]>([])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleTransaction = async (value: string) => {
    setModalOpened(true)

    const response: any = await BitcoinService.getTransactionInfo(value)

    if (response.data) {
      const data = {
        ok: response.data,
        type: 'transaction',
      }

      setInfo(data)
    } else {
      setInfo({ error: 'fail' })
    }
  }

  const handleClose = () => {
    setInfo(null)
    setModalOpened(false)
  }

  useEffect(() => {
    const fetchTransactionIds = async () => {
      const response = await BitcoinService.getTransactionIds(data.id)

      if (response?.data && response.data.length > 0) {
        setTransactionIds(response.data)
      }
    }

    if (data) {
      fetchTransactionIds()
    }
  }, [data])

  return (
    <Modal
      className={styles.modal}
      open={true}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
    >
      <Box className={styles.container} sx={style}>
        <TabContext value={value}>
          <Box sx={{ display: 'flex', height: '60px', padding: '8px', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              sx={{
                marginBottom: '4px',
                '.Mui-selected': {
                  color: `#3BEBFC !important`,
                },
              }}
              slotProps={{ indicator: { style: { background: '#3BEBFC' } } }}
              value={value}
              onChange={handleChange}
              aria-label="chart tabs"
            >
              {labels.map((label: string, index: number) => {
                return <Tab autoCapitalize='false' className={styles.tab} label={label} value={index.toString()} key={`tab - ${index}`} />
              })}
            </Tabs>
          </Box>

          <TabPanel className={styles.panel} sx={{ display: value === '0' ? 'flex' : 'none' }} value='0' key={`panel - 0`}>
            <div className={styles.row}>
              <div className={styles.item}>
                <span className={styles.label}>ID</span>
                <Tooltip title={data.id} placement="top">
                  <div className={styles.value}>
                    <p>{customId(data.id)}</p>
                  </div>
                </Tooltip>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>SIZE</span>
                <div className={styles.value}>
                  <p>{(Number(data.size) / 10000).toFixed(0)} KB</p>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.item}>
                <span className={styles.label}>TRANSACTIONS</span>
                <div className={styles.value}>
                  <p>{data.tx_count} TXS</p>
                </div>
              </div>

              <div className={styles.item}>
                <span className={styles.label}>Weight</span>
                <div className={styles.value}>
                  <p>{(Number(data.height) / 1000).toFixed(0)} WU</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel className={styles.panel} sx={{ display: value === '1' ? 'flex' : 'none' }} value='1' key={`panel - 1`}>
            <ScrollArea className={`${styles.row} px-[40px] h-[300px]`}>
              <div className={`grid grid-cols-2 gap-5 text-white`}>
                {
                  transactionIds && transactionIds.map((transaction, index) => {
                    return (
                      <div className={`${styles.item} cursor-pointer`} key={index} onClick={() => handleTransaction(transaction)}>
                        <span className={styles.label}>ID</span>
                        <div className={styles.value}>
                          <p>{customId(transaction)}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </ScrollArea>
          </TabPanel>
        </TabContext>

        {modalOpened && (
          <InfoModal data={info} onClose={() => handleClose()}>
            <TransactionInfo
              title="Transaction Information"
              data={info?.['ok']}
            />
          </InfoModal>
        )}
      </Box>
    </Modal>
  )
}

export default HashblockInfo