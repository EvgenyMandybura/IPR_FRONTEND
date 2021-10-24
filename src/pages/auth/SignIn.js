import React from "react";
import { connect } from "react-redux";
import SignInForm from "../../components/forms/SignInForm";
import AuthCardContainer from "./ContainerAuth";

const SignIn = ({ authState }) => {
  return (
    <AuthCardContainer>
      <SignInForm />
    </AuthCardContainer>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(SignIn);
