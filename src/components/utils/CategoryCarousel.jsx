// CategoryCarousel.jsx
import Button from "../ui/Button";

const categories = [
  { name: "Lehenga", image: "/cat/lehenga.jpg", slug: "lehenga" },
  // …add the rest from your screenshot
];

export default function CategoryCarousel() {
  return (
    <section className="py-8 overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 md:gap-8 px-4 md:px-12">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`/category/${c.slug}`}
            className="flex-shrink-0 w-32 md:w-40 text-center group"
          >
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-40 object-cover rounded-lg mb-2 group-hover:scale-105 transition"
            />
            <p className="text-sm font-medium">{c.name}</p>
            <Button size="sm" className="mt-1 opacity-0 group-hover:opacity-100 transition">
              SHOP NOW
            </Button>
          </a>
        ))}
      </div>
    </section>
  );
}