import React from 'react';

const ListingCard = ({ title, price, image }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="text-blue-600 font-semibold">{price} EGP</p>
      <button className="bg-black text-white w-full py-2 mt-3 rounded">
        عرض التفاصيل
      </button>
    </div>
  );
};

export default ListingCard;
