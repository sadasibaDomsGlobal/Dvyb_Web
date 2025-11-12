  import React, { useState, useEffect } from 'react';
  import OrderDetails from './OrderDetails';
  import    orderService from '../../../services/OrderService'; 
import InvoiceView from './InvoiceView.JSX'; 


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

    const tabs = ['Active', 'Delivered', 'Cancelled', 'Returned'];

    // Subscribe to orders from Firebase
    useEffect(() => {
      let unsubscribe = null;

      const setupSubscription = async () => {
        try {
          unsubscribe = await orderService.subscribeToOrders((fetchedOrders) => {
            console.log("Orders received:", fetchedOrders);
            setOrders(fetchedOrders);
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

    // Filter orders by active tab
    const getFilteredOrders = () => {
      return orders.filter(order => order.status === activeTab);
    };

    const displayOrders = getFilteredOrders();

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

    const getTabColor = (tab, isActive) => {
      if (!isActive) {
        return 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
      }
      switch (tab) {
        case 'Delivered': return 'border-green-500 text-green-600';
        case 'Cancelled': return 'border-red-500 text-red-600';
        case 'Returned': return 'border-red-500 text-red-600';
        default: return 'border-blue-500 text-blue-600';
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

    const OrderCard = ({ order }) => (
      <div className=" p-4 mb-4">
        <div className="flex flex-col bg-[#F6F6F6] p-7  lg:flex-row lg:items-center lg:justify-between mb-4">
          <div className="mb-3 lg:mb-0">
            <h3 className={`text-md font-semibold mb-1 ${getOrderHeaderColor(order.status)}`}>
              Order no: {order.orderId || order.id}
            </h3>
            <div className="text-sm mt-[18px] text-gray-600 space-y-1">
              <p>Order Date: {formatDate(order.date)}</p>
              {order.estimatedDelivery && (
                <p className='mt-3 '>Estimated Delivery: {order.estimatedDelivery}</p>
              )}
            </div>
          </div>
          <div className="text-sm  text-gray-600 lg:text-right">
            <p > Order Status: {order.status}</p>
            <p  className='font-outfit '> Payment Method: {order.paymentMethod}</p>
          </div>
        </div>

        {/* Products */}
        {order.products?.map((prod, i) => (
          <div key={i} className="flex items-center mb-4">
            <img 
              src={prod.image || 'https://via.placeholder.com/80'} 
              alt={prod.name}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{prod.name}</h4>
              <p className="text-sm text-gray-600">Color: {prod.color || 'N/A'}</p>
              <p className="text-sm text-gray-600">Size: {prod.size || 'N/A'}</p>
              <p className="text-sm text-gray-600">Qty: {prod.quantity || 1}</p>
              <p className="text-sm font-semibold">₹{prod.price?.toLocaleString() || 0}</p>
            </div>

            
        <div className="flex justify-between items-center gap-4 mt-4 pt-4 ">
          {/* <p className="text-lg font-bold">Total: ₹{order.total?.toLocaleString() || 0}</p> */}
        <button className='bg-[#F6F6F6] cursor-pointer p-2'>Cancel Order</button>
          <button 
            onClick={() => setSelectedOrder(order)}
            className="bg-primary hover:bg-hoverBg text-white px-6 py-2  cursor-pointer text-sm font-medium"
          >
            View Details
          </button>
        </div>
          </div>
        ))}

        {/* <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <p className="text-lg font-bold">Total: ₹{order.total?.toLocaleString() || 0}</p>
          <button 
            onClick={() => setSelectedOrder(order)}
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            View Details
          </button>
        </div> */}
      </div>
    );

  const [showInvoice, setShowInvoice] = useState(false);

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
      onDownloadInvoice={() => setShowInvoice(true)} // 👈 new prop
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