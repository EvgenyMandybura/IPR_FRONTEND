import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Container, CardImg, Card } from "reactstrap";

import {
  getListProducts,
  getListProductsClear,
} from "../../store/products/actions";
import StorageService from "../../services/StorageService";
import ProductDetailsModal from "../modal/productDetails";
import useModal from "../../hooks/useModal.";
import styles from "./index.common.scss";
import imgPlaceholder from "../../assets/ic-placeholder.svg";

const AllProductsLists = ({
  allProductsState,
  getListProducts,
  getListProductsClear,
  history,
}) => {
  const [ready, updateReady] = useState(false);
  const user = StorageService.user.value;
  const fetchProducts = () => {
    getListProducts(null);
  };

  useEffect(() => {
    fetchProducts();
    updateReady(true);
    return () => {
      getListProductsClear();
    };
  }, []);

  const [modalVisible, toggleModal] = useModal();

  const [currentProductID, setCurrentProductID] = useState(null);

  const onClickProduct = (id) => {
    setCurrentProductID(id);
    toggleModal();
  };

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center">
          {ready &&
            allProductsState.data?.map((product) => (
              <Card
                className="productCard"
                onClick={() =>
                  !!user ? onClickProduct(product.id) : history.push(`/sign-in`)
                }
                key={product.id}
              >
                <CardImg
                  src={!!product.imgUrl ? product.imgUrl : imgPlaceholder}
                  alt="Card image"
                  className="productCardImg"
                />
              </Card>
            ))}
        </Col>
      </Row>
      <ProductDetailsModal
        isOpen={modalVisible}
        onCancel={toggleModal}
        productId={currentProductID}
      />
    </Container>
  );
};
const mapStateToProps = ({ products }) => ({ allProductsState: products });
export default withRouter(
  connect(mapStateToProps, { getListProducts, getListProductsClear })(
    AllProductsLists
  )
);
