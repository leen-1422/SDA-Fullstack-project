import { useNavigate } from "react-router";
import HeroSection from "../components/HeroSection";
import ProductsMainPage from "../components/ProductsMainPage";
import ProductsAds from "../components/ProductsAds";
import Footer from "../components/Footer";
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
