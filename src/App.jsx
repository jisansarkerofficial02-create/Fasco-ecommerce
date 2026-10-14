import { lazy, Suspense, useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import MiniCartDrawer from './component/MiniCartDrawer'
import { CartProvider } from './context/CartContext'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const Home = lazy(() => import('./pages/Home'))
const ShopNow = lazy(() => import('./pages/ShopNow'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Compare = lazy(() => import('./pages/Compare'))

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <CartProvider>
      <Suspense fallback={<div className="grid min-h-screen place-items-center text-sm text-[#777]">Loading FASCO…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopNow />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="*" element={<Home />} />
      </Routes>
      </Suspense>
      <MiniCartDrawer />
    </CartProvider>
  </BrowserRouter>
)

export default App
