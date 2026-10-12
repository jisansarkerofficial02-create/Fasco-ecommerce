import { useState } from 'react'
import Customerratingscard from './Customerratingscard'
import dealsArrowLeft from '../assets/deals-arrow-left.png'
import dealsArrowRight from '../assets/deals-arrow-right.png'

const Customerratings = ({
  title = 'This Is What Our Customers Say',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis',
  reviews = [],
  initialIndex = 1,
  leftArrowImage = dealsArrowLeft,
  rightArrowImage = dealsArrowRight,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const lastIndex = reviews.length - 1

  const showPrevious = () => setActiveIndex((index) => Math.max(0, index - 1))
  const showNext = () => setActiveIndex((index) => Math.min(lastIndex, index + 1))

  return (
    <section className="w-full bg-[#fafafa] py-14 sm:py-16" aria-labelledby="customer-ratings-title">
      <div className="container mx-auto">
        <header className="mx-auto max-w-150 px-4 text-center">
          <h2 id="customer-ratings-title" className="font-serif text-3xl font-semibold text-[#484848] sm:text-[32px]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-115 font-[Poppins,sans-serif] text-[11px] leading-5 text-[#888]">
            {description}
          </p>
        </header>

        {reviews.length > 0 && (
          <>
            <div className="relative mx-auto mt-8 h-82.25 max-w-250 overflow-hidden sm:mt-10 sm:h-97.5 lg:h-107.5">
              {reviews.map((review, index) => {
                const offset = index - activeIndex
                if (Math.abs(offset) > 1) return null

                return (
                  <div
                    key={review.id || `${review.name || 'review'}-${index}`}
                    style={{
                      transform: `translate(-50%, -50%)${offset === 0 ? '' : ` translateX(${offset < 0 ? '-270px' : '270px'})`}`,
                    }}
                    className={`absolute left-1/2 top-1/2 flex w-full justify-center transition-all duration-500 ease-out ${offset === 0 ? 'z-20 opacity-100' : 'z-10 opacity-100'}`}
                  >
                    <Customerratingscard
                      {...review}
                      compact
                      className={offset === 0 ? '' : 'hidden md:grid'}
                    />
                  </div>
                )
              })}
            </div>

            <div className="mt-1 flex justify-center gap-3">
              <button
                type="button"
                onClick={showPrevious}
                disabled={activeIndex === 0}
                aria-label="Previous customer review"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgb(0_0_0_/_14%)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <img src={leftArrowImage} alt="" className="h-[14px] w-[7px]" />
              </button>
              <button
                type="button"
                onClick={showNext}
                disabled={activeIndex === lastIndex}
                aria-label="Next customer review"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgb(0_0_0_/_14%)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <img src={rightArrowImage} alt="" className="h-[14px] w-[7px]" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Customerratings
