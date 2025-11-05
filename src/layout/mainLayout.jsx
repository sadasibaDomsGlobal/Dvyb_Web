// src/layout/MainLayout.jsx
import Sidebar from '../components/b2c/Sidebar';  // ← FIXED: from layout to b2c

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-outfit flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">DVYB</h1>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="/womenwear" className="text-gray-700 hover:text-gray-900">Womenwear</a>
          </nav>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;