import React from "react";
import { useParams } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  return <div>EditProductPage</div>;
};

export default EditProductPage;
