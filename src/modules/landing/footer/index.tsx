const Footer = () => {
  return (
    <footer id="resources" className="relative text-landing-text mt-20">
      <div className="flex border-t border-landing-border">
        <div className="w-3/6 xl:w-3/5 py-8 px-8">
          <img src="new-logo.png" alt="" />
        </div>
        <div className="relative w-2/6 px-4 lg:px-8">
          <div className="absolute top-[-60px] left-0 w-[1px] h-[calc(100%+60px)] bg-landing-border" />
          <h2 className="text-landing-title text-lg md:text-xl lg:text-2xl xl:text-3xl mt-8">Contact Us</h2>
          <ul className="flex flex-col gap-4 mt-4">
            <li>
              <a href="mailto:info@panoramablock.com">Email</a>
            </li>
          </ul>
        </div>
        <div className="relative w-2/6 xl:w-1/5 px-4 lg:px-8 pb-12">
          <div className="absolute top-[-60px] left-0 w-[1px] h-[calc(100%+60px)] bg-landing-border" />
          <h2 className="text-landing-title text-lg md:text-xl lg:text-2xl xl:text-3xl mt-8">Resources</h2>
          <ul className="flex flex-col gap-4 mt-4">
            <li>
              <a href="https://docs.panoramablock.com/" target="_blank">Docs</a>
            </li>
            <li>
              <a href="https://github.com/Panorama-Block" target="_blank">Github</a>
            </li>
            <li>
              <a href="https://linkedin.com/company/panoramablock" target="_blank">LinkedIn</a>
            </li>
            <li>
              <a href="https://x.com/panorama_block" target="_blank">X</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer