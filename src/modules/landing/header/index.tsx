const Header = () => {
  return (
    <header className='flex items-center px-12 py-8 w-full'>
      <div className="w-1/3">
        <img src="new-logo.png" alt="Panorama Block Logo" className='w-auto' />
      </div>
      <div className="w-2/3 flex gap-8">
        <a href="#" className="hover:text-cyan-600 transition-colors">About</a>
        <a href="#" className="hover:text-cyan-600 transition-colors">Vision</a>
        <a href="#" className="hover:text-cyan-600 transition-colors">Roadmap</a>
        <a href="#" className="hover:text-cyan-600 transition-colors">Resources</a>
      </div>
    </header>
  )
}

export default Header