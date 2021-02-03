import React, { useEffect, useState } from "react";
import AuthLayout from "../../layouts/auth";
import "./style.scss";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailSignUpStart } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  err: user.userError,
});

const SignUp = (props) => {
  const { currentUser, err } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    if (currentUser) history.push("/dashboard");
  }, [currentUser, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = name.trim().split(" ");
    const firstName = userName[0] || "";
    const lastName = userName[1] || "";
    dispatch(emailSignUpStart({ email, password, firstName, lastName }));
  };

  return (
    <AuthLayout>
      <div className="form_body bg-dark">
        <div className="row row-center">
          <div className="col-8">
            <p className="text-center text-bold ">
              Get started with your free trading journal account.
            </p>
          </div>
        </div>

        <form action="" className="mt-3" onSubmit={handleSubmit}>
          <div className="row">
            <Input
              label="Your name"
              type="text"
              handler={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="row ">
            <Input
              label="Email"
              type="email"
              handler={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="row ">
            <Input
              label="Password"
              type="password"
              handler={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="row row-center mt-2">
            {err ? <p className="text-red text-error">{err}</p> : null}
            <Button>Sign Up </Button>
          </div>
        </form>
      </div>
      <div className="container">
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue">
            Log in!
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
