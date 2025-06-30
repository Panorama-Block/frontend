const About = () => {
  return (
    <div id="about" className="flex flex-col lg:flex-row relative w-full">
      <div className="absolute hidden lg:block w-[1px] h-full bg-landing-border left-1/2 top-0"></div>
      <div className="flex flex-col gap-8 flex-1 pt-24 pb-6 lg:py-24 px-12">
        <div className="absolute w-full h-[1px] bg-landing-border top-16 left-0"></div>
        <h2 className="text-landing-title text-center text-lg md:text-xl lg:text-2xl xl:text-3xl lg:px-0 2xl:pr-8">Agentic Economy Engineered through Academic Alliances.</h2>
        <div className="absolute w-1/2 h-[1px] bg-landing-border hidden xl:block top-48 left-0"></div>
        <span className="text-landing-text font-normal text-center lg:mt-4 text-lg md:text-xl lg:text-2xl lg:px-0 lg:pr-8">
          Panorama Block is built on rigorous cryptoeconomic and decentralized systems research from UCLA and leading Brazilian universities, creating a protocol-agnostic agentic framework for Web3, where modular AI agents intelligently learn, adjust, and deploy actions on-chain. We’re a globally distributed team based in the US, South America, and Switzerland.
        </span>
      </div>
      <div className="flex-1 lg:py-12">
        <img src="/landing/map.png" alt="" className="w-full h-auto lg:h-[450px] lg:object-fill" />
      </div>
    </div>
  )
}

export default About
