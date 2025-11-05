const MainLayout = ({ children, sidebar }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-outfit">
      {/* Breadcrumb - Optional */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <p className="text-sm text-gray-600">Home &gt; Womenwear &gt; Retrieval</p>
      </div>

      <div className="flex">
        {/* Sticky Sidebar */}
        <div className="sticky top-0 h-screen overflow-y-auto">
          {sidebar}
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;