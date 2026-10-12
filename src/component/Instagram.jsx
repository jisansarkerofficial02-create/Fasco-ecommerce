import instagram1 from '../assets/instagram1.svg'
import instagram2 from '../assets/instagram2.svg'
import instagram3 from '../assets/instagram3.svg'
import instagram4 from '../assets/instagram4.svg'
import instagram5 from '../assets/instagram5.svg'
import instagram6 from '../assets/instagram6.svg'
import instagram7 from '../assets/instagram7.svg'

const defaultImages = Array.from({ length: 7 }, (_, index) => ({
  id: `instagram-${index + 1}`,
  src: [instagram1, instagram2, instagram3, instagram4, instagram5, instagram6, instagram7][index],
  alt: `Instagram post ${index + 1}`,
  width: index === 0 || index === 6 ? '16.6667%' : '13.3333%',
}))

const Instagram = ({
  title = 'Follow Us On Instagram',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin',
  images = defaultImages,
  className = '',
}) => (
  <section className={`w-full overflow-hidden bg-white py-16 sm:py-20 ${className}`} aria-labelledby="instagram-title">
    <header className="mx-auto max-w-[520px] px-5 text-center">
      <h2 id="instagram-title" className="font-serif text-3xl font-semibold text-[#484848] sm:text-[32px]">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-[460px] font-[Poppins,sans-serif] text-[11px] leading-5 text-[#888]">
        {description}
      </p>
    </header>

    <div className="relative mt-14 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="relative min-w-[1000px] md:min-w-0">
      <div aria-hidden="true" className="absolute inset-x-0 top-[1.92vw] h-[16vw] bg-[#f2f0ee]" />
      <div className="relative flex h-[clamp(238px,19.84vw,420px)] w-full items-center overflow-hidden">
        {images.map((item, index) => {
          const image = typeof item === 'string' ? item : item.src
          const alt = typeof item === 'string' ? `Instagram post ${index + 1}` : item.alt || `Instagram post ${index + 1}`
          const width = typeof item === 'string' ? undefined : item.width
          const shape = index === 0 || index === images.length - 1
            ? 'aspect-[320/308]'
            : index % 2 === 1
              ? 'aspect-[256/380]'
              : 'aspect-[256/308]'

          return (
            <div
              key={(typeof item === 'string' ? null : item.id) || `instagram-${index}`}
              style={{ flexBasis: width || `${100 / images.length}%` }}
              className={`relative ${shape} min-w-0 shrink-0 overflow-hidden bg-[#e7e4e2] transition-transform duration-200 hover:z-10 hover:scale-[1.03]`}
            >
              {image && <img src={image} alt={alt} className="h-full w-full object-contain" />}
            </div>
          )
        })}
      </div>
      </div>
    </div>
  </section>
)

export default Instagram
