import React from 'react';

const ListingCard = ({ title, price, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price} EGP</p>
      <button>عرض التفاصيل</button>
    </div>
  );
};

export default ListingCard;
