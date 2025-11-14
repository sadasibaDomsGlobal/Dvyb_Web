import React from 'react';
import { spotLight , coll01, coll02, coll03, coll04, coll05, coll06 } from "@/assets";

const CollectionCard = ({ image, title }) => (
  <div className="group cursor-pointer">
    <div className="overflow-hidden mb-1 aspect-[1]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <h3 className="text-xs md:text-sm lg:text-md text-left font-medium">{title}</h3>
  </div>
);


const SpotlightCollections = () => {
  const spotlight = {
    title: "Kanjivaram Silk Saree",
    description: "Experience the timeless elegance of traditional Kanjivaram silk sarees. Handwoven with intricate gold zari work, perfect for weddings and special occasions.",
    image: [spotLight]
  };

  const collections = [
    {
      id: 1,
      title: "Kanchi Pattu",
      image: [coll01]
    },
    {
      id: 2,
      title: "Bridal Lehengas",
      image: [coll02]
    },
    {
      id: 3,
      title: "Anarkali Suits",
      image: [coll03]
    },
    {
      id: 4,
      title: "Gadwal Kolanjeepana",
      image: [coll04]
    },
    {
      id: 5,
      title: "Embroidery Blouse",
      image: [coll05]
    },
    {
      id: 6,
      title: "Bridal Saree",
      image: [coll06]
    }
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-2  sm:px-2 md:px-12 lg:px-22">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Spotlight Section */}
          <section>
             <h2 className="sm:text-base md:text-lg lg:text-xl mb-[28px] font-medium uppercase tracking-wide">
              SPOTLIGHT  OF THE DAY
            </h2>
            <div className="overflow-hidden ">
              <img
                src={spotlight.image}
                alt={spotlight.title}
                className="w-full h-[386px] object-cover transition-transform duration-500"
              />
            </div>
          </section>

          {/* Collections Section */}
          
          <section>
            <h2 className="sm:text-base md:text-lg  lg:text-xl mb-[28px] font-medium uppercase tracking-wide">
              New Collections to Love
            </h2>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  image={collection.image}
                  title={collection.title}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SpotlightCollections;