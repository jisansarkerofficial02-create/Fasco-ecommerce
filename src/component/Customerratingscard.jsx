const Customerratingscard = ({
  image,
  imageAlt = '',
  quote = 'You won\'t regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!',
  rating = 5,
  name = 'James K.',
  role = 'Traveler',
  compact = false,
  className = '',
}) => {
  const safeRating = Math.max(0, Math.min(5, rating))

  return (
    <article className={`grid w-full grid-cols-1 items-center rounded-xl bg-white shadow-[0_12px_24px_rgb(0_0_0_/_7%)] ${compact ? 'max-w-[540px] grid-cols-[84px_minmax(0,1fr)] gap-4 px-4 py-5 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-5 sm:px-6 sm:py-6 md:grid-cols-[150px_minmax(0,1fr)] md:gap-[53px] md:px-11 md:py-7' : 'max-w-[960px] gap-8 px-5 py-7 sm:px-12 sm:py-10 md:grid-cols-[1fr_1.7fr] md:gap-12'} ${className}`}>
      <div className={`flex justify-center md:justify-start ${compact ? '' : 'md:pl-5'}`}>
        <div className={`relative shrink-0 ${compact ? 'h-[84px] w-[84px] sm:h-[110px] sm:w-[110px] md:h-[150px] md:w-[150px]' : 'h-[min(52vw,220px)] w-[min(52vw,220px)]'}`}>
          <div aria-hidden="true" className={`absolute h-full w-full bg-[#dedede] ${compact ? '-bottom-3 -left-3' : '-bottom-5 -left-5'}`} />
          <div className="relative h-full w-full overflow-hidden bg-[#e8e8e8]">
            {image && <img src={image} alt={imageAlt || name} loading="lazy" decoding="async" className="h-full w-full object-cover" />}
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <blockquote className={`font-[Poppins,sans-serif] leading-[1.55] text-[#484848] ${compact ? 'text-[12px] sm:text-[13px]' : 'text-base sm:text-[17px]'}`}>
          “{quote}”
        </blockquote>
        <div className={`${compact ? 'mt-3' : 'mt-5'} flex items-center`} role="img" aria-label={`${safeRating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={`${compact ? 'text-[17px]' : 'text-[22px]'} leading-none ${index < safeRating ? 'text-[#ff8a00]' : 'text-[#d6d6d6]'}`}
            >
              ★
            </span>
          ))}
        </div>
        <hr className={`${compact ? 'my-4' : 'my-6'} w-full max-w-[230px] border-0 border-t border-[#666]`} />
        <h2 className={`font-serif font-semibold text-[#484848] ${compact ? 'text-2xl' : 'text-3xl'}`}>{name}</h2>
        <p className={`font-[Poppins,sans-serif] text-[#484848] ${compact ? 'mt-2 text-xs' : 'mt-3 text-base'}`}>{role}</p>
      </div>
    </article>
  )
}

export default Customerratingscard
