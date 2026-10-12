import { useParams } from 'react-router-dom'
import Deals from '../component/Deals'
import Footer from '../component/Footer'
import Packages from '../component/Packages'
import Pickyblinders from '../component/Pickyblinders'
import ProductDetails from '../component/ProductPage/ProductDetails'
import ShopNavbar from '../component/ShopNow/ShopNavbar'
import Subscribe from '../component/Subscribe'
import subscribeLeft from '../assets/subscribe1.svg'
import subscribeRight from '../assets/subscribe2.svg'
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
