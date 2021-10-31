import React from "react";
import AllProductsLists from "../../components/common/AllProductsList";
import StylesProducts from "./index.module.scss";

const AllProductsPage = () => {
  return (
    <div className={StylesProducts.products}>
      <AllProductsLists />
    </div>
  );
};

export default AllProductsPage;
