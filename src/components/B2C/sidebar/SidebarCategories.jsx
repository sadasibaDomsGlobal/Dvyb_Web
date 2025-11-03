const SidebarCategories = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-outfit font-medium text-gray-900">SAREES</h2>
        <span className="text-sm font-outfit font-normal text-gray-600">33564 products</span>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span className="font-outfit font-normal">
          Sort by: <span className="font-outfit font-medium">Popular</span>
        </span>
      </div>
    </div>
  );
};

export default SidebarCategories;
