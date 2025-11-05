
import onamBanner from "../../../assets/B2C/images/product_details/add_1.png"; 


const AdBanner = () => {
  return (
    <section className="w-full mb-8 rounded-xl overflow-hidden shadow-sm">
      <img
        src={onamBanner}
        alt="Onam Sale Banner"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default AdBanner;
