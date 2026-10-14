import { useState } from 'react'
import { Link } from 'react-router-dom'
import ShopNavbar from '../component/ShopNow/ShopNavbar'
import Subscribe from '../component/Subscribe'
import Footer from '../component/Footer'
import productIcon from '../assets/product-icon.png'
import subscribeLeft from '../assets/optimized/subscribe1.webp'
import subscribeRight from '../assets/optimized/subscribe2.webp'
import { useCart } from '../context/CartContext'

const FREE_SHIPPING_THRESHOLD = 75
const SHIPPING_FEE = 8
const GIFT_WRAP_PRICE = 10

const Checkout = () => {
  const { items, subtotal, itemCount, giftWrap } = useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountError, setDiscountError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : SHIPPING_FEE
  const discount = discountApplied ? subtotal * 0.1 : 0
  const wrapCost = giftWrap && items.length ? GIFT_WRAP_PRICE : 0
  const total = Math.max(subtotal - discount + shipping + wrapCost, 0)

  const applyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'FASCO10') {
      setDiscountApplied(true)
      setDiscountError('')
      return
    }
    setDiscountApplied(false)
    setDiscountError('Enter the demo code FASCO10 to get 10% off.')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setOrderSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <ShopNavbar cartContainer />
      <header className="border-b border-[#ddd] py-5 text-center sm:py-6">
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">FASCO Demo Checkout</h1>
      </header>

      {orderSubmitted && (
        <div role="status" className="mx-auto mt-5 max-w-[900px] px-4 sm:px-6">
          <div className="border border-[#b9dbc4] bg-[#f3fbf5] px-4 py-3 text-sm text-[#285b36]">Demo order details accepted. No payment was processed.</div>
        </div>
      )}

      <div className="mx-auto grid max-w-[900px] grid-cols-1 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="order-2 px-4 py-7 sm:px-6 sm:py-9 lg:order-1 lg:border-r lg:border-[#ddd] lg:px-0 lg:pr-6">
          <section>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-serif text-2xl font-semibold text-[#4b4b4b]">Contact</h2>
              <p className="text-[10px] text-[#777]">Have an account? <button type="button" className="text-blue-700">Create Account</button></p>
            </div>
            <label className="sr-only" htmlFor="checkout-email">Email address</label>
            <input id="checkout-email" type="email" name="email" autoComplete="email" required placeholder="Email Address" className="h-11 w-full border border-[#cfcfcf] px-3 text-xs outline-none placeholder:text-[#999] focus:border-black" />
          </section>

          <section className="mt-7">
            <h2 className="mb-3 font-serif text-2xl font-semibold text-[#4b4b4b]">Delivery</h2>
            <div className="space-y-2">
              <label className="sr-only" htmlFor="checkout-country">Country / Region</label>
              <select id="checkout-country" name="country" required defaultValue="" className="h-11 w-full border border-[#cfcfcf] bg-white px-3 text-xs text-[#777] outline-none focus:border-black">
                <option value="" disabled>Country / Region</option>
                <option>Bangladesh</option><option>United States</option><option>United Kingdom</option><option>Canada</option>
              </select>
              <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                <input name="firstName" autoComplete="given-name" required placeholder="First Name" className="h-11 min-w-0 border border-[#cfcfcf] px-3 text-xs outline-none placeholder:text-[#999] focus:border-black" />
                <input name="lastName" autoComplete="family-name" required placeholder="Last Name" className="h-11 min-w-0 border border-[#cfcfcf] px-3 text-xs outline-none placeholder:text-[#999] focus:border-black" />
              </div>
              <input name="address" autoComplete="street-address" required placeholder="Address" className="h-11 w-full border border-[#cfcfcf] px-3 text-xs outline-none placeholder:text-[#999] focus:border-black" />
              <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                <input name="city" autoComplete="address-level2" required placeholder="City" className="h-11 min-w-0 border border-[#cfcfcf] px-3 text-xs outline-none placeholder:text-[#999] focus:border-black" />
                <input name="postalCode" autoComplete="postal-code" required placeholder="Postal Code" className="h-11 min-w-0 border border-[#cfcfcf] px-3 text-xs outline-none placeholder:text-[#999] focus:border-black" />
              </div>
              <input name="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" className="h-11 w-full border border-[#cfcfcf] px-3 text-xs outline-none placeholder:text-[#999] focus:border-black" />
            </div>
            <label className="mt-3 flex items-center gap-2 text-[10px] text-[#888]"><input type="checkbox" className="h-4 w-4 accent-black" />Save this info for future</label>
          </section>

          <section className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-[#4b4b4b]">Payment</h2>
            </div>
            <div className="border border-[#cfcfcf]">
              <label htmlFor="checkout-payment" className="sr-only">Payment method</label>
              <select id="checkout-payment" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className="h-11 w-full border-b border-[#cfcfcf] bg-white px-3 text-xs outline-none">
                <option value="card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
              {paymentMethod === 'card' ? (
                <div className="space-y-2 bg-[#f6f6f6] p-3">
                  <div className="relative">
                    <input name="cardNumber" inputMode="numeric" autoComplete="cc-number" required maxLength={19} placeholder="Card Number" className="h-10 w-full border border-[#cfcfcf] bg-white px-3 pr-10 text-xs outline-none placeholder:text-[#999] focus:border-black" />
                    <span aria-hidden="true" className="absolute right-3 top-3 text-xs text-[#888]">&#128274;</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                    <input name="expiry" autoComplete="cc-exp" required placeholder="Expiration Date (MM/YY)" className="h-10 min-w-0 border border-[#cfcfcf] bg-white px-3 text-[10px] outline-none placeholder:text-[#999] focus:border-black" />
                    <input name="securityCode" inputMode="numeric" autoComplete="cc-csc" required maxLength={4} placeholder="Security Code" className="h-10 min-w-0 border border-[#cfcfcf] bg-white px-3 text-[10px] outline-none placeholder:text-[#999] focus:border-black" />
                  </div>
                  <input name="cardholder" autoComplete="cc-name" required placeholder="Card Holder Name" className="h-10 w-full border border-[#cfcfcf] bg-white px-3 text-xs outline-none placeholder:text-[#999] focus:border-black" />
                  <label className="flex items-center gap-2 pt-1 text-[10px] text-[#888]"><input type="checkbox" className="h-4 w-4 accent-black" />Save this info for future</label>
                </div>
              ) : (
                <p className="bg-[#f6f6f6] p-4 text-xs text-[#777]">PayPal is shown for the checkout design preview. No payment will be sent.</p>
              )}
            </div>
            <button type="submit" disabled={items.length === 0} className="mt-4 h-12 w-full rounded bg-black text-[11px] text-white shadow-[0_8px_16px_rgb(0_0_0_/_18%)] transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-40">Pay Now · ${total.toFixed(2)}</button>
            <p className="mt-3 text-center text-[9px] text-[#888]">Demo checkout only. Payment details are not stored or transmitted.</p>
          </section>
        </form>

        <aside className="order-1 min-h-[300px] bg-[#f6f6f6] px-4 py-7 sm:px-6 sm:py-9 lg:order-2 lg:min-h-[560px] lg:pl-8 lg:pr-10">
          {items.length === 0 ? (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center">
              <p className="font-serif text-lg">Your cart is empty</p>
              <Link to="/shop" className="mt-3 text-xs underline underline-offset-2">Return to shop</Link>
            </div>
          ) : (
            <>
              <ul className="m-0 list-none space-y-4 p-0">
                {items.map((item) => (
                  <li key={item.key} className="flex items-center gap-3">
                    <div className="relative h-[72px] w-[64px] shrink-0 bg-[#e8e8e8]">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#e21c2a] px-1 text-[9px] text-white">{item.quantity}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium leading-4">{item.name}</p>
                      <p className="mt-1 text-[9px] text-[#777]">{item.colorName} · {item.size}</p>
                    </div>
                    <strong className="max-w-[72px] shrink-0 text-right text-[10px] font-normal sm:max-w-none">${(item.price * item.quantity).toFixed(2)}</strong>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex gap-2">
                <label className="sr-only" htmlFor="discount-code">Discount code</label>
                <input id="discount-code" value={discountCode} onChange={(event) => { setDiscountCode(event.target.value); setDiscountError('') }} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); applyDiscount() } }} placeholder="Discount code" className="h-10 min-w-0 flex-1 bg-white px-3 text-[10px] outline-none ring-1 ring-[#eee] focus:ring-black" />
                <button type="button" onClick={applyDiscount} className="h-10 w-[88px] rounded bg-black text-[10px] text-white shadow-md">{discountApplied ? 'Applied' : 'Apply'}</button>
              </div>
              {discountError && <p role="alert" className="mt-2 text-[10px] text-[#c44]">{discountError}</p>}
              {discountApplied && <p role="status" className="mt-2 text-[10px] text-green-700">FASCO10 applied — 10% off.</p>}

              <dl className="mt-4 space-y-2 text-[10px]">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
                {discount > 0 && <div className="flex justify-between text-green-700"><dt>Discount</dt><dd>−${discount.toFixed(2)}</dd></div>}
                <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping ? `$${shipping.toFixed(2)}` : 'Free'}</dd></div>
                {wrapCost > 0 && <div className="flex justify-between"><dt>Gift wrap</dt><dd>${wrapCost.toFixed(2)}</dd></div>}
                <div className="flex justify-between border-t border-[#ddd] pt-2 font-medium"><dt>Total ({itemCount} items)</dt><dd>${total.toFixed(2)}</dd></div>
              </dl>

              <div className="mt-6 border-t border-[#e3e3e3] pt-4 text-center">
                <img src={productIcon} alt="Accepted payment methods" className="mx-auto max-h-7 w-full max-w-[220px] object-contain" />
                <p className="mt-2 text-[9px] text-[#666]">Guarantee safe &amp; secure checkout</p>
              </div>
            </>
          )}
        </aside>
      </div>

      <Subscribe leftImage={subscribeLeft} rightImage={subscribeRight} />
      <Footer />
    </main>
  )
}

export default Checkout
