import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "reactstrap";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../store/auth/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import FormikFormGroup from "../formik/FormikFormGroup";
import { Formik } from "formik";
import validationSchemas from "../../constants/validationSchemas";
import userRoles from "../../constants/userRoles";
import Axios from "axios";

const validationSchema = yup.object({
  username: validationSchemas.username,
  email: validationSchemas.email,
  password: validationSchemas.password,
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  role: 1,
};

const SignUpForm = ({ registerUser, history }) => {
  const handleSubmitForm = (values) => {
    //   registerUser(values, history);

    const user = {
      firstName: "first 13",
      lastName: "last 13",
      email: "rus@gmail.com",
      password: "13Qwer!",
    };

    Axios.post("/api/auth/signup", user)
      .then(() => {
        console.log("Succes");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
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
            <Form className="w-100" onSubmit={handleSubmit}>
              <h1>Sign up</h1>
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"username"}
                label={"Username"}
                placeholder={"Enter username"}
              />
              <FormikFormGroup
                type={"email"}
                errors={errors}
                touched={touched}
                fieldName={"email"}
                label={"Email address"}
                placeholder={"Enter email"}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"password"}
                label={"Password"}
                placeholder={"Enter password"}
                type={"password"}
              />
              <FormikFormGroup
                errors={errors}
                touched={touched}
                fieldName={"role"}
                label={"User Role"}
                placeholder={"Select role"}
                options={userRoles}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                type={"select"}
              />
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  color="dark"
                  className="w-100 mt-3 p-3 text-uppercase"
                  size="lg"
                >
                  Continue
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = () => ({});

export default withRouter(
  connect(mapStateToProps, { registerUser })(SignUpForm)
);
