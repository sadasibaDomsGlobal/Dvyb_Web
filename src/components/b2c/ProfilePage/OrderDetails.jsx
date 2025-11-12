import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

/**
 * OrderDetails component
 * - Accepts `order` (object) and `onBack` (fn)
 * - Preserves your dynamic logic (order.status, order.id, order.date, order.total, order.products)
 * - UI updated to match the provided screenshot: header bar, progress tracker, status message box, product list
 *
 * Tailwind CSS required.
 */

const OrderDetails = ({ order = {}, onBack = () => {}, onDownloadInvoice = () => {} }) => {
  // Keep status color logic (returns text color + optional bg color if needed)
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Active':
        return 'text-orange-600';
      case 'Delivered':
        return 'text-green-600';
      case 'Cancelled':
        return 'text-red-600';
      case 'Returned':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  // Progress step builder - uses generic step names to match screenshot
  const getProgressSteps = (status) => {
    const steps = [
      { id: 1, name: 'Order Placed' },
      { id: 2, name: 'In-progress' },
      { id: 3, name: 'Shipped' },
      { id: 4, name: 'Delivered' },
    ];

    // mark completed depending on status
    if (status === 'Delivered') {
      return steps.map((s) => ({ ...s, completed: true }));
    }

    if (status === 'Active') {
      // only first step completed in your screenshot example
      return steps.map((s) => ({ ...s, completed: s.id === 1 }));
    }

    if (status === 'Cancelled') {
      // just show first step as completed label (or none)
      return steps.map((s, i) => ({ ...s, completed: i === 0 }));
    }

    // default: only first completed
    return steps.map((s) => ({ ...s, completed: s.id === 1 }));
  };

  const progressSteps = getProgressSteps(order.status);

  // Use order.products if provided; fallback to placeholder items
  const products = order.products && order.products.length
    ? order.products
    : [
        {
          id: 1,
          name: 'SURBHI SHAH',
          desc: 'mustard spun silk anarkali set',
          size: 'S',
          qty: 2,
          price: '₹59,000',
          date: '4TH OF NOVEMBER',
          image: '/api/placeholder/80/80',
        },
        {
          id: 2,
          name: 'SURBHI SHAH',
          desc: 'mustard spun silk anarkali set',
          size: 'S',
          qty: 2,
          price: '₹59,000',
          date: '4TH OF NOVEMBER',
          image: '/api/placeholder/80/80',
        },
      ];

  // Helper: nicely formatted placed/cancelled message (keeps your logic dynamic)
  const getStatusMessage = () => {
    if (order.status === 'Cancelled') {
      return `Order cancelled on ${order.date || ''}`;
    }
    if (order.status === 'Delivered') {
      return `${ '01 November 2025,3:40 PM'} — Your order has been successfully delivered.`;
    }
    // Active or other
    return `${'01 November 2025,3:40 PM'} — Your order has been successfully placed.`;
  };

  return (
    <div className="min-h-screen bg-white p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* HEADER BAR */}
        <div className="bg-gray-50 rounded-md p-5 mb-8 border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         
         <div className='flex  gap-4'>

          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Order no: #{order.id ?? '123456789'}
            </h2>
            <p className="text-xs  text-gray-600 mt-1">
              {order.status === 'Cancelled'
                ? `Cancelled On: ${order.date ?? '3 June 2023 2:40 PM'}`
                : `Placed On: ${ '2 June 2023 2:40 PM'}`}
            </p>

            
          </div>

              <button
  onClick={onDownloadInvoice}
  className=" hover:bg-hoverBg text-sm p-2   border border-primary text-primary  cursor-pointer hover:text-white   font-medium flex items-center"
>
  {/* <Download className="h-4 w-4 mr-2" /> */}
  Download Invoice
</button>

         </div>

          <div className="flex  items-center gap-4 ml-auto">
       
            <div className="text-right">
              <span
                className={`inline-block text-sm font-semibold px-3 py-1 rounded ${getStatusColorClass(
                  order.status
                )}`}
              >
                {order.status ?? 'Active'}
              </span>
              <div className="text-sm text-gray-700 mt-1">
                Total : ₹{order.total ?? '10,050'}
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS TRACKER */}
        {/* Use flex with connectors between items so widths are responsive */}
     {/* PROGRESS TRACKER */}
{order.status !== 'Cancelled' && (
  <div className="px-6 py-8 bg-white mb-6">
    <div className="relative max-w-2xl mx-auto">
      {/* Background Line */}
      <div className="absolute top-3 left-0 right-0 h-[4px] bg-[#F0E0E0]" style={{ marginLeft: '12px', marginRight: '12px' }}></div>
      
      {/* Active Progress Line */}
      <div 
        className="absolute top-3 left-0 h-[4px] bg-[#8B0000] transition-all duration-500"
        style={{ 
          marginLeft: '12px', 
          width: order.status === 'Delivered' ? 'calc(100% - 24px)' : 
                 order.status === 'Shipped' ? 'calc(66.66% - 24px)' :
                 order.status === 'Active' ? 'calc(33.33% - 24px)' : '0%'
        }}
      ></div>

      {/* Progress Steps */}
      <div className="relative flex justify-between">
        {/* Order Placed */}
        <div className="flex flex-col items-center" style={{ width: '80px' }}>
          <div className="w-6 h-6 -ml-8 rounded-full bg-[#8B0000] flex items-center justify-center mb-3 relative z-10">
            <svg className="w-4 h-4  text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
          <p className="text-xs font-medium text-gray-900 text-center">Order Placed</p>
        </div>

        {/* In-progress */}
        <div className="flex flex-col items-center" style={{ width: '80px' }}>
          <div className={`w-6 h-6 -ml-8 rounded-full flex items-center justify-center mb-3 relative z-10 ${
            order.status === 'Active' || order.status === 'Shipped' || order.status === 'Delivered'
              ? 'bg-[#8B0000]' 
              : 'bg-[#F0E0E0]'
          }`}>
              {(order.status === 'Active' || order.status === 'Shipped' || order.status === 'Delivered') ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              ) : null}
          </div>
          <p className={`text-xs font-medium text-center ${
            order.status === 'Active' || order.status === 'Shipped' || order.status === 'Delivered'
              ? 'text-gray-900' 
              : 'text-gray-400'
          }`}>
            In-progress
          </p>
        </div>

        {/* Shipped */}
        <div className="flex flex-col items-center" style={{ width: '80px' }}>
          <div className={`w-5 h-5  rounded-full flex items-center justify-center mb-3 mt-1 relative z-10 ${
            order.status === 'Shipped' || order.status === 'Delivered'
              ? 'bg-[#8B0000]' 
              : 'bg-[#F0E0E0]'
          }`}>
            {(order.status === 'Shipped' || order.status === 'Delivered') ? (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            ) : null}
          </div>
          <p className={`text-xs font-medium text-center ${
            order.status === 'Shipped' || order.status === 'Delivered'
              ? 'text-gray-900' 
              : 'text-[#F0E0E0]'
          }`}>
            Shipped
          </p>
        </div>

        {/* Delivered */}
        <div className="flex flex-col items-center" style={{ width: '80px' }}>
          <div className={`w-5 h-5 mt-1 rounded-full flex  ml-10 items-center justify-center mb-3 relative z-10 ${
            order.status === 'Delivered'
              ? 'bg-[#8B0000]' 
              : 'bg-[#F0E0E0]'
          }`}>
            {order.status === 'Delivered' ? (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            ) : null}
          </div>
          <p className={`text-xs font-medium ml-9 text-center ${
            order.status === 'Delivered'
              ? 'text-gray-900' 
              : 'text-[#F0E0E0]'
          }`}>
            Delivered
          </p>
        </div>
      </div>
    </div>
  </div>
)}

        {/* STATUS MESSAGE */}
        <div className="bg-gray-50 text-sm w-[510px] text-gray-700 border border-gray-200  px-4 py-3 mb-8">
          {getStatusMessage()}
        </div>

        {/* PRODUCT LIST (white cards with separator lines) */}
        <div className="bg-white border border-gray-200  divide-y divide-gray-200 mb-12">
          {products.map((product, i) => (
            <div
              key={product.id ?? i}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4"
            >
              <div className="flex items-start">
                <img
                  src={product.image ?? '/api/placeholder/80/80'}
                  alt={product.name}
                  className="w-20 h-24 object-cover  mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-700 mt-1">{product.desc}</p>
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-medium mt-4">Size:</span> {product.size}{' '}
                    <span className="ml-4 font-medium">Qty:</span> {product.qty}
                  </p>
                  <p className="text-xs text-gray-900 font-semibold mt-2 uppercase">
                    ESTIMATED SHIPPING DATE: {product.date}
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 text-right">
                <p className="font-semibold text-gray-900 text-xl">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Download Invoice CTA centered under list (optional duplicate) */}
        <div className="flex justify-center">
          {/* <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
