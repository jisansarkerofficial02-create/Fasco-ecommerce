import chanelLogo from '../assets/chanel.svg'
import louisVuittonLogo from '../assets/louis-vuitton.svg'
import pradaLogo from '../assets/prada.svg'
import calvinKleinLogo from '../assets/calvin-clein.svg'
import denimLogo from '../assets/denim.svg'

const defaultBrands = [
  { name: 'CHANEL', image: chanelLogo },
  { name: 'LOUIS VUITTON', image: louisVuittonLogo },
  { name: 'PRADA', image: pradaLogo },
  { name: 'Calvin Klein', image: calvinKleinLogo },
  { name: 'DENIM', image: denimLogo },
]

const Brands = ({ brands = defaultBrands }) => (
  <section className="w-full bg-white py-10 sm:py-14" aria-label="Featured brands">
    <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:justify-between sm:gap-x-8">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="flex min-h-10 min-w-[120px] items-center justify-center"
        >
          {brand.image ? (
            <img
              src={brand.image}
              alt={brand.name}
              loading="lazy"
              decoding="async"
              className="max-h-10 max-w-[160px] object-contain"
            />
          ) : (
            <span className="font-[Poppins,sans-serif] text-xl font-semibold tracking-[0.08em] text-black sm:text-2xl">
              {brand.name}
            </span>
          )}
        </div>
      ))}
    </div>
  </section>
)

export default Brands
