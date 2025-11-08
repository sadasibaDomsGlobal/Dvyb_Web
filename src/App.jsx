import Footer from "./components/common/footer/footer";
import Navbar from "./components/common/navbar/navbar";
import Home from "./pages/b2c/homePage/homePage";
import LoginModal from "./pages/b2c/login/loginModel";


export default function App() {
  return (
    <div className=" " >
      <Navbar/>
      <Home/>
      <LoginModal isOpen={false} onClose={() => {}} />
      <Footer />

    </div>
  );
}
