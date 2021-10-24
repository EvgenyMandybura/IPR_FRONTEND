import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignUpForm from "../../components/forms/SignUpForm";
import AuthCardContainer from "./ContainerAuth";

const SignUp = ({ authState }) => {
  return (
    <AuthCardContainer>
      <SignUpForm />
    </AuthCardContainer>
  );
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps)(SignUp));
