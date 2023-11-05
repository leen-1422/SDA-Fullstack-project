import Footer from '../components/homeComponents/Footer'
import HeroSection from '../components/homeComponents/HeroSection'
import ProductsAds from '../components/homeComponents/ProductsAds'
import ProductsMainPage from '../components/homeComponents/ProductsMainPage'
import About from './About'

export default function home() {
  return (
    <div className="">
      <HeroSection />
      <ProductsAds />
      <About />
      <ProductsMainPage />
      <Footer />
    </div>
  )
}
