import React, { useRef, useState } from "react";
import { Button, Form } from "reactstrap";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import logoPlaceholder from "../../assets/ic-placeholder.svg";
import FileHelper from "../../helpers/fileHelper";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProduct } from "../../store/products/actions";

const initialValues = {
  productName: "",
  creatorEmail: "haenraets@gmail.com",
  creatorFullName: "Kurs Portov",
};

const AddNewProduct = ({ createProduct, history }) => {
  const handleSubmitForm = (values) => {
    const model = { values, history };
    values.imgUrl = imageUploaded;
    createProduct(model);
  };

  const uploadedImage = useRef(null);
  const [imageUploaded, setImageUploaded] = useState(null);

  const changeHandler = async (e) => {
    const file = e.target.files[0];
    const promiseFile = await FileHelper.openAsDataUrl(file);
    await setImageUploaded(promiseFile);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
        {({ errors, touched, handleSubmit }) => {
          return (
            <Form className="w-100" onSubmit={handleSubmit}>
              <h3>Create new Board</h3>
              <div>
                <img
                  src={imageUploaded ? imageUploaded : logoPlaceholder}
                  alt="Logo"
                />
                <div className="file-input">
                  <input
                    ref={uploadedImage}
                    type="file"
                    accept="image/*"
                    className="file"
                    id="file"
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
              </div>
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"productName"}
                label={"Product name"}
                placeholder={"Add product name"}
              />

              <Button
                color="success"
                type="submit"
                className="buttonLabel"
                size="md"
              >
                Continue
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = () => ({});
export default withRouter(
  connect(mapStateToProps, { createProduct })(AddNewProduct)
);
