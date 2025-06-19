'use client'

import Video from 'next-video'
import video from '/videos/video.mp4'

import styles from './styles.module.scss'
import { Mail } from 'lucide-react'
import { IconBrandLinktree } from '@tabler/icons-react'

const Page = () => {
  return (
    <div className={styles.home}>
      <div className='flex flex-col gap-8 p-8 md:p-4 text-white md:max-w-4xl mx-auto'>
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-6'>Panorama Block being presented at the Crypto Valley Conference Startup Competition</h2>
          <Video
            src={video}
            controls
            className="w-full aspect-video rounded-lg"
          />
        </section>
        <section>
          <h2 className='text-xl md:text-2xl font-bold mb-6'>Pitch Deck</h2>
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
          <h2 className='text-xl md:text-2xl font-bold mb-6'>One Pager</h2>
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
