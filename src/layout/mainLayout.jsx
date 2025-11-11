
import Navbar from "../components/common/navbar/navbar";
import Footer from "../components/common/footer/footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen scrollbar-hide">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
        {/* <h1 className="text-center py-4">Header Is Currently not there</h1> */}
      </header>

      {/* Scrollable Content */}
      <main
        className="flex-grow overflow-y-auto"
        style={{
          paddingTop: "40px", // Adjust this height based on actual header height
        }}
      >
        {children}
      </main>

      {/* Footer (not fixed, scrolls naturally) */}
      <footer className="footer">
        <Footer />
        {/* <h1>Footer Is Currently not there</h1> */}
      </footer>
    </div>
  );
}

















// // src/layout/MainLayout.jsx
// import { useState } from "react";
// import "../styles/MainLayout.css";

// /**
//  * MainLayout:
//  * - Fixed Header with responsive nav
//  * - Footer
//  * - Body area for SecondaryLayout
//  */
// const MainLayout = ({ children }) => {
//   const [navOpen, setNavOpen] = useState(false);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       {/* Header */}
//       <header className="main-header">
//         <div className="container header-content">
//           <a href="/" className="logo">DVYB</a>
//           <button
//             className="nav-toggle"
//             onClick={() => setNavOpen(!navOpen)}
//             aria-label="Toggle navigation"
//           >
//             Menu
//           </button>
//           <nav className={`nav ${navOpen ? "open" : ""}`}>
//             <a href="/">Home</a>
//             <a href="/womenwear">Womenwear</a>
//           </nav>
//         </div>
//       </header>

//       {/* Body */}
//       <main style={{ flex: 1, paddingTop: "80px" }}>
//         {children}
//       </main>

//       {/* Footer */}
//       <footer className="main-footer">
//         <div className="container footer-content">
//           © 2025 DVYB. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default MainLayout;