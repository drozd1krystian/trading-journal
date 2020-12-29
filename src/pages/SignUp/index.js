import React from "react";
import AuthLayout from "../../layouts/auth";
import "./style.scss";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const SignUp = (props) => {
  const handleSubmit = () => {
    //Create Account
  };

  return (
    <>
      <AuthLayout>
        <div className="row row-center">
          <div className="col-8">
            <p className="text-center text-bold ">
              Get started with your free trading journal account.
            </p>
          </div>
        </div>

        <form action="" className="mt-3" onSubmit={handleSubmit}>
          <div className="row">
            <Input label="Your name" type="text" required />
          </div>
          <div className="row ">
            <Input label="Email" type="email" required />
          </div>
          <div className="row ">
            <Input label="Password" type="password" required />
          </div>
          <div className="row row-center mt-2">
            <Button value="Sign Up" />
          </div>
        </form>
      </AuthLayout>
      <div className="container">
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue">
            Log in!
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
