import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import validationSchemas from "../../constants/validationSchemas";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import {
  allCategories,
  allGenders,
  allKitchens,
} from "../../constants/productCategories";
import ContainerForm from "./FormContainer";
import { filterProducts } from "../../store/products/actions";
import styles from "./index.module.scss";

const initialValues = {
  minPrice: 1,
  maxPrice: 1000,
  categoryIds: [],
  genders: [],
  kitchens: [],
};

function filterInPlace(arr, values) {
  const { minPrice, maxPrice, categoryIds, genders, kitchens } = values;

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    if (val.price < minPrice || val.price > maxPrice) {
      arr.splice(i, 1);
      i--;
      continue;
    }

    if (categoryIds.length > 0 && !categoryIds.includes(val.categoryId)) {
      arr.splice(i, 1);
      i--;
      continue;
    }

    if (genders.length > 0 && !genders.includes(val.gender)) {
      arr.splice(i, 1);
      i--;
      continue;
    }

    if (kitchens.length > 0 && !kitchens.includes(val.kitchen)) {
      arr.splice(i, 1);
      i--;
      continue;
    }
  }
}

const FilterProductsForm = ({ filterProducts, allProductsState }) => {
  const { data } = allProductsState;
  const handleSubmitForm = (values) => {
    values.minPrice = Number(values.minPrice);
    values.maxPrice = Number(values.maxPrice);
    filterInPlace(data, values);
    filterProducts(data);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={validationSchema}
    >
      {(form) => {
        const {
          errors,
          touched,
          handleSubmit,
          setFieldTouched,
          setFieldValue,
        } = form;
        return (
          <ContainerForm>
            <Form className="w-100" onSubmit={handleSubmit}>
              <h4>Filters:</h4>
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"minPrice"}
                label={"Min price"}
                placeholder={"Enter min price"}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"maxPrice"}
                label={"Max price"}
                placeholder={"Enter max price"}
              />

              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"categoryIds"}
                label={"categoryIds"}
                placeholder={"Select categories"}
                options={allCategories}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                isMulti={true}
                type={"select"}
              />

              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"genders"}
                label={"genders"}
                placeholder={"Select genders"}
                options={allGenders}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                isMulti={true}
                type={"select"}
              />

              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"kitchens"}
                label={"kitchens"}
                placeholder={"Select kitchens"}
                options={allKitchens}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                isMulti={true}
                type={"select"}
              />

              <div className="d-flex justify-content-center align-items-center">
                <Button
                  color="dark"
                  type="submit"
                  size="md"
                  outline
                  className={styles.filter}
                >
                  Apply Filter
                </Button>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  onClick={() => form.resetForm()}
                  color="danger"
                  type="reset"
                  size="md"
                  outline
                  className={styles.filter}
                >
                  Clear Filters
                </Button>
              </div>
            </Form>
          </ContainerForm>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = ({ products }) => ({ allProductsState: products });

export default withRouter(
  connect(mapStateToProps, { filterProducts })(FilterProductsForm)
);
