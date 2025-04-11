import React from "react";

const AdditionalInfo = ({ product, isDark }) => {
  const { dimensions, weight, category, brand, sku } = product;

  const specifications = [
    { label: "Dimensions", value: dimensions },
    { label: "Weight", value: weight },
    { label: "Category", value: category },
    { label: "Brand", value: brand },
    { label: "SKU", value: sku },
    { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    {
      label: "Package Contents",
      value: "1x Device, User Manual, Warranty Card",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Product Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDark ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {spec.label}
            </div>
            <div
              className={`mt-1 ${isDark ? "text-gray-200" : "text-gray-900"}`}
            >
              {spec.value}
            </div>
          </div>
        ))}
      </div>

      {/* Care Instructions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
        <ul
          className={`list-disc ml-5 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <li>Clean with soft, dry cloth</li>
          <li>Avoid exposure to extreme temperatures</li>
          <li>Store in a cool, dry place</li>
          <li>Keep away from water and moisture</li>
        </ul>
      </div>
    </div>
  );
};

export default AdditionalInfo;
