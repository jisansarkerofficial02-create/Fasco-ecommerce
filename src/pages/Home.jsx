import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import Brands from '../component/Brands'
import Deals from '../component/Deals'
import Newarrivals from '../component/Newarrivals'
import Pickyblinders from '../component/Pickyblinders'
import Packages from '../component/Packages'
import Instagram from '../component/Instagram'
import Customerratings from '../component/Customerratings'
import Subscribe from '../component/Subscribe'
import Footer from '../component/Footer'
import customerRating1 from '../assets/customer-ratings1.png'
import customerRating2 from '../assets/customer-ratings2.png'
import customerRating3 from '../assets/customer-ratings3.png'
import subscribeLeft from '../assets/subscribe1.svg'
import subscribeRight from '../assets/subscribe2.svg'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Brands />
      <Deals />
      <Newarrivals />
      <Pickyblinders />
      <Packages />
      <Instagram />
      <Customerratings initialIndex={1} reviews={[
        { image: customerRating2, imageAlt: 'Suzan B.', name: 'Suzan B.', role: 'UI Designer', rating: 5, quote: "Items That I ordered were the best investment I ever made. I can't say enough about your quality service." },
        { image: customerRating1, imageAlt: 'James K.', name: 'James K.', role: 'Traveler', rating: 5, quote: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!" },
        { image: customerRating3, imageAlt: 'Megen W.', name: 'Megen W.', role: 'UI Designer', rating: 5, quote: 'Just what I was looking for. Thank you for making it painless, pleasant and most of all hassle free! All products are great.' },
      ]} />
      <Subscribe leftImage={subscribeLeft} rightImage={subscribeRight} />
      <Footer />
    </>
  )
}

export default Home

