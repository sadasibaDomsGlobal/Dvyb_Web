import Footer from "./components/common/footer/footer";
import LoginModal from "./pages/b2c/login/loginModel";


export default function App() {
  return (
    <div className=" " >
      <LoginModal isOpen={true} onClose={() => {}} />
      <Footer />

    </div>
  );
}
