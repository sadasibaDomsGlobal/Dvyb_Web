// HeroBanner.jsx
import Button from "../../ui/Button";

export default function HeroBanner({ discount, code, imageUrl }) {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <img
        src={imageUrl}
        alt="New Year Sale"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      <div className="relative container mx-auto flex flex-col items-start justify-center h-full text-white px-6 md:px-12">
        <h2 className="text-4xl md:text-6xl font-serif mb-2">
          Out with the old, in with the new
        </h2>
        <p className="text-6xl md:text-8xl font-bold mb-4">
          {discount}% <span className="text-primaryLight">OFF</span>
        </p>
        <p className="text-xl mb-6">Use code: <strong>{code}</strong></p>
        <Button className="bg-primary hover:bg-primaryLight text-white">
          SHOP NOW
        </Button>
      </div>
    </section>
  );
}