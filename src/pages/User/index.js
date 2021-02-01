import React, { useState } from "react";
import "./style.scss";
import MainLayout from "../../layouts/main";
import { ReactComponent as DefaultUser } from "../../assets/user.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { updateUserProfileStart } from "../../redux/User/user.actions";
import { updateInitialBalance } from "../../redux/Trades/trades.actions";

const mapState = ({ user }) => ({
  user: user.currentUser,
  err: user.userError,
});

const validateNumber = (value) => {
  return isNaN(value) || value < 0 ? 0 : parseFloat(value);
};

const User = (props) => {
  const { user, err } = useSelector(mapState);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [formErr, setFormErr] = useState();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName || "");
  const [initialBalance, setInitialBalance] = useState(
    user.initialBalance || ""
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 5) {
      setFormErr("Password is too short!");
      return;
    }
    const userCredentials = {
      email,
      firstName,
      lastName,
      password,
      initialBalance: validateNumber(initialBalance),
    };
    setFormErr("");
    dispatch(
      updateUserProfileStart({
        user: userCredentials,
        id: user.id,
        oldPassword: user.password,
      })
    );
    if (parseFloat(initialBalance) !== parseFloat(user.initialBalance))
      dispatch(updateInitialBalance(parseFloat(initialBalance)));
  };

  return (
    <MainLayout title="User Settings">
      <div className="row row-user">
        <div className="col-3 ms-12">
          <div className="section avatar">
            <div className="avatar_body">
              <DefaultUser className="avatar_photo" />
              <h4 className="avatar_text text-center mt-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="avatar_text text-center">{user.email}</p>
            </div>
          </div>
        </div>
        <section className="section col-7 ms-12">
          <form onSubmit={handleSubmit} className=" user_form">
            <h4 className="section_title">
              <DefaultUser className="icon-small" />
              <span>Personal Info</span>
            </h4>
            <div className="row mt-2">
              <div className="col-5">
                <Input
                  label="First Name"
                  value={firstName}
                  handler={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col-5">
                <Input
                  label="Last Name"
                  value={lastName}
                  handler={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <Input
                  label="Email"
                  value={email}
                  handler={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>
              <div className="col-5">
                <Input
                  label="Password"
                  value={password}
                  handler={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>
            </div>

            <h4 className="section_title mt-2">
              <SettingsIcon className="icon-small" />
              <span>Account Settings</span>
            </h4>
            <div className="row mt-2">
              <div className="col-5">
                <Input
                  label="Initial Balance"
                  value={initialBalance}
                  handler={(e) => setInitialBalance(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className="row ">
              {formErr ? <p className="text-red">{formErr}</p> : null}
              {err ? <p className="text-red">{err}</p> : null}
              <Button btnStyle="btn--submit btn--success" type="submit">
                <EditIcon className="icon-small" /> Save Changes
              </Button>
            </div>
          </form>
        </section>
      </div>
    </MainLayout>
  );
};

export default User;
