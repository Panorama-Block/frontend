import React from 'react'
import { useRouter } from "next/navigation"
import styles from './menu-items-styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Tooltip } from '@mui/material'

type Item = {
  title: string
  icon: string
  url: string
  disabled?: boolean
}

type Props = {
  active?: string
  panelActive?: string
  title?: string
  items: Item[]
  action?: (type: string, value: string) => void
}

const MenuItems: React.FC<Props> = ({ active, panelActive, title, items, action }: Props) => {
  const router = useRouter()

  return (
    <div className={styles.menu}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {
        items && items.map((item: Item, index: number) => {
          return (
            <div className={`${styles.item} ${active === item.title && styles.active || item.title === panelActive && styles.active2} ${item.disabled && styles.disabled}`} onClick={() => (!item.disabled || item.title === "Logout") ? router.push("/") : router.push(item.url)} key={index}>
              <div className={styles.icon}>
                <img src={item.icon} alt="" />
              </div>
              {item.disabled ? (
                <Tooltip title="Coming Soon" placement="right-start">
                  <p className={title && styles.user}>{item.title}</p>
                </Tooltip>
              )
                : <p className={title && styles.user}>{item.title}</p>
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default MenuItems