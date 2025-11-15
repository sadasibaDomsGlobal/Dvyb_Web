// components/footer/FooterLinks.jsx
export default function FooterLinks({ title, links }) {
  return (
    <div>
      <h5 className="font-semibold uppercase text-sm tracking-wider text-gray-900 mb-4">
        {title}
      </h5>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.to}>
            <a
              href={link.to}
              className="text-sm text-gray-600 hover:text-gray-900 transition uppercase"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// import React from "react";
// import { Link } from "react-router-dom";

// const FooterLinks = ({ title, links }) => {
//   return (
//     <div>
//       <h5 className="font-medium mb-3 uppercase text-xs tracking-wide">{title}</h5>
//       <ul className="text-gray-600">
//         {links.map((link, index) => {
//           // Each link object can have: { label, to } or { label, href }
//           if (link.to) {
//             return (
//               <li key={index}>
//                 <Link
//                   to={link.to}
//                   className=" text-gray-600 hover:text-gray-900 text-xs uppercase transition-colors duration-200"
//                 > 
//                   {link.label}  
//                 </Link>
//               </li>
//             );
//           } else if (link.href) {
//             return (
//               <li key={index}>
//                 <a
//                   href={link.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-600 hover:text-gray-900 text-xs uppercase transition-colors duration-200"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             );
//           }
//           return null;
//         })}
//       </ul>
//     </div>
//   );
// };

// export default FooterLinks;
