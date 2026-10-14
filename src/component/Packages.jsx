import packages1 from '../assets/packages1.png'
import packages2 from '../assets/packages2.png'
import packages3 from '../assets/packages3.png'
import packages4 from '../assets/packages4.png'

const defaultPackages = [
  { title: 'High Quality', description: 'crafted from top materials', icon: packages1 },
  { title: 'Warranty Protection', description: 'Over 2 years', icon: packages2 },
  { title: 'Free Shipping', description: 'Order over 150 $', icon: packages3 },
  { title: '24 / 7 Support', description: 'Dedicated support', icon: packages4 },
]

const Packages = ({ packages = defaultPackages, className = '' }) => (
  <section id="packages" className={`w-full bg-white py-8 sm:py-10 ${className}`} aria-label="Shopping benefits">
    <div className="container mx-auto grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {packages.map((item, index) => (
        <div key={item.id || item.title || index} className="flex items-center justify-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center">
            {item.icon ? (
              <img src={item.icon} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
            ) : (
              <span aria-hidden="true" className="h-full w-full" />
            )}
          </div>
          <div>
            <h2 className="font-[Poppins,sans-serif] text-sm font-medium leading-5 text-[#484848]">
              {item.title}
            </h2>
            <p className="font-[Poppins,sans-serif] text-[11px] leading-4 text-[#777]">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default Packages
