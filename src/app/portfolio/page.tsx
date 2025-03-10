'use client'

import React, { useState } from 'react'
import { Tooltip } from '@mui/material'
import Layout from '@/components/layout/Layout'
import OpenChat from '@/components/open-chat/open-chat'
import styles from './styles.module.scss'

const Page: React.FC = () => {
  const [actual, setActual] = useState("Bitcoin")
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
          <h1 className="text-2xl font-bold mb-6">Portfolio Overview</h1>
          <div className="space-y-6">
            <p className="text-gray-200 leading-relaxed">
            The portfolio section will display the user’s position and balance within the Panorama Block ecosystem, reflecting their holdings in USD and/or PANBLK tokens. It will feature a dashboard showing the user’s position across different bots or AI agents they have interacted with in the ecosystem, as well as their transfer balance and wallet positions.
            </p>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-300">
                For more details, please visit our{" "}
                <a href="https://panoramablock.com/#roadmap" className="text-[#3CDFEF] hover:text-[#3CDFEF]/80 transition-colors">
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

      <OpenChat />
    </Layout>
  )
}

export default Page
