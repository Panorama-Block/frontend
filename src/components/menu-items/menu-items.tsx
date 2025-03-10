import React from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import styles from './menu-items-styles.module.scss'
import { Tooltip } from '@mui/material'

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

const MenuItems: React.FC<Props> = ({
  active,
  panelActive,
  title,
  items,
  action,
}: Props) => {
  const pathname = usePathname().split('/')[1]
  const router = useRouter()

  const getActive = () => {
    let activeItem

    switch (pathname) {
      case 'pano-view':
        activeItem = 'Pano View'
        break
      case 'ai-marketplace':
        activeItem = 'AI Marketplace'
        break
      case 'defi-vista':
        activeItem = 'DeFi Vista'
        break
      case 'liquid-swap':
        activeItem = 'Liquid Swap'
        break
      case 'x-ai-agents':
        activeItem = 'X AI Agents'
        break
      case 'wallet-tracking':
        activeItem = 'Wallet Tracking'
        break
      case 'portfolio':
        activeItem = 'Portfolio'
        break
      default:
        activeItem = 'Pano View'
    }

    return activeItem
  }

  return (
    <div className={styles.menu}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {items &&
        items.map((item: Item, index: number) => {
          return (
            <div
              className={`${styles.item} ${
                (getActive() === item.title && styles.active)
              } ${item.disabled && styles.disabled}`}
              onClick={() =>
                !item.disabled &&
                (item.title === 'Logout'
                  ? router.push('/')
                  : router.push(item.url))
              }
              key={index}
            >
              <div className={styles.icon}>
                <img src={item.icon} alt="" />
              </div>
              {item.disabled ? (
                <Tooltip title="Coming Soon" placement="right-start">
                  <p className={title && styles.user}>{item.title}</p>
                </Tooltip>
              ) : (
                <p className={title && styles.user}>{item.title}</p>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default MenuItems
