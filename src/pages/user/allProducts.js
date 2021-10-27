import React, {useState} from "react";
import AllProductsLists from "../../components/common/AllProductsList";
import StylesProducts from "./index.module.scss";
import StorageService from "../../services/StorageService";
import {Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row} from "reactstrap";
import Axios from "axios";

const AllProductsPage = () => {
    const user = StorageService.user.value;
    const accessToken = StorageService.session.value;

    const [allPictures, setAllPictures] = useState({});
    const getPictures = async () => {
        const pictures = await Axios.get("/api/pictures");
        setAllPictures(pictures);
    };

    const [ counter, setCounter] = useState(0);

    const pictureCreateNew = async () => {
        let request = {
            title: `Picture_${counter}`,
            creatorEmail: user.email,
        }
        const pictures = await Axios.post("/api/pictureCreate", request);
    };

    const getPicturesMy = async () => {
        let request = { myEmail: user.email};
        const pictures = await Axios.get("/api/picturesAll" , request);
        setAllPictures(pictures);
    };

  return (
    <div className={StylesProducts.products}>
      <h1>All Products Lists</h1>
      <button>Get my pictures</button>
      <button>Get all pictures</button>
        <button
            className="m-1"
            onClick={e => {
                e.preventDefault();
                setCounter(counter + 1 )
            }}
        >
            Counter
        </button>

        <button
            className="m-1"
            onClick={e => {
                e.preventDefault();
                getPictures();
            }}
        >
            PicturesShow
        </button>
        <Button
            className="m-1"
            onClick={e => {
                e.preventDefault();
                pictureCreateNew();
            }}
        >
            pictureCreate
        </Button>


        <Row>
            <Col>
                <Button
                    className="m-1"
                    onClick={e => {
                        e.preventDefault();
                        getPicturesMy();
                    }}
                >
                    Get my picture
                </Button>
            </Col>
            <Col>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">{user.email}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{user.firstName}</CardSubtitle>
                        <CardText>{user.lastName}</CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        }
        <Row>
            <Col>
                {allPictures?.data?.map(pict =>
                    <Card key = {pict.id}>
                        <CardBody>
                            <CardTitle tag="h5">{pict.id}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{pict.title}</CardSubtitle>
                            <CardText>{pict.creatorEmail}</CardText>
                            <CardText>{pict.createdAt}</CardText>
                            <CardText>{pict.updatedAt}</CardText>
                        </CardBody>
                    </Card>
                )}
            </Col>
        </Row>
    </div>
  );
};

export default AllProductsPage;

//    <AllProductsLists />
