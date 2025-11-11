import React, { useRef } from "react";
import { Download } from "lucide-react";
import Barcode from "react-barcode";

const InvoiceView = ({ order, onBack }) => {
  const invoiceRef = useRef();

  // Format date helper function
  const formatDate = (date) => {
    if (!date) return 'N/A';
    
    if (typeof date === 'string') return date;
    
    if (date instanceof Date) {
      return date.toLocaleDateString('en-GB', { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    
    if (date.toDate && typeof date.toDate === 'function') {
      return date.toDate().toLocaleDateString('en-GB', { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    
    return String(date);
  };

  const formatTime = (date) => {
    if (!date) return '';
    
    if (date instanceof Date) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
    
    if (date.toDate && typeof date.toDate === 'function') {
      return date.toDate().toLocaleTimeString('en-US', { 
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
    
    return '';
  };

  const handleDownloadPDF = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const input = invoiceRef.current;
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${order.orderId || order.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return order.products?.reduce((sum, item) => {
      return sum + ((item.price || 0) * (item.quantity || 1));
    }, 0) || 0;
  };

  const deliveryFee = 100;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={onBack}
        className="mb-6 text-gray-600 font-medium hover:text-gray-900 transition-colors"
      >
        ← Back to Orders
      </button>

      <div ref={invoiceRef} className="max-w-5xl mx-auto bg-white shadow-lg p-8">
        {/* Header with Barcode and Download */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="bg-white">
              <Barcode 
                value={order.orderId || order.id || '287368838'} 
                width={1.5}
                height={60}
                fontSize={0}
                margin={0}
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Order ID: {order.orderId || order.id}
              </p>
              <p className="text-gray-600">
                {formatDate(order.date)} {formatTime(order.date)}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleDownloadPDF}
            className="bg-[#8B1B1B] hover:bg-[#6d1515] text-white px-6 py-2.5 rounded font-medium transition-colors"
          >
            Download Invoice
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Order Details */}
          <div className="border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 p-4 border-b border-gray-300 bg-gray-50">
              Order Details
            </h2>
            
            <div className="p-4">
              {order.products?.map((product, index) => (
                <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
                  <div className="flex gap-4">
                    <img
                      src={product.image || 'https://via.placeholder.com/120'}
                      alt={product.name}
                      className="w-24 h-28 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {product.name || 'SURBHI SHAH'}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.description || 'mustard spun silk anarkali set'}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gray-700">
                          <span className="font-medium">Size:</span> {product.size || 'S'}
                        </span>
                        <span className="text-gray-700">
                          <span className="font-medium">Qty:</span> {product.quantity || 2}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Order Summary */}
              <div className="space-y-3 mt-6 pt-4 border-t border-gray-300">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">ID</span>
                  <span className="text-gray-900">#{order.orderId || order.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Product Name:</span>
                  <span className="text-gray-900">{order.products?.[0]?.name || 'SURBHI SHAH'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Qty</span>
                  <span className="text-gray-900">x{order.products?.reduce((sum, p) => sum + (p.quantity || 0), 0) || 2}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Price</span>
                  <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Delivery Fee</span>
                  <span className="text-gray-900">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Customer & Payment Info */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="border border-gray-300 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 p-4 border-b border-gray-300 bg-gray-50">
                Customer Information
              </h2>
              
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Name</p>
                  <p className="text-gray-900 font-medium">
                    {order.customerName || order.shippingAddress?.name || 'Ravi Kumar'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">E-Mail</p>
                  <p className="text-gray-900">
                    {order.customerEmail || order.email || 'customer@example.com'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
                  <p className="text-gray-900">
                    {order.shippingAddress?.fullAddress || 
                     order.shippingAddress?.address || 
                     '92-145/1A, Madura Nagar, Hyderabad, Ajay Towers, Road No 3, Near. Vijay Modal High School 500056'}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border border-gray-300 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 p-4 border-b border-gray-300 bg-gray-50">
                Payment Details
              </h2>
              
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Mode</p>
                  <p className="text-gray-900 font-medium">
                    {order.paymentMethod || 'UPI'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                  <p className="text-gray-900">
                    {order.transactionId || 'TR3290889200'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Date</p>
                  <p className="text-gray-900">
                    {formatDate(order.paymentDate || order.date)} {formatTime(order.paymentDate || order.date)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                  <p className="text-gray-900">
                    {order.bankName || 'Kotak Mahindra Bank'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;