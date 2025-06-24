'use client'

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const Hero = () => {
  const words = [
    'On-Chain Data',
    'AI Agents',
    'DeFi Opportunities',
    'Yield Strategies',
    'Agentic Economy',
    'Decentralized Analytics',
  ]

  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2200)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className="relative flex flex-col items-center justify-center h-full mt-32">
      <h1 className="text-5xl md:text-6xl text-landing-title w-full md:w-[1200px] mx-auto px-4 md:px-0">
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
      <span className="text-landing-text text-xl mx-auto text-center max-w-[600px]">
        Fusing multi-chain data pipelines with AI reasoning frameworks to empower decentralized, composable financial automation.
      </span>

      <Button variant="secondary" className="mt-8 rounded-[25px]">
        Launch App
      </Button>
    </div>
  )
}

export default Hero
