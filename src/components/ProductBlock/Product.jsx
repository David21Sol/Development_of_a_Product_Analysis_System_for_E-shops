import React from "react";
import Statistic from "./Statistic/Statistic";

function Product({
  title,
  price,
  exPrice,
  imageUrl,
  productUrl,
  shopName,
  delivery,
  rating,
}) {
  return (
    <div className="product-block-wrapper">
      <div className="product-block">
        <h4 className="product-block__shopName">{shopName}</h4>
        <img className="product-block__image" src={imageUrl} alt="product" />
        <h4 className="product-block__title">{title.substring(0, 40)}</h4>
        <div className="product-block-info">
          <p className="product-block__delivery"><b>Delivery: </b>{delivery}</p>
          <p className="product-block__rating"><b>Raiting : </b> {rating}/5 stars </p>
        </div>
        <div className="product-block__bottom">
          <div className="product-block__price">{price}€</div>
          <Statistic price={price} exPrice={exPrice} title={title} />
          <button
            className="button button--outline button--go"
            onClick={() => (window.location = productUrl)}
          >
            <span>Go to store</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
