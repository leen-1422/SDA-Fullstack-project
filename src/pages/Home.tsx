import { useNavigate } from "react-router";
import HeroSection from "../components/homeComponents/HeroSection";
import ProductsMainPage from "../components/homeComponents/ProductsMainPage";
import ProductsAds from "../components/homeComponents/ProductsAds";
import Footer from "../components/homeComponents/Footer";
import About from "./About";


export default function home() {


  return (
    <div className="">
      <HeroSection/>
      <ProductsAds/>
      <About/>
      <ProductsMainPage/>
      <Footer/>

      

     
     
    </div>
  )
}
