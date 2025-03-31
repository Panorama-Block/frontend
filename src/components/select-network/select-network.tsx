import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import styles from './select-network.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { Tooltip } from '@mui/material'

type Network = {
    id: number
    title: string
    icon: string
    url: string
    disabled?: boolean
    items?: Network[]
}

const networks: Network[] = [
    {
        id: 1,
        title: 'Bitcoin',
        icon: '/coins/bitcoin.png',
        url: '/pano-view/bitcoin'
    },
    {
        id: 2,
        title: 'Ethereum',
        icon: '/coins/eth.png',
        disabled: true,
        url: '/pano-view/ethereum'
    },
    {
        id: 3,
        title: 'ICP',
        icon: '/coins/icp.png',
        url: '/pano-view/icp'
        // items: [
        //     {
        //         id: 31,
        //         title: "ICP",
        //         icon: '/coins/icp.png',
        //         url: '/pano-view/icp'
        //     },
        //     {
        //         id: 32,
        //         title: 'CkBTC',
        //         icon: '/coins/bitcoin.png',
        //         url: '/pano-view/ckbtc'
        //     }
        // ],
    },
    {
        id: 4,
        title: 'Solana',
        icon: '/coins/solana.png',
        url: '/pano-view/solana'
    },
    {
        id: 5,
        title: 'Stacks',
        icon: '/coins/stacks.png',
        url: '/pano-view/stacks'
    },
    {
        id: 6,
        title: 'XRPL',
        icon: '/coins/xrpl.png',
        url: '/pano-view/xrpl'
    }
]

const SelectNetwork = () => {
    const [open, setOpen] = useState(false)
    const [actualNetwork, setActualNetwork] = useState(networks)
    const [selectedTitle, setSelectedTitle] = useState('')
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const currentPath = location.pathname
        const currentNetwork = networks.find(network => currentPath.includes(network.title.toLowerCase()) || network.url === currentPath)
        if (currentNetwork) {
            setSelectedTitle(currentNetwork.title)
        }
        else {
            setSelectedTitle('Bitcoin')
        }

        networks.forEach(network => {
            if (network.items) {
                const nestedNetwork = network.items.find(item => currentPath.includes(item.title.toLowerCase()) || item.url === currentPath)
                if (nestedNetwork) {
                    setSelectedTitle(nestedNetwork.title)
                }
            }
        })
    }, [pathname])

    const handleOpen = () => {
        setActualNetwork(networks)
        setOpen(!open)
    }

    const changeNetwork = (network: Network) => {
        if (network.items) {
            setActualNetwork(network.items)
        } else {
            if (network.url === location.pathname) {
                setOpen(false)
                return
            }
            if (network.url) {
                setSelectedTitle(network.title)
                router.push(network.url)
            }
            setOpen(false)
        }
    }

    return (
        <div className='select-none ml-auto my-auto w-fit z-[1] flex relative flex-col'>
            <div className='flex align-center flex-col gap-1.5 mt-1 px-4'>
                <span className='text-xs text-zinc-400 px-4'>Select Network</span>
                <div className="pl-2 flex gap-1 mx-auto text-zinc-100 hover:cursor-pointer" onClick={() => handleOpen()}>
                    <span className='text-md'>{selectedTitle}</span>
                    {
                        open ? <ChevronUp className='my-auto' /> : <ChevronDown className='my-auto' />
                    }
                </div>
            </div>

            {
                open && (
                    <div className={`${styles.network} select-none z-[1] grid grid-cols-2 gap-4 p-8 justify-start rounded-lg w-[300px] absolute top-16 right-[-100px]`}>
                        {
                            actualNetwork && actualNetwork.map((network: Network) => (
                                <Tooltip title={network.disabled ? 'Coming Soon' : ''} placement="right-start" key={network.id}>
                                    <div
                                        className={`flex gap-2 items-center w-[50%] h-8 m-0 ${network.disabled ? 'cursor-not-allowed opacity-75' : 'hover:cursor-pointer'}`}
                                        onClick={() => !network.disabled && changeNetwork(network)}
                                    >
                                        <img className='w-6 h-6' src={network.icon} alt="" />
                                        <span className='text-zinc-200'>{network.title}</span>
                                    </div>
                                </Tooltip>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SelectNetwork