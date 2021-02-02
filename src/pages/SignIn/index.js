import React, { useState, useEffect } from "react";
import AuthLayout from "../../layouts/auth";
import "../SignUp/style.scss";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  err: user.userError,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, err } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <AuthLayout>
      <div className="form_body bg-dark">
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
            {err ? <p className="text-red text-error">{err}</p> : null}
            <Button>Sign In</Button>
          </div>
        </form>
      </div>
      <div className="container">
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue">
            Create one!
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
