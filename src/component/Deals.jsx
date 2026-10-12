import { useRef, useState } from 'react'
import Button from './Button'
import dealsArrowLeft from '../assets/deals-arrow-left.png'
import dealsArrowRight from '../assets/deals-arrow-right.png'
import dealsImage1 from '../assets/deals-image1.svg'
import dealsImage2 from '../assets/deals-image2.svg'
import dealsImage3 from '../assets/deals-image3.svg'

const digitSegments = {
  0: ['top', 'upperLeft', 'upperRight', 'lowerLeft', 'lowerRight', 'bottom'],
  1: ['upperRight', 'lowerRight'],
  2: ['top', 'upperRight', 'middle', 'lowerLeft', 'bottom'],
  3: ['top', 'upperRight', 'middle', 'lowerRight', 'bottom'],
  4: ['upperLeft', 'upperRight', 'middle', 'lowerRight'],
  5: ['top', 'upperLeft', 'middle', 'lowerRight', 'bottom'],
  6: ['top', 'upperLeft', 'middle', 'lowerLeft', 'lowerRight', 'bottom'],
  7: ['top', 'upperRight', 'lowerRight'],
  8: ['top', 'upperLeft', 'upperRight', 'middle', 'lowerLeft', 'lowerRight', 'bottom'],
  9: ['top', 'upperLeft', 'upperRight', 'middle', 'lowerRight', 'bottom'],
}

const DigitalNumber = ({ value, label }) => (
  <span role="img" aria-label={`${value} ${label}`} className="flex items-center gap-[3px]">
    {String(value).split('').map((digit, index) => (
      <span key={`${digit}-${index}`} className="relative block h-[26px] w-[14px]">
        {digitSegments[digit]?.map((segment) => (
          <span
            key={segment}
            className={`absolute rounded-[1px] bg-[#262626] ${
              segment === 'top' ? 'left-[2px] top-0 h-[3px] w-[10px] [clip-path:polygon(12%_0,88%_0,100%_50%,88%_100%,12%_100%,0_50%)]' :
              segment === 'middle' ? 'left-[2px] top-[11px] h-[3px] w-[10px] [clip-path:polygon(12%_0,88%_0,100%_50%,88%_100%,12%_100%,0_50%)]' :
              segment === 'bottom' ? 'bottom-0 left-[2px] h-[3px] w-[10px] [clip-path:polygon(12%_0,88%_0,100%_50%,88%_100%,12%_100%,0_50%)]' :
              segment === 'upperLeft' ? 'left-0 top-[3px] h-[8px] w-[3px] [clip-path:polygon(50%_0,100%_12%,100%_88%,50%_100%,0_88%,0_12%)]' :
              segment === 'upperRight' ? 'right-0 top-[3px] h-[8px] w-[3px] [clip-path:polygon(50%_0,100%_12%,100%_88%,50%_100%,0_88%,0_12%)]' :
              segment === 'lowerLeft' ? 'bottom-[3px] left-0 h-[8px] w-[3px] [clip-path:polygon(50%_0,100%_12%,100%_88%,50%_100%,0_88%,0_12%)]' :
              'bottom-[3px] right-0 h-[8px] w-[3px] [clip-path:polygon(50%_0,100%_12%,100%_88%,50%_100%,0_88%,0_12%)]'
            }`}
          />
        ))}
      </span>
    ))}
  </span>
)

const defaultCountdown = [
  { value: '02', label: 'Days' },
  { value: '06', label: 'Hr' },
  { value: '05', label: 'Mins' },
  { value: '30', label: 'Sec' },
]

const defaultSlides = [
  { image: dealsImage1, eyebrow: '01 — Spring Sale', offer: '30% OFF' },
  { image: dealsImage2 },
  { image: dealsImage3 },
  { image: null },
]

const Deals = ({
  title = 'Deals Of The Month',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin',
  buttonText = 'Buy Now',
  countdown = defaultCountdown,
  countdownTitle = 'Hurry, Before It’s Too Late!',
  slides = defaultSlides,
  leftArrowImage,
  rightArrowImage,
}) => {
  const carouselRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const moveToSlide = (index) => {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index))
    carouselRef.current?.scrollTo({ left: nextIndex * 250, behavior: 'smooth' })
    setActiveSlide(nextIndex)
  }

  return (
  <section id="deals" className="w-full overflow-hidden bg-[#fafafa] py-12 sm:py-16 lg:py-24" aria-labelledby="deals-title">
    <div className="container mx-auto grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.6fr)] lg:items-start lg:gap-12">
      <div className="w-full max-w-[360px] lg:pt-4">
        <h2 id="deals-title" className="pb-[14px] font-serif text-[clamp(1.7rem,4vw,2rem)] font-semibold text-[#484848]">
          {title}
        </h2>
        <p className="mt-3 max-w-[340px] pb-[14px] font-[Poppins,sans-serif] text-[11px] leading-5 text-[#777]">
          {description}
        </p>
        <Button onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })} className="mt-[14px] mb-5 !min-h-[52px] !min-w-[150px] !rounded-md !px-[50px] !py-[20px] !text-[11px]">
          {buttonText}
        </Button>

        <div className="mt-8 pt-[14px]">
          <h3 className="font-[Poppins,sans-serif] text-[clamp(1rem,3vw,1.25rem)] font-medium text-[#484848]">
            {countdownTitle}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
            {countdown.map((item) => (
              <div key={item.label} className="flex min-w-[54px] flex-col items-center">
                <span className="flex h-12 min-w-[50px] items-center justify-center rounded-md bg-white px-2 shadow-[0_2px_8px_rgb(0_0_0_/_14%)]">
                  <DigitalNumber value={item.value} label={item.label} />
                </span>
                <span className="mt-2 font-[Poppins,sans-serif] text-sm text-[#484848]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative min-w-0">
        <div
          ref={carouselRef}
          onScroll={(event) => setActiveSlide(Math.min(slides.length - 1, Math.max(0, Math.round(event.currentTarget.scrollLeft / 250))))}
          className="flex items-start gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:pb-0 lg:-ml-[111px]"
        >
          {slides.map((slide, index) => (
            <div
              key={`${slide.eyebrow || 'deal'}-${index}`}
              className={`relative shrink-0 overflow-hidden bg-[#e5e3df] ${
                index === 0
                  ? 'h-[min(130vw,582px)] w-[min(76vw,364px)] lg:h-[582px] lg:w-[364px]'
                  : 'h-[min(110vw,486px)] w-[min(55vw,233px)] lg:h-[486px] lg:w-[233px]'
              }`}
            >
              {slide.image && (
                <img
                  src={slide.image}
                  alt={slide.alt || slide.offer || `Deal ${index + 1}`}
                  className={`h-full w-full object-cover ${index === 2 ? 'object-top' : 'object-center'}`}
                />
              )}
              {index === 0 && (slide.eyebrow || slide.offer) && (
                <div className="absolute bottom-4 left-4 min-w-[136px] bg-white px-4 py-3">
                  {slide.eyebrow && (
                    <p className="font-[Poppins,sans-serif] text-[10px] text-[#666]">
                      {slide.eyebrow}
                    </p>
                  )}
                  {slide.offer && (
                    <p className="mt-1 font-[Poppins,sans-serif] text-base text-[#484848]">
                      {slide.offer}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 lg:absolute lg:-left-[197px] lg:top-[550px] lg:mt-0">
          <button
            type="button"
            aria-label="Previous deals"
            onClick={() => moveToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#c7c7c7] shadow-[0_2px_8px_rgb(0_0_0_/_14%)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <img src={leftArrowImage || dealsArrowLeft} alt="" className="h-[14px] w-[7px]" />
          </button>
          <button
            type="button"
            aria-label="Next deals"
            onClick={() => moveToSlide(activeSlide + 1)}
            disabled={activeSlide === slides.length - 1}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#222] shadow-[0_2px_8px_rgb(0_0_0_/_14%)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <img src={rightArrowImage || dealsArrowRight} alt="" className="h-[14px] w-[7px]" />
          </button>
        </div>
        <div role="group" aria-label="Choose deal slide" className="mt-3 flex items-center justify-center gap-3 lg:absolute lg:left-[265px] lg:top-[570px] lg:mt-0">
          {slides.map((_, index) => (
            <button
              type="button"
              aria-label={`Go to deal ${index + 1}`}
              aria-current={index === activeSlide ? 'true' : undefined}
              onClick={() => moveToSlide(index)}
              key={index}
              className={`h-[7px] w-[7px] cursor-pointer rounded-full ${index === activeSlide ? 'border border-black bg-black ring-2 ring-white ring-offset-1 ring-offset-black' : 'bg-[#b7b7b7]'}`}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
  )
}

export default Deals
