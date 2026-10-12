import { useState } from 'react'
import Button from './Button'
import pickyBlindersImage from '../assets/pickyblinders1.svg'

const Pickyblinders = ({
  image = pickyBlindersImage,
  imageAlt = 'Product image',
  collection = 'Women Collection',
  title = 'Peaky Blinders',
  descriptionLabel = 'DESCRIPTION',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin aliquam sem, consectetur adipiscing elit. Scelerisque duis.',
  sizeLabel = 'Size:',
  size = 'M',
  sizes = ['M'],
  onSizeChange,
  price = '$100.00',
  buttonText = 'Buy Now',
  onBuyNow = () => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' }),
}) => {
  const [selectedSize, setSelectedSize] = useState(size)
  const chooseSize = (option) => {
    setSelectedSize(option)
    onSizeChange?.(option)
  }

  return (
  <section className="w-full bg-[#d9d9d9]" aria-labelledby="pickyblinders-title">
    <div className="relative grid min-h-[360px] grid-cols-1 overflow-hidden bg-[#d9d9d9] lg:grid-cols-[55%_45%]">
      <div className="relative min-h-[280px] overflow-hidden bg-[#f8f8f8] sm:min-h-[360px] lg:min-h-[360px] lg:[clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]">
        {image && (
          <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-fill" />
        )}
      </div>

      <div className="relative bg-[#d9d9d9] px-5 py-8 sm:px-8 sm:py-10 lg:px-5 lg:py-10 lg:pl-6">
        <p className="font-[Poppins,sans-serif] text-[11px] text-[#777]">{collection}</p>
        <h2 id="pickyblinders-title" className="mt-2 font-serif text-3xl font-semibold text-[#484848] sm:text-[32px]">
          {title}
        </h2>

        {descriptionLabel && (
          <h3 className="mt-4 font-[Poppins,sans-serif] text-[10px] font-medium text-black underline underline-offset-2">
            {descriptionLabel}
          </h3>
        )}
        <p className="mt-3 max-w-[360px] font-[Poppins,sans-serif] text-[11px] leading-[1.55] text-[#777]">
          {description}
        </p>

        <div className="mt-3 flex items-center gap-2 font-[Poppins,sans-serif] text-[10px] text-[#777]">
          <span>{sizeLabel}</span>
          <div className="flex gap-1">
            {sizes.map((option) => (
              <button
                type="button"
                key={option}
                aria-pressed={option === selectedSize}
                onClick={() => chooseSize(option)}
                className={`flex h-6 min-w-8 cursor-pointer items-center justify-center rounded-full px-2 text-[10px] ${
                  option === selectedSize ? 'bg-black text-white' : 'bg-white text-[#484848]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-3 font-[Poppins,sans-serif] text-lg font-semibold text-black">{price}</p>
        <Button onClick={onBuyNow} className="mt-3 !min-h-9 !min-w-[130px] !rounded-md !px-6 !py-3 !text-[10px]">
          {buttonText}
        </Button>
      </div>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-[55%] lg:block"
      >
        <line
          x1="100"
          y1="0"
          x2="82"
          y2="100"
          stroke="black"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  </section>
  )
}

export default Pickyblinders
