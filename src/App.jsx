// import { AboutPage } from "./pages/B2C";
// import { Sidebar } from "./components/b2c/sidebar";
import { EmptyCart } from "./components/b2c/empty_cart";
// import { EmptyWishlist } from "./components/b2c/empty_wishlist";

export default function App() {
  return (
    <div className="font-outfit">
      <EmptyCart />
    </div>
  );
}

// export default function App() {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       {/* Main content area */}
//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-bold text-gray-800">Main Content</h1>
//         <p className="text-gray-600 mt-2">Your main application content goes here.</p>
//       </main>
//     </div>
//   );
// }
