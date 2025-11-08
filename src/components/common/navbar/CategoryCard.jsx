// components/navbar/CategoryCard.jsx
export default function CategoryCard({ name, img }) {
  return (
    <div className="flex flex-col items-center cursor-pointer group">
      <div className="w-full aspect-[3/4] overflow-hidden mb-3 rounded-lg">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
        {name}
      </span>
    </div>
  );
}