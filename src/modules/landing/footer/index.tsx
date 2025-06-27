const Footer = () => {
  return (
    <footer id="resources" className="relative text-landing-text mt-20">
      <div className="flex border-t border-landing-border">
        <div className="w-3/6 xl:w-3/5 py-8 px-8">
          <img src="new-logo.png" alt="" />
        </div>
        <div className="relative w-2/6 px-8">
          <div className="absolute top-[-60px] left-0 w-[1px] h-[calc(100%+60px)] bg-landing-border" />
          <h2 className="text-landing-title text-2xl xl:text-3xl mt-8">Contact Us</h2>
          <ul className="flex flex-col gap-4 mt-4">
            <li>
              <a href="">Email</a>
            </li>
          </ul>
        </div>
        <div className="relative w-2/6 xl:w-1/5 px-8 pb-12">
          <div className="absolute top-[-60px] left-0 w-[1px] h-[calc(100%+60px)] bg-landing-border" />
          <h2 className="text-landing-title text-2xl xl:text-3xl mt-8">Resources</h2>
          <ul className="flex flex-col gap-4 mt-4">
            <li>
              <a href="">Docs</a>
            </li>
            <li>
              <a href="">Github</a>
            </li>
            <li>
              <a href="">LinkedIn</a>
            </li>
            <li>
              <a href="">X</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer