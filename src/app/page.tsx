import Header from '@/modules/landing/header'
import Banner from '@/modules/landing/banner'
import Hero from '@/modules/landing/hero'

const NewLanding = () => {
  return (
    <div className='bg-landing min-h-screen [&_*]:font-suisse'>
      <Header />
      <Hero />
      <Banner />
    </div>
  )
}

export default NewLanding