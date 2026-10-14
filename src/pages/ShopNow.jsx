import Footer from '../component/Footer'
import ShopNavbar from '../component/ShopNow/ShopNavbar'
import Collection from '../component/ShopNow/Collection'
import Pickyblinders from '../component/Pickyblinders'
import Packages from '../component/Packages'
import Instagram from '../component/Instagram'
import Subscribe from '../component/Subscribe'
import subscribeLeft from '../assets/optimized/subscribe1.webp'
import subscribeRight from '../assets/optimized/subscribe2.webp'

const ShopNow = () => (
  <main>
    <ShopNavbar />
    <Collection />
    <Pickyblinders />
    <Packages />
    <Instagram />
    <Subscribe leftImage={subscribeLeft} rightImage={subscribeRight} />
    <Footer />
  </main>
)

export default ShopNow
