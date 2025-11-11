// CategoryCarousel.jsx
import { useRef } from "react";
import categories from "../../static/landing/catCarousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { scrollLeft, scrollRight } from "../utils/scroll";

export default function CategoryCarousel() {
  const scrollRef = useRef(null);

  return (
    <section className="relative hide-scrollbar">
      <div className="cursor-pointer hide-scrollbar flex items-center gap-2  sm:px-1 md:px-8 lg:px-18">

        {/* LEFT ARROW */}
        <button
          onClick={() => scrollLeft("luxuryScroll")}
          className="hidden md:flex"
        >
          <IoIosArrowBack size={22} />
        </button>

        {/* SCROLLABLE CAROUSEL */}
        <div
          id="luxuryScroll"
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-none hide-scrollbar scroll-smooth"
        >
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`/category/${c.slug}`}
              className="flex-shrink-0 w-64 md:w-47 relative text-center group"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-48 object-cover transition"
              />

              {/* Text Overlay */}
              <div className="absolute bottom-10 w-full text-center text-white px-4">
                <p className="text-base font-semibold tracking-wide uppercase">{c.name}</p>
                <p className="text-xs">SHOP NOW</p>
              </div>
            </a>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scrollRight("luxuryScroll")}
          className=" rounded-full hidden md:flex"
        >
          <IoIosArrowForward size={22} />
        </button>
      </div>
    </section>
  );
}
