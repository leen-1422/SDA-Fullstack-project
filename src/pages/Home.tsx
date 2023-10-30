import { useNavigate } from "react-router";
import HeroSection from "../components/HeroSection";
import ProductsMainPage from "../components/ProductsMainPage";


export default function home() {

  const navigate = useNavigate();
    
          const goToProfile = () => {
            navigate('/profile');
          };
    


  return (
    <div className="">
      <HeroSection/>
      <ProductsMainPage/>
      <h2>Home</h2>
              <button onClick={goToProfile}>Go to profile</button>

     
     
    </div>
  )
}
