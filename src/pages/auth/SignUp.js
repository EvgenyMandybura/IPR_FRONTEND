import React from "react";
import SignUpForm from "../../components/forms/SignUpForm";
import AuthCardContainer from "./ContainerAuth";

const SignUp = () => {
  return (
    <AuthCardContainer>
      <SignUpForm />
    </AuthCardContainer>
  );
};

export default SignUp;
