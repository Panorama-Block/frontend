const Verticals = () => {
  return (
    <div id="vision" className="flex flex-col gap-8 mt-20">
      <h2 className="text-landing-title text-5xl px-14">Our Verticals</h2>
      <div className="w-full border-y border-landing-border py-8 mt-8">
        <div className="grid items grid-cols-1 md:grid-cols-3 gap-8 md:px-12 h-fit">
          <img src="/landing/verticals/1.png" alt="" className="rounded-[20px] h-full px-4 md:px-0 py-4" />
          <img src="/landing/verticals/2.png" alt="" className="rounded-[20px] h-full" />
          <img src="/landing/verticals/3.png" alt="" className="rounded-[20px] h-full px-4 md:px-0 pt-1 pb-3" />
        </div>
      </div>
    </div>
  )
}

export default Verticals
