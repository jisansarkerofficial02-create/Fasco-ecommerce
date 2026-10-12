import Footer from '../component/Footer'
import ShopNavbar from '../component/ShopNow/ShopNavbar'
import Collection from '../component/ShopNow/Collection'
import Pickyblinders from '../component/Pickyblinders'
import Packages from '../component/Packages'
import Instagram from '../component/Instagram'
import Subscribe from '../component/Subscribe'
import subscribeLeft from '../assets/subscribe1.svg'
import subscribeRight from '../assets/subscribe2.svg'

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
