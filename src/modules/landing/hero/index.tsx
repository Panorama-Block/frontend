'use client'

import { useEffect, useState } from "react"

import { ConnectButton } from 'thirdweb/react'
import { wallets, client, useWallet } from '@/hook/use-wallet'
import { useRouter } from 'next/navigation'
import { useActiveWallet } from 'thirdweb/react'
import { Button } from '@/components/ui/button'

const Hero = () => {
  const router = useRouter()
  const wallet = useActiveWallet()
  const { connectionStatus } = useWallet()
  const [disconnecting, setDisconnecting] = useState(false)
  const [currentWord, setCurrentWord] = useState(0)

  const words = [
    'On-Chain Data',
    'AI Agents',
    'DeFi Opportunities',
    'Yield Strategies',
    'Agentic Economy',
    'Decentralized Analytics',
  ]

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      setDisconnecting(true)
    }

    if (connectionStatus === 'connected' && !disconnecting) {
      setDisconnecting(true)
      wallet?.disconnect()
    }
  }, [disconnecting, connectionStatus, wallet])

  const handleConnect = async () => {
    if (disconnecting) {
      router.push('/pano-view/avax')
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2200)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className="relative flex flex-col items-center justify-center h-full mt-32">
      <h1 className="text-5xl md:text-6xl text-landing-title w-[90%] md:w-full md:max-w-[1200px] mx-auto px-4 md:px-0">
        <span className="flex flex-col items-center gap-5 text-center">
          A Panoramic View of
          <span className="inline-block h-[1.2em]">
            <span
              key={words[currentWord]}
              className="inline-block animate-slideUpIn text-landing-highlight"
            >
              {words[currentWord]}
            </span>
          </span>
          <div className="flex mx-auto w-fit h-12 mt-6 md:mt-10">
          </div>
        </span>
      </h1>
      <span className="mb-8 text-landing-text text-xl mx-auto text-center w-[90%] md:max-w-[600px]">
        Fusing multi-chain data pipelines with AI reasoning frameworks to empower decentralized, composable financial automation.
      </span>

      <ConnectButton
        client={client}
        wallets={wallets}
        onConnect={handleConnect}
        detailsButton={{
          render: () => (
            <Button
              variant="default"
              className="rounded-[25px] hover:bg-gray-100"
            >
              Going to dashboard...
            </Button>
          )
        }}
        connectButton={{
          label: "Launch App",
          className: "rounded-[25px] hover:bg-gray-100"
        }}
      />

    </div>
  )
}

export default Hero
