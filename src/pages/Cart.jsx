import { Link } from 'react-router-dom'
import Footer from '../component/Footer'
import ShopNavbar from '../component/ShopNow/ShopNavbar'
import Subscribe from '../component/Subscribe'
import subscribeLeft from '../assets/subscribe1.svg'
import subscribeRight from '../assets/subscribe2.svg'
import { useCart } from '../context/CartContext'

const GIFT_WRAP_PRICE = 10

const Cart = () => {
  const { items, updateQuantity, removeItem, subtotal, itemCount, giftWrap, setGiftWrap } = useCart()
  const total = subtotal + (giftWrap && items.length ? GIFT_WRAP_PRICE : 0)

  return (
    <main>
      <ShopNavbar cartContainer />
      <section className="mx-auto min-h-[46vh] max-w-[900px] px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
        <header className="mb-10 text-center sm:mb-12">
          <h1 className="font-serif text-3xl font-semibold text-[#202020]">Shopping Cart</h1>
          <p className="mt-2 text-[10px] text-[#777]"><Link to="/" className="text-inherit no-underline">Home</Link><span className="mx-2">&rsaquo;</span>Your Shopping Cart</p>
        </header>

        {items.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-[#777]">Your cart is empty.</p>
            <Link to="/shop" className="mt-5 inline-block bg-black px-6 py-3 text-[11px] text-white no-underline">Continue shopping</Link>
          </div>
        ) : (
          <>
            <div>
              <div>
                <div className="hidden grid-cols-[minmax(0,1fr)_100px_130px_100px] gap-5 border-b border-[#ddd] pb-4 text-[11px] sm:grid">
                  <span>Product</span><span>Price</span><span>Quantity</span><span className="text-right">Total</span>
                </div>

                <ul className="m-0 list-none divide-y divide-[#ddd] p-0">
                  {items.map((item) => (
                    <li key={item.key} className="grid grid-cols-2 items-start gap-x-4 gap-y-3 border-b border-[#ddd] py-4 sm:grid-cols-[minmax(0,1fr)_100px_130px_100px] sm:gap-5 sm:border-0 sm:py-5">
                  <div className="col-span-2 flex min-w-0 gap-3 sm:col-span-1 sm:gap-4">
                    <Link to={'/product/' + item.productId} className="h-[88px] w-[64px] shrink-0 overflow-hidden bg-[#f1f1f1] sm:h-[105px] sm:w-[78px]">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0 pt-1">
                      <Link to={'/product/' + item.productId} className="block text-[10px] font-medium leading-4 text-[#222] no-underline sm:text-xs">{item.name}</Link>
                      <p className="mt-1 text-[9px] text-[#888]">Color: {item.colorName}</p>
                      <p className="mt-0.5 text-[9px] text-[#888]">Size: {item.size}</p>
                      <button type="button" onClick={() => removeItem(item.key)} className="mt-2 text-[9px] text-[#888] underline underline-offset-2">Remove</button>
                    </div>
                  </div>
                  <span className="pt-1 text-[10px] sm:text-[11px]"><span className="mr-2 text-[#888] sm:hidden">Price</span>${item.price.toFixed(2)}</span>
                  <div className="flex items-center justify-between sm:block">
                    <span className="text-[10px] text-[#888] sm:hidden">Quantity</span>
                    <div className="flex h-7 w-fit items-center border border-[#ddd] sm:h-8">
                    <button type="button" aria-label={'Decrease ' + item.name + ' quantity'} onClick={() => updateQuantity(item.key, item.quantity - 1)} className="h-full w-6 text-[10px] sm:w-7">&minus;</button>
                    <span className="w-6 text-center text-[9px] sm:w-7 sm:text-[10px]">{String(item.quantity).padStart(2, '0')}</span>
                    <button type="button" aria-label={'Increase ' + item.name + ' quantity'} onClick={() => updateQuantity(item.key, item.quantity + 1)} className="h-full w-6 text-[10px] sm:w-7">+</button>
                    </div>
                  </div>
                  <strong className="col-span-2 flex justify-between pt-1 text-[10px] font-medium sm:col-span-1 sm:justify-end sm:text-[11px]"><span className="font-normal text-[#888] sm:hidden">Total</span>${(item.price * item.quantity).toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="ml-auto w-full max-w-[430px] pt-4 sm:pt-5">
              <label className="flex cursor-pointer items-center gap-2 border-b border-[#ddd] pb-4 text-[10px] text-[#888]">
                <input type="checkbox" checked={giftWrap} onChange={(event) => setGiftWrap(event.target.checked)} className="h-3.5 w-3.5 accent-black" />
                <span><strong className="font-normal text-black">For $10.00</strong> Please Wrap The Product</span>
              </label>
              <div className="flex justify-between py-4 text-[11px]"><span>Subtotal ({itemCount} items)</span><strong>${total.toFixed(2)}</strong></div>
              <p className="-mt-2 text-[9px] text-[#888]">Shipping and taxes calculated at checkout.</p>
              <Link to="/checkout" className="mt-4 flex h-10 w-full items-center justify-center rounded bg-black text-[10px] text-white no-underline shadow-[0_8px_16px_rgb(0_0_0_/_16%)] transition hover:bg-[#333]">Checkout</Link>
              <Link to="/shop" className="mt-2 block text-center font-serif text-[10px] text-[#222] underline underline-offset-2">Continue Shopping</Link>
            </div>
          </>
        )}
      </section>

      <Subscribe leftImage={subscribeLeft} rightImage={subscribeRight} />
      <Footer />
    </main>
  )
}

export default Cart
