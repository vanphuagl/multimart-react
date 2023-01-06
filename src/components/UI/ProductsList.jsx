import React from "react";

/* ------------------------------- components ------------------------------- */
import ProductCard from "./ProductCard";

const ProductsList = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <ProductCard key={index} item={item} />
      ))}
    </>
  );
};

export default ProductsList;
