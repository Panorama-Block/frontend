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
          <h1 className="text-2xl font-bold mb-6">Zico Agent - Comming Soon</h1>
          <div className="space-y-6">
            <iframe className='w-full h-[60vh]' src="https://www.youtube.com/embed/2kaWxe57gpo" allowFullScreen />
          </div>
        </div>
      </div>
      {/* </div> */}

      <OpenChat />
    </Layout>
  )
}

export default Page
