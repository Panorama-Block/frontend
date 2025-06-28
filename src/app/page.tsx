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
  return (
    <div className='bg-landing min-h-screen [&_*]:font-suisse'>
      <div className="relative">
        <div className="absolute w-[1px] h-full bg-landing-borderGradient/50 left-6 md:left-10 top-0"></div>
        <div className="absolute w-[1px] h-full bg-landing-borderGradient/50 left-28 md:left-44 top-0"></div>
        <Header />
        <Hero />
        <div className='relative min-h-[600px]'>
          <img className='absolute hidden lg:block left-0 bottom-5' src="/landing/blur-left.svg" alt="" />
          <img className='absolute hidden lg:block top-[-260px] right-0' src="/landing/blur-right.svg" alt="" />
          <img className='absolute block lg:hidden top-[-90px] left-[-50px] md:top-[-130px]' src="/landing/blur-mobile.svg" alt="" />

          <Lines />

          <Banner />
        </div>
      </div>
      <About />
      <Verticals />
      <Roadmap />
      <Partners />
      <Footer />
    </div >
  )
}

export default NewLanding