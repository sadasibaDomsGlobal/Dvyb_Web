import Footer from "./components/common/footer/footer";
import Home from "./pages/b2c/homePage/homePage";
import LoginModal from "./pages/b2c/login/loginModel";


export default function App() {
  return (
    <div className=" " >
      <Home/>
      <LoginModal isOpen={false} onClose={() => {}} />
      <Footer />

    </div>
  );
}