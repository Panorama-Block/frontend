'use client'

import Video from 'next-video'
import video from '/videos/video.mp4'

import styles from './styles.module.scss'
import { Mail } from 'lucide-react'
import { IconBrandLinktree } from '@tabler/icons-react'

const Page = () => {
  return (
    <div className={styles.home}>
      <div className='flex flex-col gap-8 p-4 text-white max-w-4xl mx-auto'>
        <section>
          <h2 className='text-2xl font-bold mb-6'>Panorama Block being presented at the Crypto Valley Conference Startup Competition</h2>
          <Video
            src={video}
            controls
            className="w-full aspect-video"
          />
        </section>
        <section>
          <h2 className='text-2xl font-bold mb-6'>Pitch Deck</h2>
          <iframe
            className="w-full h-screen"
            src="/dossier/Panorama-Block_CVC25.pdf"
          />
        </section>
        <section>
          <h2 className='text-2xl font-bold mb-6'>One Pager</h2>
          <iframe
            className="w-full h-screen"
            src="/dossier/Panorama-Block-One-sheet.pdf"
          />
        </section>
        <section className="flex justify-center gap-8 py-8">
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
