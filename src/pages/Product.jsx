import { useParams } from 'react-router-dom'
import Deals from '../component/Deals'
import Footer from '../component/Footer'
import Packages from '../component/Packages'
import Pickyblinders from '../component/Pickyblinders'
import ProductDetails from '../component/ProductPage/ProductDetails'
import ShopNavbar from '../component/ShopNow/ShopNavbar'
import Subscribe from '../component/Subscribe'
import subscribeLeft from '../assets/optimized/subscribe1.webp'
import subscribeRight from '../assets/optimized/subscribe2.webp'
import products from '../data/products'

const Product = () => {
  const { productId } = useParams()
  const product = products.find((item) => item.id === Number(productId))
  return (
    <main>
      <ShopNavbar />
      <ProductDetails key={product?.id ?? productId} product={product} />
      <Pickyblinders />
      <Packages />
      <Deals />
      <Subscribe leftImage={subscribeLeft} rightImage={subscribeRight} />
      <Footer />
    </main>
  )
}

export default Product
