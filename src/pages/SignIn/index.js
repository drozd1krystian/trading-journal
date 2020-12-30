import React, { useState, useEffect } from "react";
import AuthLayout from "../../layouts/auth";
import "../SignUp/style.scss";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
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
            <Input
              label="Email"
              type="email"
              required
              handler={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row ">
            <Input
              label="Password"
              type="password"
              required
              handler={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row row-center mt-2">
            <Button value="Sign In" />
          </div>
        </form>
      </AuthLayout>
      <div className="container">
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue">
            Create one!
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
