import React from "react";
import { Link } from "react-router-dom";

const FooterLinks = ({ title, links }) => {
  return (
    <div>
      <h5 className="font-medium mb-3 uppercase text-xs tracking-wide">{title}</h5>
      <ul className="text-gray-600">
        {links.map((link, index) => {
          // Each link object can have: { label, to } or { label, href }
          if (link.to) {
            return (
              <li key={index}>
                <Link
                  to={link.to}
                  className=" text-gray-600 hover:text-gray-900 text-xs uppercase transition-colors duration-200"
                > 
                  {link.label}  
                </Link>
              </li>
            );
          } else if (link.href) {
            return (
              <li key={index}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 text-xs uppercase transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default FooterLinks;
