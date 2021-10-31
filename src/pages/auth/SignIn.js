import React from "react";
import SignInForm from "../../components/forms/SignInForm";
import AuthCardContainer from "./ContainerAuth";

const SignIn = () => {
  return (
    <AuthCardContainer>
      <SignInForm />
    </AuthCardContainer>
  );
};

export default SignIn;
