const data = [
  {
    title: 'Phase 1',
    items: [
      'Build a multi-chain data analytics pipeline with blockchain scanners that synthesizes unstructured on-chain data into structured formats, enabling agents to reason and perform at a higher level than deterministic systems.',
      'Develop Python-based frameworks and toolkits in partnership with UCLA Masters of Quantitative Economics (MQE) students to deploy agents across any on-chain application.'
    ]
  },
  {
    title: 'Phase 2',
    items: [
      'Deploy foundational agents with low autonomy to simplify multi-protocol DeFi activities, abstracting complex on-chain actions into intuitive commands.',
      'Launch a decentralized marketplace for deploying, selling, and monetizing AI agents, models, and tools.'
    ]
  },
  {
    title: 'Phase 3',
    items: [
      'Launch hybrid agents combining autonomous and manual capabilities, collaborating on complex DeFi operations while offering modular frameworks for users to build and customize their own agent teams.'
    ]
  },
  {
    title: 'Phase 4',
    items: [
      'Introduce fully composable, DeFi strategist agents with advanced reasoning, capable of autonomously making critical decisions across multi-chain environments, enabling sophisticated, high-utility automation at scale.'
    ]
  }
]

const Roadmap = () => {
  return (
    <div id="roadmap" className="flex flex-col gap-8 mt-20">
      <h2 className="text-landing-title text-3xl lg:text-5xl px-14">Roadmap</h2>
      <div className="w-full mt-8">
        <div className="flex flex-col border-t border-landing-border">
          <div className="flex lg:gap-8 md:px-8">
            <div className="flex flex-col w-3/3 xl:w-2/3 xl:border-r border-landing-border gap-4 py-8 px-8">
              <img src="/landing/edit.png" alt="" className="w-16 h-16" />
              <span className="text-landing-highlight text-4xl">{data[0].title}</span>
              <ul className="flex flex-col gap-4 text-landing-text" style={{ listStyleType: 'disc' }}>
                {data[0].items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col hidden xl:flex xl:w-1/3 gap-4 py-8 px-8">
              <img src="/landing/edit.png" alt="" className="w-16 h-16" />
              <span className="text-landing-highlight text-2xl lg:text-3xl">{data[1].title}</span>
              <ul className="flex flex-col gap-4 text-landing-text" style={{ listStyleType: 'disc' }}>
                {data[1].items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex lg:gap-8 border-y border-landing-border md:px-8">
            <div className="flex flex-col w-2/4 block xl:hidden gap-4 py-8 px-8">
              <img src="/landing/edit.png" alt="" className="w-16 h-16" />
              <span className="text-landing-highlight text-2xl lg:text-3xl">{data[1].title}</span>
              <ul className="flex flex-col gap-4 text-landing-text" style={{ listStyleType: 'disc' }}>
                {data[1].items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col w-2/4 xl:w-1/2 gap-4 xl:border-r border-landing-border px-8 py-8">
              <img src="/landing/edit.png" alt="" className="w-16 h-16" />
              <span className="text-landing-highlight text-2xl lg:text-3xl">{data[2].title}</span>
              <ul className="flex flex-col gap-4 text-landing-text" style={{ listStyleType: 'disc' }}>
                {data[2].items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col hidden xl:flex xl:w-1/2 gap-4 px-8 py-8">
              <img src="/landing/edit.png" alt="" className="w-16 h-16" />
              <span className="text-landing-highlight text-2xl lg:text-3xl">{data[3].title}</span>
              <ul className="flex flex-col gap-4 text-landing-text" style={{ listStyleType: 'disc' }}>
                {data[3].items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-8 md:px-8">
            <div className="flex flex-col block xl:hidden gap-4 px-8 py-8">
              <img src="/landing/edit.png" alt="" className="w-16 h-16" />
              <span className="text-landing-highlight text-2xl lg:text-3xl">{data[3].title}</span>
              <ul className="flex flex-col gap-4 text-landing-text" style={{ listStyleType: 'disc' }}>
                {data[3].items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap