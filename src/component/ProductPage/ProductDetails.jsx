import { useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../../data/products'
import productIcon from '../../assets/product-icon.png'
import { useCart } from '../../context/CartContext'

const ProductDetails = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? '')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  const [actionMessage, setActionMessage] = useState('')
  const { addItem, wishlist, toggleFavorite, compareIds, toggleCompare } = useCart()
  const isFavorite = product ? wishlist.includes(product.id) : false
  const isCompared = product ? compareIds.includes(product.id) : false

  if (!product) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif text-3xl text-[#202020]">Product not found</h1>
        <Link to="/shop" className="mt-5 inline-block text-sm underline underline-offset-4">Back to Shop</Link>
      </section>
    )
  }

  const description = product.description || `${product.name} from ${product.brand}'s ${product.collection.toLowerCase()} collection. Choose your preferred size and color.`
  const rating = product.rating ?? 4.8
  const reviewCount = product.reviewCount ?? 3
  const stock = product.stock ?? 9
  const colorNames = product.colorNames ?? product.colors.map((_, index) => `Color ${index + 1}`)
  const stockPercent = Math.min((stock / 20) * 100, 100)

  const shareProduct = async () => {
    const shareData = { title: product.name, text: `Check out ${product.name} at FASCO`, url: window.location.href }
    try {
      if (navigator.share) await navigator.share(shareData)
      else {
        await navigator.clipboard.writeText(shareData.url)
        setActionMessage('Product link copied.')
      }
    } catch (error) {
      if (error.name !== 'AbortError') setActionMessage('Could not share this product from this browser.')
    }
  }

  return (
    <main className="mx-auto max-w-[1050px] px-4 pb-16 pt-7 sm:px-6 sm:pt-10 lg:pb-20">
      <p className="mb-6 text-xs text-[#777] sm:mb-8">
        <Link to="/" className="text-inherit no-underline hover:text-black">Home</Link>
        <span className="mx-2">&rsaquo;</span>
        <Link to="/shop" className="text-inherit no-underline hover:text-black">Shop</Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-[#444]">{product.name}</span>
      </p>

      <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-10 lg:gap-12" aria-labelledby="product-title">
        <div className="grid min-w-0 grid-cols-[44px_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-4">
          <div className="flex max-h-[690px] flex-col gap-2 overflow-y-auto">
            {products.map((galleryProduct) => (
              <Link key={galleryProduct.id} to={'/product/' + galleryProduct.id} aria-label={'View ' + galleryProduct.name} aria-current={product.id === galleryProduct.id ? 'page' : undefined} className={product.id === galleryProduct.id ? 'aspect-[3/4] w-full shrink-0 overflow-hidden border border-[#333] bg-[#f2f2f2] p-0.5' : 'aspect-[3/4] w-full shrink-0 overflow-hidden border border-transparent bg-[#f2f2f2] p-0.5 transition hover:border-[#999]'}>
                <img src={galleryProduct.image} alt={galleryProduct.name} className="h-full w-full object-cover" />
              </Link>
            ))}
          </div>
          <div className="aspect-[3/4] max-h-[690px] overflow-hidden bg-[#f2f2f2]">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="min-w-0 text-[#171717] md:pt-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-serif text-[11px] tracking-wide text-[#666]">{product.brand || 'FASCO'}</p>
              <h1 id="product-title" className="mt-2 font-serif text-[26px] font-semibold leading-tight sm:text-3xl">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2" aria-label={`${rating} out of 5 stars, ${reviewCount} reviews`}>
                <span className="text-sm tracking-[1px]">{Array.from({ length: 5 }, (_, index) => <span key={index} className={index < Math.round(rating) ? 'text-[#111]' : 'text-[#c9c9c9]'}>&#9733;</span>)}</span>
                <span className="text-[11px] text-[#555]">({reviewCount} reviews)</span>
              </div>
            </div>
            <button type="button" aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={isFavorite} onClick={() => toggleFavorite(product.id)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#eee] text-xl transition hover:border-black">
              {isFavorite ? <span className="text-[#c44]">&#9829;</span> : <span>&#9734;</span>}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
            {product.compareAtPrice > product.price && <>
              <p className="text-xs text-[#999] line-through">${product.compareAtPrice.toFixed(2)}</p>
              <span className="rounded bg-[#fbe7e7] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#c54a4a]">Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%</span>
            </>}
          </div>

          <p className="mt-4 text-xs leading-5 text-[#888]">{description}</p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border border-[#f2d5d5] bg-[#fff8f8] px-3 py-2.5 text-[11px] text-[#d34d4d]">
            <span>{product.collection}</span>
            <span className="font-medium">A FASCO favorite</span>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between gap-3 text-[10px] text-[#777]">
              <span>{stock > 0 ? `${stock} item${stock === 1 ? '' : 's'} available` : 'Currently unavailable'}</span>
              <span>{stock > 0 ? 'In stock' : 'Out of stock'}</span>
            </div>
            <div className="mt-2 h-[3px] overflow-hidden bg-[#e6e6e6]">
              <div className="h-full bg-[#e75252] transition-all" style={{ width: `${stockPercent}%` }} />
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2.5 text-[11px]"><strong>Size:</strong> <span className="text-[#555]">{selectedSize}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button key={size} type="button" aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)} className={selectedSize === size ? 'h-9 min-w-9 rounded border border-black bg-black px-3 text-[11px] text-white' : 'h-9 min-w-9 rounded border border-[#e7e7e7] bg-white px-3 text-[11px] text-[#222] transition hover:border-black'}>{size}</button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2.5 text-[11px]"><strong>Color:</strong> <span className="text-[#555]">{colorNames[product.colors.indexOf(selectedColor)]}</span></p>
            <div className="flex gap-2.5">
              {product.colors.map((color, index) => (
                <button key={color} type="button" aria-label={`Select ${colorNames[index]}`} aria-pressed={selectedColor === color} onClick={() => setSelectedColor(color)} className={selectedColor === color ? 'grid h-7 w-7 place-items-center rounded-full ring-1 ring-black ring-offset-2' : 'grid h-7 w-7 place-items-center rounded-full'}>
                  <span className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: color }} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="product-quantity" className="mb-2 block text-[11px]">Quantity</label>
            <div className="flex flex-col gap-3 min-[430px]:flex-row">
              <div id="product-quantity" className="flex h-10 w-fit items-center rounded border border-[#e7e7e7]">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="h-full w-9 text-sm">&minus;</button>
                <span aria-live="polite" className="w-7 text-center text-[11px]">{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => Math.min(stock || 99, current + 1))} className="h-full w-9 text-sm">+</button>
              </div>
              <button type="button" disabled={!stock} onClick={() => addItem(product, selectedSize, selectedColor, colorNames[product.colors.indexOf(selectedColor)], quantity)} className="h-10 flex-1 rounded border border-[#222] px-5 text-[11px] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40">{stock ? 'Add to cart' : 'Out of stock'}</button>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-[#eee] pb-4 text-[10px]">
            <button type="button" aria-pressed={isCompared} onClick={() => { toggleCompare(product.id); setActionMessage(isCompared ? 'Removed from comparison.' : compareIds.length >= 3 ? 'You can compare up to 3 products.' : 'Added to comparison.') }} className="flex items-center gap-2"><span aria-hidden="true">&#8645;</span>{isCompared ? 'Compared' : 'Compare'}</button>
            <a href={`mailto:?subject=${encodeURIComponent(`Question about ${product.name}`)}`} className="flex items-center gap-2 text-inherit no-underline"><span aria-hidden="true">&#9432;</span>Ask a question</a>
            <button type="button" onClick={shareProduct} className="flex items-center gap-2"><span aria-hidden="true">&#10150;</span>Share</button>
          </div>
          {(actionMessage || compareIds.length > 0) && <div className="pt-3 text-[10px] text-[#666]">
            {actionMessage && <p role="status">{actionMessage}</p>}
            {compareIds.length > 0 && <Link to="/compare" className="mt-1 inline-block text-inherit underline underline-offset-2">View comparison ({compareIds.length})</Link>}
          </div>}

          <div className="space-y-2 py-4 text-[10px] leading-5">
            <p><strong>Estimated Delivery:</strong> See options at checkout</p>
            <p><strong>Shipping &amp; Returns:</strong> Details available at checkout</p>
          </div>

          <div className="bg-[#f7f7f7] px-4 py-4 text-center">
            <img src={productIcon} alt="Accepted payment methods" className="mx-auto h-auto max-h-8 w-full max-w-[220px] object-contain" />
            <p className="mt-3 text-[10px]">Guarantee safe &amp; secure checkout</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails
