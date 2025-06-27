'use client'

import { useEffect, useState } from 'react'

import { ChevronUp } from 'lucide-react'

import Verticals from '@/modules/landing/verticals'
import Partners from '@/modules/landing/partners'
import Roadmap from '@/modules/landing/roadmap'
import Header from '@/modules/landing/header'
import Banner from '@/modules/landing/banner'
import Footer from '@/modules/landing/footer'
import Lines from '@/modules/landing/lines'
import About from '@/modules/landing/about'
import Hero from '@/modules/landing/hero'


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
        <div className='relative min-h-[600px]'>
          <img className='absolute hidden lg:block left-0 bottom-0' src="/landing/blur-left.svg" alt="" />
          <img className='absolute hidden lg:block top-[-260px] right-0' src="/landing/blur-right.svg" alt="" />
          <img className='absolute block lg:hidden top-[-90px] left-[-50px]' src="/landing/blur-mobile.svg" alt="" />

          <Lines active={null} />

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