import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardImg,
  CardSubtitle,
  CardTitle,
  Modal,
  ModalBody,
} from "reactstrap";
import styles from "./index.module.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { clearProductFetched, getProduct } from "../../store/products/actions";
import imgPlaceholder from "../../assets/ic-placeholder.svg";

const ConfirmationDialog = ({
  isOpen,
  onCancel,
  productId,
  clearProductFetched,
  getProduct,
  allProductsState,
}) => {
  const { item } = allProductsState;
  const [ready, updateReady] = useState(false);
  const fetchProduct = () => {
    getProduct(productId);
  };
  useEffect(() => {
    fetchProduct();
    updateReady(true);
    return () => {
      clearProductFetched();
    };
  }, [productId]);

  return (
    <Modal isOpen={isOpen} centered size="xl" toggle={() => onCancel()}>
      {ready && !!item && (
        <ModalBody className={styles.modal}>
          <Button
            className={styles.modalBtn}
            color="danger"
            onClick={() => onCancel()}
          >
            X
          </Button>
          <div className="d-flex flex-row justify-content-center">
            <Card className={styles.modalCard}>
              <CardImg
                src={!!item.imgUrl ? item.imgUrl : imgPlaceholder}
                alt="Card image"
                className={styles.modalImg}
              />
              <CardTitle tag="h5">{item.productName}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {item.creatorFullName}
              </CardSubtitle>
            </Card>
          </div>
        </ModalBody>
      )}
    </Modal>
  );
};

const mapStateToProps = ({ products }) => ({ allProductsState: products });
export default withRouter(
  connect(mapStateToProps, { getProduct, clearProductFetched })(
    ConfirmationDialog
  )
);
