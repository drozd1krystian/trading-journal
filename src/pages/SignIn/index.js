import React from "react";
import AuthLayout from "../../layouts/auth";
import "../SignUp/style.scss";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const SignIn = (props) => {
  const handleSubmit = () => {
    //Log in to account
  };

  return (
    <>
      <AuthLayout>
        <div className="row row-center">
          <div className="col-8">
            <p className="text-center text-bold ">
              Log in to your trading journal account.
            </p>
          </div>
        </div>

        <form action="" className="mt-3" onSubmit={handleSubmit}>
          <div className="row ">
            <Input label="Email" type="email" required />
          </div>
          <div className="row ">
            <Input label="Password" type="password" required />
          </div>
          <div className="row row-center mt-2">
            <Button value="Sign In" />
          </div>
        </form>
      </AuthLayout>
      <div className="container">
        <p className="text-center mt-2">
          Don't have an account? <Link to="/signup">Create one!</Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
