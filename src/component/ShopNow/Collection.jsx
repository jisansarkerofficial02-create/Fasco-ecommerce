import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import shopImage1 from '../../assets/shop-1.svg'
import shopImage2 from '../../assets/shop-2.svg'
import shopImage3 from '../../assets/shop-3.png'
import shopImage4 from '../../assets/shop-4.png'
import shopImage5 from '../../assets/shop-5.png'
import shopImage6 from '../../assets/shop-6.png'
import shopImage7 from '../../assets/shop-7.png'
import shopImage8 from '../../assets/shop-8.png'
import shopImage9 from '../../assets/shop-9.png'

const products = [
  { id: 1, name: 'Rounded Red Hat', price: 8, image: shopImage1, colors: ['#f3cb24', '#111111'], sizes: ['S', 'M'], brand: 'Al Karam', collection: 'Best sellers', tags: ['Fashion', 'Hats'] },
  { id: 2, name: 'Linen-blend Shirt', price: 17, image: shopImage2, colors: ['#a9cbd8', '#f5cbd5'], sizes: ['M', 'L'], brand: 'Mango', collection: 'New arrivals', tags: ['Fashion', 'Shirts'] },
  { id: 3, name: 'Long-sleeve Coat', price: 106, image: shopImage3, colors: ['#ddd8c7', '#c5dfc3'], sizes: ['S', 'L', 'XL'], brand: 'Zara', collection: 'Best sellers', tags: ['Fashion', 'Coats'] },
  { id: 4, name: 'Boxy Denim Hat', price: 25, image: shopImage4, colors: ['#a9cbd8', '#003c62'], sizes: ['S', 'M', 'L'], brand: 'Levi’s', collection: 'New arrivals', tags: ['Denim', 'Hats'] },
  { id: 5, name: 'Linen Plain Top', price: 25, image: shopImage5, colors: ['#b7d9bc', '#222222'], sizes: ['M', 'L'], brand: 'Mango', collection: 'Accessories', tags: ['Fashion', 'Tops'] },
  { id: 6, name: 'Oversized T-Shirt', price: 11, image: shopImage6, colors: ['#f2c8dc', '#cdb5cb', '#ffffff'], sizes: ['S', 'M', 'L', 'XL'], brand: 'Zara', collection: 'New arrivals', tags: ['Fashion', 'Shirts'] },
  { id: 7, name: 'Polarised Sunglasses', price: 18, image: shopImage7, colors: ['#222222', '#98755e'], sizes: ['S', 'M', 'L'], brand: 'Al Karam', collection: 'Accessories', tags: ['Accessories', 'Summer'] },
  { id: 8, name: 'Rockstar Jacket', price: 22, image: shopImage8, colors: ['#ceb7c9', '#b4d6de'], sizes: ['M', 'L', 'XL'], brand: 'Levi’s', collection: 'Best sellers', tags: ['Denim', 'Jackets'] },
  { id: 9, name: 'Dotted Black Dress', price: 20, image: shopImage9, colors: ['#063a5d', '#222222', '#b8cbd9'], sizes: ['S', 'M', 'L'], brand: 'Zara', collection: 'New arrivals', tags: ['Fashion', 'Dresses'] },
]

const sizes = ['S', 'M', 'L', 'XL']
const colors = [...new Set(products.flatMap((product) => product.colors))]
const priceRanges = [
  { label: '$0–$50', max: 50 },
  { label: '$50–$100', min: 50, max: 100 },
  { label: '$100–$150', min: 100, max: 150 },
  { label: '$150–$200', min: 150, max: 200 },
  { label: '$200–$300', min: 200, max: 300 },
  { label: '$300–$400', min: 300, max: 400 },
]
const brands = ['Mango', 'Zara', 'Levi’s', 'Al Karam']
const collections = ['All products', 'Best sellers', 'New arrivals', 'Accessories']
const tags = ['Fashion', 'Hats', 'Denim', 'Shirts', 'Tops', 'Dresses', 'Accessories', 'Summer']

const ToggleGroup = ({ title, open, onToggle, children }) => (
  <section className="border-t border-[#ededed] py-4">
    <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between text-left text-[13px] font-medium text-[#222]">
      {title}<span className="text-base leading-none">{open ? '⌃' : '⌄'}</span>
    </button>
    {open && <div className="pt-3">{children}</div>}
  </section>
)

const Collection = () => {
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedCollections, setSelectedCollections] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [priceRange, setPriceRange] = useState('')
  const [sortBy, setSortBy] = useState('Best selling')
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [collectionsOpen, setCollectionsOpen] = useState(true)

  const toggle = (value, values, setter) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value])
  }

  const filteredProducts = useMemo(() => {
    const range = priceRanges.find((item) => item.label === priceRange)
    const filtered = products.filter((product) =>
      (!selectedSizes.length || selectedSizes.some((size) => product.sizes.includes(size))) &&
      (!selectedColors.length || selectedColors.some((color) => product.colors.includes(color))) &&
      (!selectedBrands.length || selectedBrands.includes(product.brand)) &&
      (!selectedCollections.length || selectedCollections.includes('All products') || selectedCollections.includes(product.collection)) &&
      (!selectedTags.length || selectedTags.some((tag) => product.tags.includes(tag))) &&
      (!range || (product.price >= (range.min ?? 0) && product.price <= range.max))
    )

    return [...filtered].sort((a, b) => {
      if (sortBy === 'Price: low to high') return a.price - b.price
      if (sortBy === 'Price: high to low') return b.price - a.price
      if (sortBy === 'Alphabetically, A–Z') return a.name.localeCompare(b.name)
      return a.id - b.id
    })
  }, [selectedSizes, selectedColors, selectedBrands, selectedCollections, selectedTags, priceRange, sortBy])

  const shownProducts = filteredProducts

  return (
    <section className="bg-white pb-16 pt-8 sm:pt-10">
      <header className="mx-auto mb-12 max-w-5xl px-4 text-center sm:mb-16">
        <h1 className="font-serif text-3xl font-semibold text-[#202020] sm:text-4xl">Fashion</h1>
        <p className="mt-2 text-[11px] text-[#777]"><a href="/" className="text-inherit no-underline">Home</a><span className="mx-2">›</span>Fashion</p>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-[150px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
        <aside aria-label="Product filters" className="text-[#282828]">
          <h2 className="mb-5 font-serif text-xl font-semibold">Filters</h2>

          <section className="mb-5">
            <h3 className="mb-2 text-xs font-medium">Size</h3>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((size) => (
                <button key={size} type="button" aria-pressed={selectedSizes.includes(size)} onClick={() => toggle(size, selectedSizes, setSelectedSizes)} className={selectedSizes.includes(size) ? 'min-w-8 rounded border border-black bg-black px-2 py-1 text-[10px] text-white' : 'min-w-8 rounded border border-[#ddd] bg-white px-2 py-1 text-[10px] text-[#555]'}>{size}</button>
              ))}
            </div>
          </section>

          <section className="mb-5">
            <h3 className="mb-2 text-xs font-medium">Colors</h3>
            <div className="grid max-w-[145px] grid-cols-7 gap-1.5">
              {colors.map((color, index) => (
                <button key={color + '-' + index} type="button" aria-label={'Filter color ' + (index + 1)} aria-pressed={selectedColors.includes(color)} onClick={() => toggle(color, selectedColors, setSelectedColors)} className={selectedColors.includes(color) ? 'h-3.5 w-3.5 rounded-full ring-2 ring-black ring-offset-1' : 'h-3.5 w-3.5 rounded-full'} style={{ backgroundColor: color }} />
              ))}
            </div>
          </section>

          <section className="mb-5">
            <h3 className="mb-2 text-xs font-medium">Prices</h3>
            <div className="space-y-1.5">
              {priceRanges.map((range) => (
                <label key={range.label} className="flex cursor-pointer items-center gap-2 text-[10px] text-[#888]">
                  <input type="radio" name="price-range" checked={priceRange === range.label} onChange={() => setPriceRange(range.label)} className="accent-black" />
                  {range.label}
                </label>
              ))}
              {priceRange && <button type="button" onClick={() => setPriceRange('')} className="mt-1 text-[10px] text-[#555] underline">Clear price</button>}
            </div>
          </section>

          <ToggleGroup title="Brand" open={brandsOpen} onToggle={() => setBrandsOpen((open) => !open)}>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex cursor-pointer items-center gap-2 text-[10px] text-[#777]">
                  <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggle(brand, selectedBrands, setSelectedBrands)} className="accent-black" />{brand}
                </label>
              ))}
            </div>
          </ToggleGroup>

          <ToggleGroup title="Collections" open={collectionsOpen} onToggle={() => setCollectionsOpen((open) => !open)}>
            <div className="space-y-2">
              {collections.map((collection) => (
                <label key={collection} className="flex cursor-pointer items-center gap-2 text-[10px] text-[#777]">
                  <input type="checkbox" checked={selectedCollections.includes(collection)} onChange={() => toggle(collection, selectedCollections, setSelectedCollections)} className="accent-black" />{collection}
                </label>
              ))}
            </div>
          </ToggleGroup>

          <section className="border-t border-[#ededed] py-4">
            <h3 className="mb-3 text-[13px] font-medium">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <button key={tag} type="button" aria-pressed={selectedTags.includes(tag)} onClick={() => toggle(tag, selectedTags, setSelectedTags)} className={selectedTags.includes(tag) ? 'rounded bg-black px-1.5 py-1 text-[9px] text-white' : 'rounded bg-[#f6f6f6] px-1.5 py-1 text-[9px] text-[#777]'}>{tag}</button>
              ))}
            </div>
          </section>

          <button type="button" onClick={() => { setSelectedSizes([]); setSelectedColors([]); setSelectedBrands([]); setSelectedCollections([]); setSelectedTags([]); setPriceRange('') }} className="mt-2 text-[10px] text-[#555] underline">Clear all filters</button>
        </aside>

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] text-[#555]" aria-live="polite">{filteredProducts.length} products</p>
            <div className="flex items-center gap-2">
              <label htmlFor="collection-sort" className="sr-only">Sort products</label>
              <select id="collection-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded border border-[#e5e5e5] bg-white px-2 py-1.5 text-[10px] text-[#444]">
                <option>Best selling</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
                <option>Alphabetically, A–Z</option>
              </select>
            </div>
          </div>

          {shownProducts.length ? (
            <div className="grid grid-cols-1 gap-x-3 gap-y-7 min-[520px]:grid-cols-2 sm:gap-x-5 md:grid-cols-3">
              {shownProducts.map((product) => (
                <Link key={product.id} to={'/product/' + product.id} className="min-w-0 text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
                  <div className="aspect-[3/4] overflow-hidden bg-[#f1f1f1]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mt-2 truncate text-[11px] font-medium text-[#222]">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] text-[#333]">{'$' + product.price.toFixed(2)}</p>
                  <div className="mt-2 flex gap-1.5">
                    {product.colors.map((color) => <span key={color} className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: color }} />)}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-14 text-center text-sm text-[#777]" role="status">No products match these filters.</p>
          )}

          {shownProducts.length > 0 && (
            <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2 text-[11px] text-[#222]">
              <span aria-current="page" className="grid h-8 w-8 place-items-center rounded-full bg-[#f1f1f1]">1</span>
              <span className="grid h-8 w-8 place-items-center">2</span>
              <span className="grid h-8 w-8 place-items-center">3</span>
              <span aria-hidden="true" className="grid h-8 w-8 place-items-center">›</span>
            </nav>
          )}

        </div>
      </div>
    </section>
  )
}

export default Collection



