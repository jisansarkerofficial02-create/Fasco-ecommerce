import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const FREE_SHIPPING_THRESHOLD = 75
const GIFT_WRAP_PRICE = 10

const MiniCartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, itemCount, subtotal, giftWrap, setGiftWrap } = useCart()
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  useEffect(() => {
    if (!isOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, setIsOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" aria-label="Shopping cart">
      <button type="button" aria-label="Close cart" onClick={() => setIsOpen(false)} className="absolute inset-0 cursor-default bg-black/25" />
      <aside role="dialog" aria-modal="true" aria-labelledby="mini-cart-title" className="relative z-10 flex h-full w-full max-w-[390px] flex-col bg-white shadow-2xl">
        <header className="border-b border-[#e5e5e5] px-5 pb-4 pt-5 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 id="mini-cart-title" className="font-serif text-2xl text-[#171717]">Shopping Cart <span className="font-sans text-sm text-[#888]">({itemCount})</span></h2>
            <button type="button" aria-label="Close cart" onClick={() => setIsOpen(false)} className="grid h-8 w-8 place-items-center text-2xl leading-none text-[#555] hover:text-black">&times;</button>
          </div>
          {amountToFreeShipping > 0 ? (
            <p className="mt-2 text-[11px] text-[#777]">Buy <strong className="text-black">${amountToFreeShipping.toFixed(2)}</strong> more and get <strong className="text-black">Free Shipping</strong></p>
          ) : items.length > 0 ? (
            <p className="mt-2 text-[11px] text-[#333]">You unlocked <strong>Free Shipping!</strong></p>
          ) : null}
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#eee]"><div className="h-full rounded-full bg-black transition-all" style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }} /></div>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="font-serif text-xl">Your cart is empty</p>
            <p className="mt-2 text-xs text-[#777]">Add something you love and it will show up here.</p>
            <button type="button" onClick={() => setIsOpen(false)} className="mt-5 bg-black px-6 py-3 text-[11px] text-white">Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 sm:px-6">
              <ul className="m-0 list-none divide-y divide-[#e5e5e5] p-0">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-3 py-5">
                    <Link to={'/product/' + item.productId} onClick={() => setIsOpen(false)} className="h-[94px] w-[72px] shrink-0 overflow-hidden bg-[#f2f2f2]">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link to={'/product/' + item.productId} onClick={() => setIsOpen(false)} className="block truncate text-[12px] font-medium text-[#222] no-underline">{item.name}</Link>
                          <p className="mt-1 text-[10px] text-[#888]">Color: {item.colorName} <span className="mx-1">|</span> Size: {item.size}</p>
                        </div>
                        <button type="button" aria-label={'Remove ' + item.name} onClick={() => removeItem(item.key)} className="text-sm text-[#999] hover:text-black">&times;</button>
                      </div>
                      <p className="mt-2 text-[11px] font-medium">${item.price.toFixed(2)}</p>
                      <div className="mt-2 flex h-7 w-fit items-center border border-[#e4e4e4]">
                        <button type="button" aria-label={'Decrease ' + item.name + ' quantity'} onClick={() => updateQuantity(item.key, item.quantity - 1)} className="h-full w-7 text-xs">&minus;</button>
                        <span aria-live="polite" className="w-7 text-center text-[10px]">{String(item.quantity).padStart(2, '0')}</span>
                        <button type="button" aria-label={'Increase ' + item.name + ' quantity'} onClick={() => updateQuantity(item.key, item.quantity + 1)} className="h-full w-7 text-xs">+</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <label className="flex cursor-pointer items-center gap-2 border-y border-[#e5e5e5] py-4 text-[10px] text-[#777]">
                <input type="checkbox" checked={giftWrap} onChange={(event) => setGiftWrap(event.target.checked)} className="accent-black" />
                <span><strong className="text-black">For $10.00</strong> Please wrap the product</span>
              </label>
            </div>

            <footer className="border-t border-[#e5e5e5] px-5 pb-5 pt-4 sm:px-6">
              <div className="flex items-center justify-between text-[11px]"><span>Subtotal</span><strong>${(subtotal + (giftWrap ? GIFT_WRAP_PRICE : 0)).toFixed(2)}</strong></div>
              <p className="mt-2 text-[9px] text-[#888]">Shipping and taxes calculated at checkout.</p>
              <Link to="/checkout" onClick={() => setIsOpen(false)} className="mt-4 flex h-11 w-full items-center justify-center rounded bg-black text-[11px] text-white no-underline shadow-lg transition hover:bg-[#333]">Checkout</Link>
              <Link to="/cart" onClick={() => setIsOpen(false)} className="mt-2 block text-center text-[10px] text-[#222] underline underline-offset-2">View Cart</Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

export default MiniCartDrawer
