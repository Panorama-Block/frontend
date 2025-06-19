'use client'

import Video from 'next-video'
import video from '/videos/video.mp4'

import styles from './styles.module.scss'

const Page = () => {
  return (
    <div className={styles.home}>
      <div className='flex flex-col gap-8 p-4 text-white max-w-4xl mx-auto'>
        <section>
          <Video
            src={video}
            controls
            className="w-full aspect-video"
          />
        </section>
        <section>
          <iframe
            className="w-full h-screen"
            src="/dossier/Panorama-Block_CVC25.pdf"
          />
        </section>
        <section>
          <iframe
            className="w-full h-screen"
            src="/dossier/Panorama-Block-One-sheet.pdf"
          />
        </section>
      </div>
    </div>
  )
}

export default Page
