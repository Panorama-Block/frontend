import Verticals from '@/modules/landing/verticals'
import Header from '@/modules/landing/header'
import Banner from '@/modules/landing/banner'
import About from '@/modules/landing/about'
import Hero from '@/modules/landing/hero'

const NewLanding = () => {
  return (
    <div className='bg-landing min-h-screen [&_*]:font-suisse'>
      <Header />
      <Hero />
      <Banner />
      <About />
      <Verticals />
    </div>
  )
}

export default NewLanding