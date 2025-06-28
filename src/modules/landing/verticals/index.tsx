const Verticals = () => {
  return (
    <div id="vision" className="flex flex-col gap-8 mt-20">
      <h2 className="text-landing-title text-3xl lg:text-5xl px-14">Our Verticals</h2>
      <div className="w-full border-y border-landing-border py-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-12 h-fit">
          <img src="/landing/verticals/1.svg" alt="" className="px-2 md:px-0 mx-auto rounded-[20px] object-cover" />
          <img src="/landing/verticals/2.svg" alt="" className="mx-auto rounded-[20px] object-cover" />
          <img src="/landing/verticals/3.svg" alt="" className="px-2 md:px-0 mx-auto rounded-[20px] object-cover" />
        </div>
      </div>
    </div>
  )
}

export default Verticals
