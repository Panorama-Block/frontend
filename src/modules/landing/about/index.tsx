const About = () => {
  return (
    <div id="about" className="flex flex-col lg:flex-row relative w-full">
      <div className="absolute hidden lg:block w-[1px] h-full bg-landing-border left-1/2 top-0"></div>
      <div className="flex flex-col gap-8 flex-1 py-24 px-12">
        <div className="absolute w-full h-[1px] bg-landing-border top-16 left-0"></div>
        <h2 className="text-landing-title text-3xl lg:text-4xl lg:px-0 2xl:pr-8">Agentic Economy Engineered through Academic Alliances.</h2>
        <div className="absolute w-full h-[1px] bg-landing-border hidden xl:block top-48 left-0"></div>
        <span className="text-landing-title text-justify font-normal text-xl lg:text-3xl lg:px-0 lg:pr-8">
          Panorama Block is built on rigorous cryptoeconomic and decentralized systems research from UCLA and leading Brazilian universities, creating a protocol-agnostic agentic framework for Web3, where modular AI agents intelligently learn, adjust, and deploy actions on-chain. We’re a globally distributed team based in the US, South America, and Switzerland.
        </span>
      </div>
      <div className="flex-1 py-12">
        <img src="/landing/map.png" alt="" className="w-full" />
      </div>
    </div>
  )
}

export default About
