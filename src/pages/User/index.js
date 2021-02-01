import React, { useState } from "react";
import "./style.scss";
import MainLayout from "../../layouts/main";
import { ReactComponent as DefaultUser } from "../../assets/user.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";

const mapState = ({ user }) => ({
  user: user.currentUser,
});

const User = (props) => {
  const { user } = useSelector(mapState);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [firstName, setFirstName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName || "");
  const [initialBalance, setInitialBalance] = useState(
    user.initialBalance || ""
  );

  const handleSubmit = () => {};

  return (
    <MainLayout title="User Settings">
      <div className="row">
        <div className="col-3">
          <div className="section avatar">
            <div className="avatar_body">
              <DefaultUser className="avatar_photo" />
              <h4 className="avatar_text text-center mt-1">{user.name}</h4>
              <p className="avatar_text">{user.email}</p>
            </div>
          </div>
        </div>
        <section className="section col-7">
          <div className="row">
            <p className="warning text-red">
              Warning! Editing this data will cause page reload and you will be
              redirected to Dashboard!
            </p>
          </div>
          <form>
            <h4 className="section_title mt-2">
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
          </form>
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
          <div className="row mt-2">
            <Button btnStyle="btn--submit">
              <EditIcon className="icon-small" /> Save Changes
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default User;
