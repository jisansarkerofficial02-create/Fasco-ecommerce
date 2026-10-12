import { Link } from 'react-router-dom'
import ShopNavbar from '../component/ShopNow/ShopNavbar'
import Subscribe from '../component/Subscribe'
import Footer from '../component/Footer'
import subscribeLeft from '../assets/subscribe1.svg'
import subscribeRight from '../assets/subscribe2.svg'
import products from '../data/products'
import { useCart } from '../context/CartContext'

const Wishlist = () => {
  const { wishlist, toggleFavorite } = useCart()
  const savedProducts = products.filter((product) => wishlist.includes(product.id))

  return (
    <main className="min-h-screen">
      <ShopNavbar cartContainer />
      <section className="mx-auto min-h-[46vh] max-w-[900px] px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="font-serif text-3xl font-semibold text-[#202020]">My Wishlist</h1>
          <p className="mt-2 text-xs text-[#777]">{savedProducts.length} saved {savedProducts.length === 1 ? 'item' : 'items'}</p>
        </header>

        {savedProducts.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {savedProducts.map((product) => (
              <article key={product.id} className="min-w-0">
                <Link to={`/product/${product.id}`} className="block aspect-[3/4] overflow-hidden bg-[#f2f2f2]">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex items-start justify-between gap-2 pt-2">
                  <div className="min-w-0">
                    <Link to={`/product/${product.id}`} className="block truncate text-xs font-medium text-[#222] no-underline">{product.name}</Link>
                    <p className="mt-1 text-[11px] text-[#555]">${product.price.toFixed(2)}</p>
                  </div>
                  <button type="button" onClick={() => toggleFavorite(product.id)} aria-label={`Remove ${product.name} from wishlist`} className="shrink-0 text-lg leading-none text-[#b33]">♥</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-sm text-[#777]">Your wishlist is empty.</p>
            <Link to="/shop" className="mt-5 inline-flex bg-black px-6 py-3 text-[11px] text-white no-underline">Explore the shop</Link>
          </div>
        )}
      </section>
      <Subscribe leftImage={subscribeLeft} rightImage={subscribeRight} />
      <Footer />
    </main>
  )
}

export default Wishlist
