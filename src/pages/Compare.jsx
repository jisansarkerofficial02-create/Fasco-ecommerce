import { Link } from 'react-router-dom'
import ShopNavbar from '../component/ShopNow/ShopNavbar'
import Subscribe from '../component/Subscribe'
import Footer from '../component/Footer'
import subscribeLeft from '../assets/optimized/subscribe1.webp'
import subscribeRight from '../assets/optimized/subscribe2.webp'
import products from '../data/products'
import { useCart } from '../context/CartContext'

const Compare = () => {
  const { compareIds, toggleCompare } = useCart()
  const comparedProducts = products.filter((product) => compareIds.includes(product.id))
  const rows = [
    ['Price', (product) => `$${product.price.toFixed(2)}`],
    ['Brand', (product) => product.brand],
    ['Collection', (product) => product.collection],
    ['Available sizes', (product) => product.sizes.join(', ')],
    ['Rating', (product) => `${product.rating} / 5 (${product.reviewCount} reviews)`],
    ['Stock', (product) => `${product.stock} available`],
  ]

  return (
    <main className="min-h-screen">
      <ShopNavbar cartContainer />
      <section className="mx-auto min-h-[46vh] max-w-[1000px] px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-semibold text-[#202020]">Compare Products</h1>
          <p className="mt-2 text-xs text-[#777]">Compare up to three products side by side.</p>
        </header>
        {comparedProducts.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] border-collapse text-left text-xs">
              <thead><tr><th className="w-32 border-b border-[#ddd] p-3 font-medium">Details</th>{comparedProducts.map((product) => <th key={product.id} className="border-b border-[#ddd] p-3 font-medium">{product.name}</th>)}</tr></thead>
              <tbody>
                <tr><th className="p-3 font-medium">Product</th>{comparedProducts.map((product) => <td key={product.id} className="p-3"><Link to={`/product/${product.id}`} className="block w-28 text-inherit no-underline sm:w-36"><img src={product.image} alt={product.name} loading="lazy" decoding="async" className="aspect-[3/4] w-full object-cover" /><span className="mt-2 block">View details</span></Link></td>)}</tr>
                {rows.map(([label, value]) => <tr key={label} className="border-t border-[#eee]"><th className="p-3 font-medium">{label}</th>{comparedProducts.map((product) => <td key={product.id} className="p-3 text-[#555]">{value(product)}</td>)}</tr>)}
                <tr className="border-t border-[#eee]"><th className="p-3 font-medium">Actions</th>{comparedProducts.map((product) => <td key={product.id} className="p-3"><button type="button" onClick={() => toggleCompare(product.id)} className="text-[11px] text-[#777] underline">Remove</button></td>)}</tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center"><p className="text-sm text-[#777]">You have not added products to compare.</p><Link to="/shop" className="mt-5 inline-flex bg-black px-6 py-3 text-[11px] text-white no-underline">Browse products</Link></div>
        )}
      </section>
      <Subscribe leftImage={subscribeLeft} rightImage={subscribeRight} />
      <Footer />
    </main>
  )
}

export default Compare
