'use client';

import Image from 'next/image';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full flex flex-col md:flex-row min-h-[700px]">
      {/* Left Side - Info & Image */}
      <div className="w-full md:w-1/2 bg-[#1c1c1c] relative p-12 md:p-24 flex flex-col justify-between overflow-hidden min-h-[500px]">
        <div className="relative z-10">
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-heading font-extrabold leading-[0.9] tracking-tight text-white">
            The Print <br /> Shop
          </h2>
          <p className="text-brand-accent text-sm font-bold tracking-[0.3em] uppercase mt-2">Lagos</p>
          <div className="mt-6 w-8 h-8 border-l-2 border-b-2 border-white/40 rotate-[-45deg]" />
          
          <div className="mt-20 sm:mt-28">
            <h3 className="text-3xl font-heading font-extrabold tracking-tight text-white italic">
              Introducing Excellence
            </h3>
            <p className="mt-5 text-[15px] leading-[1.8] text-white/90 max-w-[340px]">
              A premium printing service that creates precise, gallery-worthy artworks. Sign up for a chance to try one.
            </p>
            <button className="mt-10 px-10 py-4 bg-brand-accent text-white font-bold text-sm hover:bg-white hover:text-brand-black transition-all duration-300 shadow-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Art Image */}
        <div className="absolute right-[-5%] bottom-0 w-[70%] h-[90%] z-0 opacity-30 mix-blend-lighten pointer-events-none">
          <Image
            src="/art_1.png"
            alt="Art background"
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-brand-accent p-12 md:p-24 flex flex-col justify-center">
        <h2 className="text-5xl font-heading font-extrabold tracking-tight text-brand-black">
          Contact us
        </h2>
        <p className="mt-4 text-[15px] text-brand-black/70 font-medium max-w-md leading-relaxed">
          Interested in a custom print or collaboration? Use the form below to get in touch.
        </p>

        <form className="mt-12 flex flex-col gap-7 flex-1 max-w-xl w-full" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col sm:flex-row gap-7">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-black tracking-wide uppercase">Name</label>
              <input type="text" className="w-full bg-white h-14 px-5 border-none outline-none focus:ring-2 focus:ring-brand-black/20 transition-shadow" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-black tracking-wide uppercase">Company</label>
              <input type="text" className="w-full bg-white h-14 px-5 border-none outline-none focus:ring-2 focus:ring-brand-black/20 transition-shadow" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-7">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-black tracking-wide uppercase">Email</label>
              <input type="text" className="w-full bg-white h-14 px-5 border-none outline-none focus:ring-2 focus:ring-brand-black/20 transition-shadow" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-black tracking-wide uppercase">Subject</label>
              <input type="text" className="w-full bg-white h-14 px-5 border-none outline-none focus:ring-2 focus:ring-brand-black/20 transition-shadow" />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label className="text-xs font-bold text-brand-black tracking-wide uppercase">Message</label>
            <textarea className="w-full bg-white flex-1 min-h-[160px] p-5 border-none outline-none resize-none focus:ring-2 focus:ring-brand-black/20 transition-shadow" />
          </div>

          <div className="flex justify-end mt-2">
            <button className="bg-brand-black text-white font-bold text-sm px-14 py-5 hover:bg-black/80 transition-colors shadow-xl">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
