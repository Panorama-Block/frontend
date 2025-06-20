'use client'

import { useState } from 'react'

import { IconBrandLinktree } from '@tabler/icons-react'
import { DownloadIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'
import Video from 'next-video'

import styles from './styles.module.scss'

import video from '/videos/video.mp4'

import EmailModal from '@/modules/dossier/components/email-modal'
import PDFViewer from '@/modules/dossier/components/pdf-viewer'

const Page = () => {
  const [showContent, setShowContent] = useState(true)

  const handleEmailSubmit = async (email: string) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      if (data.alreadyRegistered || data.message === 'Email registered successfully') {
        setShowContent(true)
        return
      }

      setShowContent(true)
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }

  if (!showContent) {
    return <EmailModal onSubmit={handleEmailSubmit} />
  }

  return (
    <div className={styles.home}>
      <div className='flex flex-col gap-8 p-8 md:p-4 text-white md:max-w-4xl mx-auto'>
        <section>
          <img src="/dossier/header.png" alt="Panorama Block Header" className='w-full rounded-lg' />
          <h1 className='text-2xl md:text-4xl font-bold mt-8 mb-6'>Welcome to Panorama Block!</h1>
          <div className='flex flex-col gap-4'>
            <p>Panorama Block is a forward-thinking initiative developed in collaboration with UCLA's Master of Quantitative Economics program and other leading global universities.</p>
            <p>Our mission is to develop composable AI agents that address cross-chain fragmentation, streamline AI integration, and accelerate the onboarding of the next billion users into decentralized finance (DeFi).</p>
            <p>Below you’ll find a compilation of our materials: a video presentation of Panorama, a fundraising-focused pitch deck, and a one-pager outlining our vision. You can also download the files and explore our Linktree for more details.</p>
          </div>
        </section>
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-6'>Panorama Block being presented at the Crypto Valley Conference Startup Competition</h2>
          <Video
            src={video}
            controls
            className="w-full aspect-video rounded-lg"
          />
          <div className="flex flex-col md:flex-row justify-center gap-8 py-8">
            <a
              href="https://twitter.com/panorama_block"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors"
            >
              <TwitterIcon />
              panorama_block
            </a>
            <a
              href="https://linkedin.com/company/panoramablock"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors"
            >
              <LinkedinIcon />
              Panorama Block
            </a>
          </div>
        </section>
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-6'>Fundraising pitch deck with round details</h2>
          <PDFViewer file="/dossier/Panorama-Block_CVC25.pdf" />
          <a href="/dossier/Panorama-Block_CVC25.pdf" download className="mx-auto flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors">
            <DownloadIcon />
            Download to Explore More
          </a>
        </section>
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-6'>High-level summary of our vision, products, revenue lines, allocation, and investment rounds</h2>
          <PDFViewer file="/dossier/Panorama-Block-One-sheet.pdf" />
          <a href="/dossier/Panorama-Block-One-sheet.pdf" download className="mx-auto flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors">
            <DownloadIcon />
            Download to Explore More
          </a>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className='text-xl md:text-2xl font-bold mb-6'>Dive deeper: technical specs and financial docs available here</h2>
          <a
            href="https://linktr.ee/panoramablock"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors"
          >
            <IconBrandLinktree />
            linktr.ee/panoramablock
          </a>
        </section>
      </div>
    </div>
  )
}

export default Page
