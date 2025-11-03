const SidebarProducts = () => {
  const products = [
    {
      name: "SUPING",
      description: "Henry Tizano Mirror & Ziori",
      price: "TRAFFO",
    },
    {
      name: "KANGHIZABAN",
      description: "Shit Screw with Gold! Ziori Wint's",
      price: "(28,000)",
    },
    {
      name: "ADAMIA",
      description: "Neandertha Black Printed Ranks Set",
      price: "TRAFFO",
    },
    {
      name: "BAUGBAGE",
      description: "Britainland Americal Sun with Deposits",
      price: "TRAFFO",
    },
    {
      name: "FARLOWA",
      description: "Chandar Hill: Cotton Kirtas with Potions",
      price: "(1,999)",
    },
    {
      name: "W",
      description: "Printed Geographic Dream with Belt",
      price: "TRAFFO",
    },
    {
      name: "BIRA",
      description: "Britainland Straight Cut Kirtas",
      price: "TRAFFO",
    },
    {
      name: "AND",
      description: "Farrel Metal Draw with Burlined Baskets",
      price: "",
    },
    {
      name: "BOXBOXO",
      description: "Bath Effect Mild Drums",
      price: "(1,099)",
    },
    {
      name: "MRS",
      description: "Dentin Jacket with Plum Por Living",
      price: "(2,699)",
    },
    {
      name: "KURGO",
      description: "Plastical Wall Hair",
      price: "TRAFFO",
    },
    {
      name: "LEVIS",
      description: "Classic IRI Jaws",
      price: "(3,799)",
    },
  ];

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
          <h3 className="font-outfit font-medium text-gray-900 text-lg mb-1">{product.name}</h3>
          <p className="font-outfit font-normal text-gray-600 text-sm mb-2 leading-tight">
            {product.description}
          </p>
          <div className="font-outfit font-medium text-gray-900">{product.price}</div>
        </div>
      ))}
    </div>
  );
};

export default SidebarProducts;
