import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ShopNow from './pages/ShopNow'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import Compare from './pages/Compare'
import MiniCartDrawer from './component/MiniCartDrawer'
import { CartProvider } from './context/CartContext'

const App = () => (
  <BrowserRouter>
    <CartProvider>
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
      <MiniCartDrawer />
    </CartProvider>
  </BrowserRouter>
)

export default App

