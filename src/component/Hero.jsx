import Button from './Button'
import heroMiddleDown from '../assets/hero-middle-down.svg'
import heroMiddleUp from '../assets/hero-middle-up.png'
import heroLeft from '../assets/hero-left.svg'
import heroRight from '../assets/hero-right.svg'
import heroShop from '../assets/hero-shop.svg'
import heroArrow from '../assets/hero-arrow.svg'

const Hero = () => (
  <section id="home" className="container relative py-8 sm:py-12" aria-labelledby="hero-title">
    <div className="grid w-full grid-cols-2 items-stretch gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="relative order-2 mx-auto aspect-[392/756] w-full max-w-[392px] overflow-hidden rounded-lg bg-[#E0E0E0] lg:order-1 lg:aspect-auto lg:h-[756px]">
        <img
          src={heroLeft}
          alt="Model wearing the new collection"
          className="absolute inset-x-0 bottom-0 h-[75.4%] w-full object-contain lg:h-[570px]"
        />
      </div>

      <div className="col-span-2 flex min-w-0 flex-col items-center text-center lg:col-span-1 lg:col-start-2 lg:row-start-1">
        <img
          src={heroMiddleUp}
          alt="Four models wearing the new collection"
          className="h-auto w-full rounded-lg"
        />

        <div className="flex flex-1 flex-col items-center justify-center py-5">
          <h1
            id="hero-title"
            className="h-auto w-full max-w-full whitespace-nowrap font-poppins text-[clamp(2.5rem,10vw,5.6875rem)] font-medium leading-none tracking-[-0.04em] text-[#484848] lg:text-[54px]"
          >
            ULTIMATE
          </h1>
          <p
            aria-label="Sale"
            className="mt-1 font-[Poppins,sans-serif] text-[clamp(4.25rem,16vw,8rem)] font-light leading-none tracking-[0.04em] text-transparent [-webkit-text-stroke:1px_#777]"
          >
            SALE
          </p>
          <p className="mt-3 pb-5 font-[Poppins,sans-serif] text-[12px] tracking-[0.12em] text-[#484848]">
            NEW COLLECTION
          </p>
          <Button onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })} className="mt-4 !px-[60px] !py-[20px]">SHOP NOW</Button>
        </div>

        <img
          src={heroMiddleDown}
          alt="Two models wearing the new collection"
          className="h-auto w-full rounded-lg"
        />
      </div>

      <div className="relative order-3 mx-auto aspect-[392/756] w-full max-w-[392px] overflow-hidden rounded-lg bg-[#E0E0E0] lg:order-3 lg:aspect-auto lg:h-[756px]">
        <img
          src={heroRight}
          alt="Model wearing the new collection"
          className="absolute inset-x-0 bottom-0 h-[75.4%] w-full object-contain lg:h-[570px]"
        />
      </div>
    </div>
    <div className="mt-4 flex items-center justify-end gap-3 lg:absolute lg:bottom-12 lg:-right-[100px] lg:mt-0">
      <button
        type="button"
        aria-label="Shop"
        onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex cursor-pointer items-center justify-center rounded-md bg-black p-4"
      >
        <img src={heroShop} alt="" className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex cursor-pointer items-center justify-center rounded-full border border-[#484848] bg-white p-4"
      >
        <img src={heroArrow} alt="" className="h-4 w-4" />
      </button>
    </div>
  </section>
)

export default Hero
