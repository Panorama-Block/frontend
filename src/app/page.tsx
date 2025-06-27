'use client'

import { useEffect, useState } from 'react'

import { ChevronUp } from 'lucide-react'

import Verticals from '@/modules/landing/verticals'
import Partners from '@/modules/landing/partners'
import Roadmap from '@/modules/landing/roadmap'
import Header from '@/modules/landing/header'
import Banner from '@/modules/landing/banner'
import Footer from '@/modules/landing/footer'
import About from '@/modules/landing/about'
import Hero from '@/modules/landing/hero'
// import AnimatedVerticalLine from '@/components/ui/AnimatedVerticalLine'

const NewLanding = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='bg-landing min-h-screen [&_*]:font-suisse'>
      <div className="relative">
        <div className="absolute w-[1px] h-full bg-landing-borderGradient/50 left-6 md:left-10 top-0"></div>
        <div className="absolute w-[1px] h-full bg-landing-borderGradient/50 left-28 md:left-44 top-0"></div>
        <Header />
        <Hero />
        <div className='relative'>
          <img className='absolute top-[-220px] left-0' src="/landing/lines.svg" alt="" />
          <img className='absolute left-0 bottom-0' src="/landing/blur-left.svg" alt="" />
          <img className='absolute top-[-260px] right-0' src="/landing/blur-right.svg" alt="" />
          {/* <AnimatedVerticalLine className="absolute top-0 left-1/2" /> */}
          <Banner />
        </div>
      </div>
      <About />
      <Verticals />
      <Roadmap />
      <Partners />
      <Footer />

      {
        scrollPosition >= 100 && (
          <div
            className="w-10 h-10 flex items-center justify-center bg-gray-300/75 rounded-full p-2 text-[#0a0a0a90] border border-gray-700/50 fixed bottom-10 right-10 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp />
          </div>
        )
      }
    </div >
  )
}

export default NewLanding