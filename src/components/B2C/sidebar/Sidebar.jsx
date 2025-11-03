
import SidebarHeader from './SidebarHeader';
import SidebarCategories from './SidebarCategories';
import SidebarProducts from './SidebarProducts';

const Sidebar = () => {
  return (
    <div className="w-80 bg-white p-6 shadow-lg h-screen overflow-y-auto font-outfit">
      <SidebarHeader />
      <SidebarCategories />
      <SidebarProducts />
    </div>
  );
};

export default Sidebar;