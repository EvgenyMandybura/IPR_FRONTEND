import React from "react";
import AddProduct from "../../components/common/AddProduct";
import StylesProducts from "../user/index.module.scss";

const AddProductPage = () => {
  return (
    <div className={StylesProducts.products}>
      <AddProduct />
    </div>
  );
};

export default AddProductPage;
