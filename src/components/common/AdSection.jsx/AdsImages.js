// src/components/b2c/ads/AdsImages.js
// This file contains all the static image imports

import ad1 from '../../../assets/B2C/ads/Ad_1.png';
import ad2 from '../../../assets/B2C/ads/Ad_2.png';
import ad3 from '../../../assets/B2C/ads/Ad_3.png';
import ad4 from '../../../assets/B2C/ads/Ad_4.png';
import ad5 from '../../../assets/B2C/ads/Ad_5.png';
import ad6 from '../../../assets/B2C/ads/Ad_6.png';

// Export the ads array
export const ads = [
  {
    id: 1,
    image: ad1,
    alt: "Advertisement 1",
    link: "/products/category/sale" // Optional: link when clicked
  },
  {
    id: 2,
    image: ad2,
    alt: "Advertisement 2",
    link: "/products/category/new-arrivals"
  },
  {
    id: 3,
    image: ad3,
    alt: "Advertisement 3",
    link: "/products/category/bestsellers"
  },
  {
    id: 4,
    image: ad4,
    alt: "Advertisement 4",
    link: "/products/category/summer-collection"
  },
  {
    id: 5,
    image: ad5,
    alt: "Advertisement 5",
    link: "/products/category/winter-collection"
  },
  {
    id: 6,
    image: ad6,
    alt: "Advertisement 6",
    link: "/products/category/accessories"
  }
];

export default ads;