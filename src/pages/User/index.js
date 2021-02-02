import React, { useState } from "react";
import "./style.scss";
import MainLayout from "../../layouts/main";
import { ReactComponent as DefaultUser } from "../../assets/user.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  changeUserPassword,
  updateUserProfileStart,
} from "../../redux/User/user.actions";
import { updateInitialBalance } from "../../redux/Trades/trades.actions";
import { motion, AnimatePresence } from "framer-motion";

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
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName || "");
  const [changePassword, setChangePassword] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [initialBalance, setInitialBalance] = useState(
    user.initialBalance || ""
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredentials = {
      email,
      firstName,
      lastName,
      initialBalance: validateNumber(initialBalance),
    };
    dispatch(
      updateUserProfileStart({
        user: userCredentials,
        id: user.id,
      })
    );
    if (parseFloat(initialBalance) !== parseFloat(user.initialBalance))
      dispatch(updateInitialBalance(parseFloat(initialBalance)));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const userCredentials = {
      oldPass,
      newPass,
    };
    dispatch(changeUserPassword(userCredentials));
    setOldPass("");
    setNewPass("");
    setTimeout(() => setChangePassword(false), 1000);
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
        <AnimatePresence exitBeforeEnter>
          {!changePassword ? (
            <motion.section
              className="section col-7 ms-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={"modal"}
            >
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
                    <label htmlFor="" className="label">
                      Password
                    </label>

                    <Button
                      handler={() => setChangePassword(true)}
                      type="button"
                    >
                      Change Password
                    </Button>
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
                <div className="col-12 ">
                  {err ? <p className="text-red text-error">{err}</p> : null}
                  <Button
                    btnStyle="btn--submit btn--success mt-2"
                    type="submit"
                  >
                    <EditIcon className="icon-small" /> Save Changes
                  </Button>
                </div>
              </form>
            </motion.section>
          ) : (
            <motion.section
              className="section col-7 ms-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="modal2"
            >
              <h4 className="section_title">
                <DefaultUser className="icon-small" />
                <span>Change Password</span>
              </h4>
              <form className=" user_form" onSubmit={handlePasswordChange}>
                <div className="row mt-2">
                  <div className="col-5">
                    <Input
                      label="Old Password"
                      value={oldPass}
                      handler={(e) => setOldPass(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-5">
                    <Input
                      label="New Password"
                      value={newPass}
                      handler={(e) => setNewPass(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 flex ">
                  {err ? <p className="text-red text-error">{err}</p> : null}
                  <Button
                    btnStyle="btn--submit btn--success mt-2"
                    type="submit"
                  >
                    <EditIcon className="icon-small" /> Save Changes
                  </Button>
                  <Button
                    btnStyle="btn--unstyled mt-2"
                    handler={() => setChangePassword(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default User;
