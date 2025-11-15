import React, { useState, useEffect } from 'react';
import OrderDetails from './OrderDetails';
import orderService from '../../../services/OrderService'; 
// import InvoiceView from './InvoiceView.JSX'; 
import { SlidersHorizontal, ShoppingBag, X } from 'lucide-react'; 
import empty_ordersIc from '../../../assets/ProfileImages/empty_ordersIc.svg'
import orderService from '../../../services/OrderService';
import InvoiceView from './InvoiceView';



const mockOrders = [
  {
    id: "ORD-101",
    orderId: "ORD-101",
    status: "Active",
    date: new Date(),
    estimatedDelivery: "Feb 18, 2025",
    paymentMethod: "UPI",
    products: [
      {
        name: "Red Silk Saree",
        price: 1899,
        quantity: 1,
        size: "Free Size",
        color: "Red",
        image: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
      }
    ]
  },
  {
    id: "ORD-102",
    orderId: "ORD-102",
    status: "Delivered",
    date: new Date(),
    paymentMethod: "Card Payment",
    products: [
      {
        name: "Blue Kurta Set",
        price: 1299,
        quantity: 1,
        size: "M",
        color: "Blue",
        image: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
      }
    ]
  }
];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Active');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Last Week');
  const [showInvoice, setShowInvoice] = useState(false);
  
  const tabs = ['Active', 'Delivered', 'Cancelled', 'Returned'];
  const filterOptions = [
    'Last Week',
    'Last Month',
    'Last 3 Month',
    'Last 6 Month',
    '2025',
    '2024'
  ];

  // Subscribe to orders from Firebase
  useEffect(() => {
    let unsubscribe = null;

    const setupSubscription = async () => {
      try {
        unsubscribe = await orderService.subscribeToOrders((fetchedOrders) => {
          console.log("Orders received:", fetchedOrders);
          setOrders(fetchedOrders.length > 0 ? fetchedOrders : mockOrders);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error setting up orders subscription:", error);
        setIsLoading(false);
      }
    };

    setupSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Filter orders by date range
  const filterOrdersByDate = (orders, filter) => {
    const now = new Date();
    
    return orders.filter(order => {
      const orderDate = order.date instanceof Date ? order.date : new Date(order.date);
      
      switch(filter) {
        case 'Last Week': {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        }
        case 'Last Month': {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= monthAgo;
        }
        case 'Last 3 Month': {
          const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          return orderDate >= threeMonthsAgo;
        }
        case 'Last 6 Month': {
          const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
          return orderDate >= sixMonthsAgo;
        }
        case '2025': {
          return orderDate.getFullYear() === 2025;
        }
        case '2024': {
          return orderDate.getFullYear() === 2024;
        }
        default:
          return true;
      }
    });
  };

  // Filter orders by active tab and date filter
  const getFilteredOrders = () => {
    // First filter by status
    let filtered = orders.filter(order => order.status === activeTab);
    
    // Then filter by date
    filtered = filterOrdersByDate(filtered, selectedFilter);
    
    return filtered;
  };

  const displayOrders = getFilteredOrders();

  const handleApply = () => {
    setShowFilter(false);
    console.log('Applied filter:', selectedFilter);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedOrder(null);
  };

  const getOrderHeaderColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600';
      case 'Cancelled': return 'text-red-600';
      case 'Returned': return 'text-red-600';
      default: return 'text-[#CE5001]';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toString();
  };

  // Empty State Component
  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
      <div className="relative mb-6">
        {/* Background Circle */}
        <div className="w-[350px] h-[350px] mt-12 bg-gray-100 rounded-full flex items-center justify-center">
          {/* Shopping Bag with X Icon */}
          <div className=" w-auto h-auto">
            {/* <ShoppingBag className="w-12 h-12 text-gray-400 stroke-[1.5]" /> */}
            <img src={empty_ordersIc} className='w-auto h-auto' alt="" />
            
          </div>
        </div>
      </div>
      <p className="text-gray-900 mt-12 font-medium text-base">
        {message || 'No cancellations at the moment'}
      </p>
    </div>
  );

const OrderCard = ({ order }) => 
  (
    <div className="p-4 mb-4">
      <div className=" hidden md:block flex flex-col bg-[#F6F6F6] p-7 lg:flex-row lg:items-center lg:justify-between mb-4">
        <div className="mb-3 lg:mb-0">
          <h3 className={`text-md font-semibold mb-1 ${getOrderHeaderColor(order.status)}`}>
            Order no: {order.orderId || order.id}
          </h3>
          <div className="text-sm mt-[18px] text-gray-600 space-y-1">
            <p>Order Date: {formatDate(order.date)}</p>
            {order.estimatedDelivery && (
              <p className='mt-3'>Estimated   Delivery: {order.estimatedDelivery}</p>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-600 lg:text-right">
          <p>Order Status: {order.status}</p>
          <p className='font-outfit'>Payment Method: {order.paymentMethod}</p>
        </div>
      </div>

      {/* Products */}
     {/* --------------------------------------------------------------
   MOBILE-ONLY LAYOUT (keeps desktop unchanged)
   -------------------------------------------------------------- */}
   <div className="md:hidden">
        {order.products?.map((prod, i) => (
          <div
            key={i}
            className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0"
          >
            <div className='flex flex-row '>

            {/* Full-width image */}
            <img
              src={prod.image || "https://via.placeholder.com/400x500"}
              alt={prod.name}
              className="w-[124px] h-40 object-cover mb-4 "
            />

            {/* Text block */}
            <div className="px-2">
              <h4 className="font-semibold text-gray-900 text-sm uppercase mb-1">
                {prod.name}
              </h4>

              <p className="text-gray-600 text-xs mb-2">{prod.description}</p>

              <p className="text-base font-bold text-gray-900 mb-3">
                ₹{prod.price?.toLocaleString() || 0}
              </p>

              <div className="flex gap-6 text-xs text-gray-700 mb-3">
                <p>
                  Size: <span className="font-medium">{prod.size || "S"}</span>
                </p>
                <p>
                  Qty: <span className="font-medium">{prod.quantity || 2}</span>
                </p>
              </div>

              {order.estimatedDelivery && (
                <p className="text-xs text-gray-600 mb-4 uppercase">
                  ESTIMATED SHIPPING DATE:{" "}
                  <span className="font-medium">{order.estimatedDelivery}</span>
                </p>
              )}

              {/* Buttons */}
              
            </div>
            
            </div>
            <div className="flex w-[280px] gap-3">
                <button className="flex-1 bg-[#F6F6F6] w-auto hover:bg-gray-50 py-2.5 text-xs font-medium uppercase">
                  CANCEL ORDER
                </button>
                <button
                  onClick={() => setSelectedOrder?.(order)}
                  className="flex-1 bg-red-800 hover:bg-red-900 text-white py-2.5 text-xs font-medium uppercase"
                >
                  VIEW DETAILS
                </button>
              </div>
          </div>
        ))}
      </div>

{/* --------------------------------------------------------------
   ORIGINAL DESKTOP LAYOUT (unchanged)
   -------------------------------------------------------------- */}
<div className="hidden md:flex md:flex-col">
  {order.products?.map((prod, i) => (
    <div key={i} className="flex justify-between mb-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <img
          src={prod.image || "https://via.placeholder.com/80"}
          alt={prod.name}
          className="w-28 h-36 object-cover"
        />

        {/* Product Details */}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm uppercase mb-2">
            {prod.name}
          </h4>
          <p className="text-sm text-gray-900 mb-1">{prod.name}</p>
          <p className="text-lg font-bold text-gray-900 mb-3">
            ₹{prod.price?.toLocaleString() || 0}
          </p>

          <div className="flex gap-6 text-sm text-gray-700">
            <p>
              Size: <span className="font-medium">{prod.size || "S"}</span>
            </p>
            <p>
              Qty: <span className="font-medium">{prod.quantity || 2}</span>
            </p>
          </div>

          {order.estimatedDelivery && (
            <p className="text-sm text-gray-600 mt-3">
              ESTIMATED SHIPPING DATE:{" "}
              <span className="font-medium">{order.estimatedDelivery}</span>
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button className="bg-[#F6F6F6] hover:bg-gray-50 px-6 py-2 text-sm font-medium">
          Cancel Order
        </button>
        <button
          onClick={() => setSelectedOrder(order)}
          className="bg-primary hover:bg-hoverBg text-white px-6 py-2 text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );


  if (showInvoice && selectedOrder) {
    return (
      <InvoiceView 
        order={selectedOrder} 
        onBack={() => setShowInvoice(false)} 
      />
    );
  }

  if (selectedOrder && !showInvoice) {
    return (
      <OrderDetails 
        order={selectedOrder} 
        onBack={() => setSelectedOrder(null)} 
        onDownloadInvoice={() => setShowInvoice(true)}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
                <p className="text-gray-600">
                  Total Items: {displayOrders.length}
                </p>
              </div>
            </div>

            {/* Tabs and Filter */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="flex items-center border-b border-gray-200">
                {/* Tabs */}
                <div className="flex flex-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
                        activeTab === tab
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-800"></div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Filter Button */}
                <div className="px-4 border-l border-gray-200">
                  <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-sm font-medium">Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Modal */}
            {showFilter && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40"
                  onClick={() => setShowFilter(false)}
                ></div>
                
                {/* Modal */}
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-64">
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-base font-semibold text-gray-900">
                      Filter By Order Date
                    </h3>
                  </div>
                  
                  {/* Filter Options */}
                  <div className="px-6 py-4 space-y-3">
                    {filterOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="orderFilter"
                          value={option}
                          checked={selectedFilter === option}
                          onChange={(e) => setSelectedFilter(e.target.value)}
                          className="w-4 h-4 text-red-800 border-gray-300 focus:ring-red-800 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Apply Button */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={handleApply}
                      className="w-full bg-red-900 hover:bg-red-800 text-white font-medium py-3 rounded transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Orders */}
            <div>
              {displayOrders.length > 0 ? (
                displayOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <EmptyState 
                  message={
                    activeTab === 'Cancelled' 
                      ? 'No cancellations at the moment'
                      : activeTab === 'Returned'
                      ? 'No returns at the moment'
                      : activeTab === 'Delivered'
                      ? 'No delivered orders at the moment'
                      : 'No active orders at the moment'
                  }
                />
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${getTabColor(tab, activeTab === tab)}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Orders */}
            <div>
              {displayOrders.length > 0 ? (
                displayOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-500 text-lg">No {activeTab.toLowerCase()} orders found.</p>
                  <p className="text-gray-400 text-sm mt-2">Orders will appear here once you make a purchase.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;