const Newarrivalscard = ({
  image,
  imageAlt = '',
  name = 'White Dress',
  designer = 'Al Karam',
  rating = 5,
  reviewCount = '4.1k',
  price = '$95.50',
  stockMessage = 'Almost Sold Out',
  className = '',
}) => {
  const safeRating = Math.max(0, Math.min(5, rating))

  return (
    <article className={`w-full max-w-[340px] rounded-xl bg-white p-4 shadow-[0_8px_28px_rgb(0_0_0_/_7%)] ${className}`}>
      <div className="aspect-[336/244] w-full overflow-hidden rounded-md bg-[#e8e3e0]">
        {image && (
          <img src={image} alt={imageAlt || name} className="h-full w-full object-cover" />
        )}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-[Poppins,sans-serif] text-sm font-medium leading-5 text-[#484848]">
            {name}
          </h3>
          <p className="font-[Poppins,sans-serif] text-[10px] leading-4 text-[#888]">
            {designer}
          </p>
        </div>
        <div className="flex shrink-0 items-center" aria-label={`${safeRating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={`text-[15px] leading-none ${index < safeRating ? 'text-[#ff8a00]' : 'text-[#d6d6d6]'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <p className="mt-3 font-[Poppins,sans-serif] text-[9px] text-[#444]">
        ({reviewCount}) Customer Reviews
      </p>

      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="font-[Poppins,sans-serif] text-base font-semibold text-[#484848]">
          {price}
        </p>
        {stockMessage && (
          <p className="font-[Poppins,sans-serif] text-[9px] text-[#ff4d55]">
            {stockMessage}
          </p>
        )}
      </div>
    </article>
  )
}

export default Newarrivalscard
