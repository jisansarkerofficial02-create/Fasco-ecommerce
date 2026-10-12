import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Newarrivalscard from './Newarrivalscard'
import newarrivals1 from '../assets/newarrivals1.svg'
import newarrivals2 from '../assets/newarrivals2.svg'
import newarrivals3 from '../assets/newarrivals3.svg'
import newarrivals4 from '../assets/newarrivals4.svg'
import newarrivals5 from '../assets/newarrivals5.svg'
import newarrivals6 from '../assets/newarrivals6.svg'

const defaultCategories = [
  "Men's Fashion",
  "Women's Fashion",
  'Women Accessories',
  'Men Accessories',
  'Discount Deals',
]

const defaultProducts = [
  { image: newarrivals1, name: 'Shiny Dress', designer: 'Al Karam', reviewCount: '4.1k', price: '$95.50', stockMessage: 'Almost Sold Out', categories: ["Women's Fashion", 'Discount Deals'] },
  { image: newarrivals2, name: 'Long Dress', designer: 'Al Karam', reviewCount: '4.1k', price: '$95.50', stockMessage: 'Almost Sold Out', categories: ["Women's Fashion"] },
  { image: newarrivals3, name: 'Full Sweater', designer: 'Al Karam', reviewCount: '4.1k', price: '$95.50', stockMessage: 'Almost Sold Out', categories: ["Women's Fashion"] },
  { image: newarrivals4, name: 'White Dress', designer: 'Al Karam', reviewCount: '4.1k', price: '$95.50', stockMessage: 'Almost Sold Out', categories: ["Women's Fashion"] },
  { image: newarrivals5, name: 'Colorful Dress', designer: 'Al Karam', reviewCount: '4.1k', price: '$95.50', stockMessage: 'Almost Sold Out', categories: ["Women's Fashion", 'Discount Deals'] },
  { image: newarrivals6, name: 'White Shirt', designer: 'Al Karam', reviewCount: '4.1k', price: '$95.50', stockMessage: 'Almost Sold Out', categories: ["Women's Fashion"] },
]

const Newarrivals = ({
  title = 'New Arrivals',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.',
  categories = defaultCategories,
  products = defaultProducts,
  initialCategory = "Women's Fashion",
  activeCategory,
  onCategoryChange,
  viewMoreText = 'View More',
  onViewMore,
}) => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const currentCategory = activeCategory ?? selectedCategory
  const hasCategorizedProducts = products.some((product) => product.categories || product.category)
  const visibleProducts = hasCategorizedProducts
    ? products.filter((product) => {
      const productCategories = product.categories || (product.category ? [product.category] : [])
      return productCategories.length === 0 || productCategories.includes(currentCategory)
    })
    : products

  const selectCategory = (category) => {
    if (activeCategory === undefined) setSelectedCategory(category)
    onCategoryChange?.(category)
  }

  return (
    <section id="new-arrivals" className="w-full bg-white py-16 sm:py-20" aria-labelledby="new-arrivals-title">
      <div className="container mx-auto">
        <header className="mx-auto max-w-[520px] text-center">
          <h2 id="new-arrivals-title" className="font-serif text-3xl font-semibold text-[#484848]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-[460px] font-[Poppins,sans-serif] text-[11px] leading-5 text-[#888]">
            {description}
          </p>
        </header>

        <nav
          className="mx-auto mt-7 flex max-w-full gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-fit"
          aria-label="Product categories"
        >
          {categories.map((item) => {
            const category = typeof item === 'string' ? item : item.label
            const isActive = category === currentCategory

            return (
              <Button
                key={category}
                onClick={() => selectCategory(category)}
                aria-pressed={isActive}
                className={`!min-h-9 !min-w-[120px] !rounded-md !px-5 !py-2 !text-[10px] !font-normal ${
                  isActive
                    ? '!bg-black !text-white'
                    : '!bg-[#fafafa] !text-[#888] !shadow-none hover:!bg-[#f0f0f0]'
                }`}
              >
                {category}
              </Button>
            )
          })}
        </nav>

        <div className="mx-auto mt-7 grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product, index) => (
            <Newarrivalscard
              key={product.id || `${product.name}-${index}`}
              {...product}
              className="transition duration-200 ease-out hover:shadow-[0_14px_32px_rgb(0_0_0_/_13%)]"
            />
          ))}
        </div>
        {visibleProducts.length === 0 && (
          <p className="mt-6 text-center text-sm text-[#777]" role="status">No products are available in this category yet.</p>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => {
              if (onViewMore) onViewMore()
              else navigate('/shop')
            }}
            className="!min-h-9 !min-w-[130px] !rounded-md !px-8 !py-3 !text-[11px]"
          >
            {viewMoreText}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Newarrivals
