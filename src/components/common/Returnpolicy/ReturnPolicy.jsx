import React from 'react';
import logo from '../../../assets/B2C/images/FAQ/Logo.svg';
import logoName from '../../../assets/B2C/images/FAQ/LogoName.svg';

export default function ReturnExchangePolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white">
      {/* Logo */}
      <div className="flex justify-center pt-4 pb-">
             <div className="flex items-center justify-center w-17 cursor-pointer mb-10">
               <img src={logo} alt="LOGO" />
               <img src={logoName} alt="LOGOName" />
             </div>
           </div>

      {/* Title */}
      <h2 className="text-xl font-bold mb-4">Return & Exchange Policy</h2>

      {/* Introduction */}
      <p className="text-sm text-gray-700 mb-6">
        Dryb Company Limited is dedicated to ensuring complete customer satisfaction regarding the products available on our website, security, and customer support. If you are not satisfied with your purchase, you may return the order.
      </p>

      {/* NOTE Section */}
      <div className="mb-6">
        <p className="text-sm font-bold mb-2">NOTE:</p>
        <p className="text-sm text-gray-700">
          Customers should contact Dryb customer support as soon as possible (within 7 days of delivery) to proceed with a return. We will not return the defective item unused and in its original condition, including packaging and invoice, for a refund. Please report within 7 days of receiving the damaged product with supporting images/videos to our customer support team. For refund details on returned defective products, please refer to the Refund section below.
        </p>
      </div>

      {/* 7-Day Return Policy */}
      <h3 className="text-base font-bold mb-2">7-Day Return Policy for Domestic Orders Only</h3>
      <p className="text-sm text-gray-700 mb-2">
        In the rare event that your order arrives damaged, you can return the product unused and in its original condition, with packaging and invoice, for a refund. Our courier partner will collect the order from your provided address.
      </p>
      <p className="text-sm font-bold mb-6">
        Note: Returns via any other logistics partner will not be accepted.
      </p>

      {/* Return Charges */}
      <h3 className="text-base font-bold mb-2">Return Charges</h3>
      <h4 className="text-sm font-bold mb-2">Domestic Orders:</h4>
      <p className="text-sm text-gray-700 mb-4">
        Our courier partner will collect the order from the specified address (within India) at no cost to the customer for returns.
      </p>

      {/* How to Initiate */}
      <h4 className="text-sm font-bold mb-2">How to Initiate the Refund Process?</h4>
      <p className="text-sm text-gray-700 mb-2">
        Customers should contact Dryb customer support at 1800-266-0123 or email drybsupport@dryb.com within 7 days of receiving the product.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        Do not return the product before receiving confirmation from Dryb.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        All products must be returned in their original, unaltered, and unused condition. The courier partner will not accept returns if the package is not sealed by the customer.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        Include the invoice/packing slip inside the package for the return process. Without these, returns will not be processed.
      </p>
      <p className="text-sm font-bold mb-6">
        NOTE: We will not entertain any requests after 7 days from the date of receipt of the product.
      </p>

      {/* Refund */}
      <h4 className="text-sm font-bold mb-2">Refund</h4>
      <p className="text-sm text-gray-700 mb-2">
        We will process the refund once we receive the product. The item must be unused, in its original packaging, with original tags and invoice wherever, a refund may not be possible.
      </p>
      <p className="text-sm text-gray-700 mb-6">
        Once initiated, the refund will be credited to your account via the same method used for the transaction or by cheque (only if the debit/ credit card used is no longer in use).
      </p>

      {/* Domestic Orders */}
      <h4 className="text-sm font-bold mb-2">Domestic Orders:</h4>
      <p className="text-sm text-gray-700 mb-2">
        For domestic orders (within India), a full refund will be issued.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        If paid online, the refund will be processed within 7-15 working days from the receipt of returned products at the Dryb Warehouse in Hisar, Tamil Nadu.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        For Cash on Delivery (COD) customers: we'll receive an SMS and email with a secure payout link to process their refund. This link requires OTP verification sent to valid for three days, via links for faster payment. If expired...
      </p>
      <p className="text-sm text-gray-700 mb-6">
        If the link is not accessed, a follow-up call will be made regarding the refund. Customers must provide their bank account details, and the amount will be refunded via NEFT (National Electronic Fund Transfer), taking 7-15 working days to reflect in the customer's account.
      </p>

      {/* International Orders */}
      <h4 className="text-sm font-bold mb-2">International Orders:</h4>
      <p className="text-sm text-gray-700 mb-2">
        Currently, we do not have a refund policy for international orders. However, Dryb will refund customers only under the following circumstances at our discretion:
      </p>
      <p className="text-sm text-gray-700 mb-2">
        We will accept returns of defective products and provide refunds after inspection and approval from our QA team. Shipping costs for defective products will not be charged.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        If the customer receives a product different from the one ordered, we will refund the full amount. In such cases, we will deduct all incurred costs from the refund amount.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        Dryb products are made from pure and natural fabrics, which may be prone to shrinkage and color bleed (especially with natural dyes). Due to the unique and handcrafted nature of the products, dimensions and weight may vary slightly from those declared.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        The company does not guarantee the color/clarity/content of Zari used, especially silver.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        Dryb will not be responsible for any misunderstandings regarding color or consequential losses or damages.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        The actual color of the product may differ slightly from the images shown.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        All disputes will be subject to the jurisdiction of the Court in Bangalore only.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        Exchange policy for defective products is at management's discretion only.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        a) Please treat it with care. Dry clean only.
      </p>
      <p className="text-sm text-gray-700 mb-6">
        b) To care for your product, avoid contact with liquids.
      </p>

      {/* Exchange */}
      <h3 className="text-base font-bold mb-2">Exchange</h3>
      <p className="text-sm text-gray-700 mb-6">
        We regret to inform you that exchanges are not possible for products purchased from our website. However, customers can return the product and re-order.
      </p>

      {/* Disclaimer */}
      <h3 className="text-base font-bold mb-2">Disclaimer</h3>
      <p className="text-sm text-gray-700 mb-2">
        Once we make information displayed on dryb.com constitute an invitation to offer. Your order constitutes your offer, subject to the Terms and Conditions listed herein. We reserve the right to accept or reject your offer in part or in full. Our acceptance occurs upon dispatch of the ordered product(s), which may not happen simultaneously. In such cases, the dispatched portion will be deemed accepted, and we will invoice you for that portion without waiting for the entire order to be dispatched.
      </p>
      <p className="text-sm text-gray-700 mb-2">
        No act or omission by Dryb prior to actual dispatch will constitute acceptance of your offer. If you provided your email address, we will notify you of order receipt and dispatch confirmation.
      </p>
      <p className="text-sm text-gray-700 mb-6">
        Product colors and sizes vary after its dispatch and sizes on our website. However, actual colors may vary depending on your monitor. We cannot guarantee that your monitor will accurately reflect the product's color upon delivery. Packaging may also differ from what is displayed on the website.
      </p>

      {/* Website Content */}
      <h3 className="text-base font-bold mb-2">Website Content</h3>
      <p className="text-sm text-gray-700 mb-2">
        Dryb reserves copyright to all website content, including images. All trademarks and intellectual property are owned or licensed to us. We reserve all rights on our content, including images.
      </p>
      <p className="text-sm text-gray-700 mb-6">
        You may not copy, reproduce, distribute, republish, download, display, post, or transmit any part of the website without our written consent. You may print or download pages for personal, non-commercial use only. For any doubts, please contact us at 1800-266-0123 or email drybsupport@dryb.com. While we strive for accuracy, we cannot accept responsibility for inaccuracies or errors beyond our control. We cannot guarantee that content images will match entirely our delivered products.
      </p>

      {/* External Material */}
      <h3 className="text-base font-bold mb-2">External Material</h3>
      <p className="text-sm text-gray-700 mb-2">
        You may not use the website in any way that damages or interrupts its provision. You may not use the website to transmit or post computer viruses.
      </p>
      <p className="text-sm text-gray-700 mb-6">
        We cannot guarantee that the website is free from viruses, and you should take precautions.
      </p>
      <p className="text-sm text-gray-700 mb-6">
        We will strive to keep the website available, but this is not always possible, and we are not liable for unavailability.
      </p>

      {/* Links */}
      <h3 className="text-base font-bold mb-2">Links</h3>
      <p className="text-sm text-gray-700 mb-6">
        The website may contain links to external sites; these are not under our control. We are not responsible for these sites and do not make any representations about them. We provide links because we believe they may interest you, but we do not monitor or endorse them.
      </p>

      {/* Liability */}
      <h3 className="text-base font-bold mb-2">Liability</h3>
      <p className="text-sm text-gray-700 mb-2">
        We take no responsibility for any loss or damage resulting from our online order service or goods supplied, except as required by law, even if we could have foreseen the loss.
      </p>
      <p className="text-sm font-bold mb-2">NOTE:</p>
      <p className="text-sm text-gray-700 mb-6">
        For orders shipped outside India, we do not provide guarantees/warranties on any product, only a certificate of authenticity certifying that the delivered product is 100% genuine. However, customers can note discrepancies and contact us under Dryb's terms and conditions.
      </p>
      <p className="text-sm text-gray-700 mb-6">
        Any product purchased from our website is at your discretion, and you acknowledge that you place the order after thoroughly inquiring about the product and its features. Dryb is not liable for any damages or losses suffered by customers due to product use, applicable to both domestic and international orders.
      </p>

      {/* Cancellation Policy */}
      <h3 className="text-base font-bold mb-2">Cancellation Policy</h3>
      <h4 className="text-sm font-bold mb-2">Cancellation by Dryb Company Limited</h4>
      <p className="text-sm text-gray-700 mb-6">
        Certain orders may not be accepted by Dryb, and we reserve the right to refuse or cancel any order at our discretion. We may also request additional information to accept orders. We will notify you if your order is fully or partially canceled. Reasons can include unavailability, pricing errors, or fraud identification.
      </p>

      {/* Cancellation by Customer */}
      <h4 className="text-sm font-bold mb-2">Cancellation by Customer</h4>
      <p className="text-sm text-gray-700 mb-2">
        Once an order is placed, it can only be cancelled before shipping to the provided destination. Registered customers can check their order status from the 'Track Order' section. Upon receiving a cancellation request, we will initiate the refund process the same payment method used for the transaction (or by cheque [only if the debit/credit card used is no longer in use]). Once initiated, the refund will be credited within 7-15 working days. Service charges will not be refunded.
      </p>
      <p className="text-sm font-bold mb-6">
        NOTE: If the amount is deducted from your account but the transaction fails, we will refund the amount to your account as soon as possible. (within 48 hours).
      </p>

      {/* Footer */}
    
    </div>
  );
}