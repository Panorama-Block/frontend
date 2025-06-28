const Header = () => {
  return (
    <header className='flex items-center px-8 md:px-12 py-8 w-full'>
      <div className="w-1/3">
        <img src="new-logo.png" alt="Panorama Block Logo" className='w-[80px] md:w-auto' />
      </div>
      <div className="w-2/3 flex gap-4 md:gap-8 text-xs md:text-xl text-landing-text">
        <a href="#about" className="hover:text-cyan-600 transition-colors">About</a>
        <a href="#vision" className="hover:text-cyan-600 transition-colors">Vision</a>
        <a href="#roadmap" className="hover:text-cyan-600 transition-colors">Roadmap</a>
        <a href="#resources" className="hover:text-cyan-600 transition-colors">Resources</a>
      </div>
    </header>
  )
}

export default Header