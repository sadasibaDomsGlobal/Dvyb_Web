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
      return `${order.date || ''} — Your order has been successfully delivered.`;
    }
    // Active or other
    return `${order.date || ''} — Your order has been successfully placed.`;
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
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Order no: #{order.id ?? '123456789'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {order.status === 'Cancelled'
                ? `Cancelled On: ${order.date ?? '3 June 2023 2:40 PM'}`
                : `Placed On: ${order.date ?? '2 June 2023 2:40 PM'}`}
            </p>
          </div>

          <div className="flex items-center gap-4 ml-auto">
           <button
  onClick={onDownloadInvoice}
  className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-md font-medium flex items-center"
>
  <Download className="h-4 w-4 mr-2" />
  View Invoice
</button>

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
        {order.status !== 'Cancelled' && (
          <div className="mb-6">
            <div className="flex items-center">
              {progressSteps.map((step, idx) => (
                <div key={step.id} className="flex-1 flex items-center last:flex-initial">
                  {/* left connector (except first) */}
                  {idx > 0 && (
                    <div
                      className={`h-0.5 flex-1 ${
                        progressSteps[idx - 1].completed ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                      aria-hidden
                    />
                  )}

                  {/* circle + label */}
                  <div className="flex flex-col items-center px-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.completed ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {step.completed ? '✓' : ''}
                    </div>
                    <div
                      className={`mt-2 text-xs font-medium ${
                        step.completed ? 'text-red-700' : 'text-gray-400'
                      } text-center`}
                    >
                      {step.name}
                    </div>
                  </div>

                  {/* right connector (if last, nothing) */}
                  {/* connector on right is rendered as next loop's left connector */}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STATUS MESSAGE */}
        <div className="bg-gray-50 text-sm text-gray-700 border border-gray-200 rounded-md px-4 py-3 mb-8">
          {getStatusMessage()}
        </div>

        {/* PRODUCT LIST (white cards with separator lines) */}
        <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-200 mb-12">
          {products.map((product, i) => (
            <div
              key={product.id ?? i}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4"
            >
              <div className="flex items-start">
                <img
                  src={product.image ?? '/api/placeholder/80/80'}
                  alt={product.name}
                  className="w-20 h-24 object-cover rounded-md mr-4 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-700 mt-1">{product.desc}</p>
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-medium">Size:</span> {product.size}{' '}
                    <span className="ml-4 font-medium">Qty:</span> {product.qty}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 uppercase">
                    ESTIMATED SHIPPING DATE: {product.date}
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 text-right">
                <p className="font-semibold text-gray-900 text-base">{product.price}</p>
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
