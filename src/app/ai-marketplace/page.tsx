'use client'

import React, { useState } from 'react'
import { Tooltip } from '@mui/material'
import Layout from '@/components/layout/Layout'
import OpenChat from '@/components/open-chat/open-chat'
import styles from './styles.module.scss'

const Page: React.FC = () => {
  const [actual, setActual] = useState("Solana")
  const [chatOpened, setChatOpened] = useState(false)

  return (
    <Layout
      sidebar={{
        actual,
        onChange: (coin: string) => setActual(coin),
        open: () => void 0,
      }}
      header={{
        onSubmit: () => { },
      }}
    >
      <div className={styles.home}>
        <div className="flex flex-col gap-8 p-8 text-white max-w-4xl mx-auto">
          {/* <div className="bg-gradient-to-r from-[#17707812] via-[#12606750] to-[#0c4b51] p-8 rounded-lg backdrop-blur-md"> */}
          <h1 className="text-2xl font-bold mb-6">AI Marketplace Overview</h1>
          <div className="space-y-6">
            <p className="text-gray-200 leading-relaxed">
              The AI Marketplace is an upcoming ecosystem where developers can deploy and monetize AI agents for trading, risk management, and automated DeFi execution. Institutional users will access specialized models and analytics tools for blockchain applications.
            </p>
            <p className="text-gray-200 leading-relaxed">

              Powered by the PANBLK token, the marketplace will ensure secure transactions, governance, and staking mechanisms that validate the quality and integrity of AI models and data. The goal is to simplify the deployment and monetization of AI tools for blockchain automation and analytics.
            </p>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-300">
                For more details, please visit our{" "}
                <a href="https://panoramablock.com" className="text-[#3CDFEF] hover:text-[#3CDFEF]/80 transition-colors">
                  Roadmap & Vision section
                </a>{" "}
                and our{" "}
                <a href="https://docs.panoramablock.com/our-verticals/ai-marketplace " className="text-[#3CDFEF] hover:text-[#3CDFEF]/80 transition-colors">
                  Whitepaper
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {chatOpened ? (
        <OpenChat onClose={() => setChatOpened(false)} />
      ) : (
        <div className="fixed bottom-8 right-8">
          <Tooltip title="Chat with AI" placement="left">
            <div className={styles.chatButton} onClick={() => setChatOpened(true)} />
          </Tooltip>
        </div>
      )}
    </Layout>
  )
}

export default Page
