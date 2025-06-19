'use client'

import { useState } from 'react'

import styles from './styles.module.scss'

import Video from 'next-video'
import video from '/videos/video.mp4'

import { Mail } from 'lucide-react'
import { IconBrandLinktree } from '@tabler/icons-react'

import { EmailModal } from '@/components/email-modal'

const Page = () => {
  const [showContent, setShowContent] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email)
    setShowContent(true)
  }

  if (!showContent) {
    return <EmailModal onSubmit={handleEmailSubmit} />
  }

  return (
    <div className={styles.home}>
      <div className='flex flex-col gap-8 p-8 md:p-4 text-white md:max-w-4xl mx-auto'>
        <section>
          <h1 className='text-2xl md:text-4xl font-bold mb-6'>Welcome to Panorama Block!</h1>
          <div className='flex flex-col gap-4'>
            <p>Panorama Block is a forward-thinking initiative developed in collaboration with UCLA’s Master of Quantitative Economics program and other leading global universiti  es.</p>
            <p>Our mission is to develop composable AI agents that address cross-chain fragmentation, streamline AI integration, and accelerate the onboarding of the next billion users into decentralized finance (DeFi).</p>
          </div>
        </section>
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-6'>Panorama Block being presented at the Crypto Valley Conference Startup Competition</h2>
          <Video
            src={video}
            controls
            className="w-full aspect-video rounded-lg"
          />
        </section>
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-6'>Fundraising pitch deck with round details</h2>
          <div className="w-full max-h-[500px] md:max-h-[700px] relative">
            <iframe
              id="pitchDeckFrame"
              className="w-full h-full rounded-lg"
              src="/dossier/Panorama-Block_CVC25.pdf"
              style={{ minHeight: '500px' }}
              onLoad={(e) => {
                const frame = e.target as HTMLIFrameElement;
                const images = frame.contentDocument?.getElementsByTagName("img");
                if (images) {
                  Array.from(images).forEach(img => {
                    img.style.width = "100%";
                  });
                }
              }}
            />
          </div>
        </section>
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-6'>High-level summary of our vision, products, revenue lines, allocation, and investment rounds</h2>
          <div className="w-full max-h-[500px] md:max-h-[700px] relative">
            <iframe
              id="onePagerFrame"
              className="w-full h-full rounded-lg"
              src="/dossier/Panorama-Block-One-sheet.pdf"
              style={{ minHeight: '500px' }}
              onLoad={(e) => {
                const frame = e.target as HTMLIFrameElement;
                const trySetWidth = () => {
                  const images = frame.contentDocument?.getElementsByTagName("img");
                  if (images && images.length > 0) {
                    Array.from(images).forEach(img => {
                      img.style.width = "100%";
                    });
                  } else {
                    setTimeout(trySetWidth, 100);
                  }
                };
                trySetWidth();
              }}
            />
          </div>
        </section>
        <section className="flex flex-col md:flex-row justify-center gap-8 py-8">
          <a
            href="mailto:info@panoramablock.com"
            className="flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors"
          >
            <Mail />
            info@panoramablock.com
          </a>
          <a
            href="https://linktr.ee/panoramablock"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-lg hover:text-cyan-400 transition-colors"
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
