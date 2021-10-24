import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import {
  Container,
  Button,
  CardBody,
  CardImg,
  Card,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import {
  getListProducts,
  getListProductsClear,
} from "../../store/products/actions";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../../constants/pagination";
import styles from "./index.common.scss";
import imgPlaceholder from "../../assets/ic-placeholder.svg";
// import ToogleContainer from "./Toogle";
// import Search from "../forms/SearchForm";
// import SortProductsForm from "../forms/SortForm";
// import FilterProductsForm from "../forms/FilterProducts";

const AllProductsLists = ({
  allProductsState,
  getListProducts,
  getListProductsClear,
  history,
}) => {
  const { data, url } = allProductsState;
  const [ready, updateReady] = useState(false);
  const [limit, setlimit] = useState(DEFAULT_LIMIT);

  const fetchProducts = () => {
    getListProducts(`${url}&limit=${limit}&offset=${DEFAULT_OFFSET}`);
  };

  useEffect(() => {
    fetchProducts();
    updateReady(true);
    return () => {
      getListProductsClear();
    };
  }, []);

  return (
    <Container>
      <Row className="text-center">
        <Col lg="12" className="text-center">
          {ready &&
            data != "" &&
            data.map((product) => (
              <Card
                className={styles.cardWidth}
                onClick={() => history.push(`/product-details/${product.id}`)}
                key={product.id}
              >
                <CardImg
                  src={product.image ? product.image.original : imgPlaceholder}
                  alt="Card image"
                />
                <CardBody>
                  <CardTitle tag="h5">{product.title}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {product.price}
                  </CardSubtitle>
                  <Button color="dark">Button</Button>
                </CardBody>
              </Card>
            ))}
        </Col>
        <Col lg={{ size: 9, offset: 3 }}>
          <Button outline color="dark">
            Show more
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = ({ products }) => ({ allProductsState: products });
export default withRouter(
  connect(mapStateToProps, { getListProducts, getListProductsClear })(
    AllProductsLists
  )
);
