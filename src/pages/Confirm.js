import React from "react";
import styles from "../styles/Confirm.module.css";
import Header from "../components/HeaderHome";
import Footer from "../components/Footer";
import TabTitle from "../utils/WebDinamis";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/actions/auth";
import ReportIcon from "@mui/icons-material/Report";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Confirm() {
  TabTitle("Confirm Password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errPass, setErrPass] = useState(false);
  const [errConfirm, setErrConfirm] = useState(false);
  const { otp } = useParams();
  const pinCode = otp;
  const submitHandler = (e) => {
    e.preventDefault();
    if (pass.trim() === "") {
      if (confirm.trim() === "") {
        setErrPass(true);
        setErrConfirm(true);
        return;
      }
      return setErrPass(true);
    }
    if (confirm.trim() === "") return setErrConfirm(true);
    if (pass !== confirm)
      return toast.error(
        "Please make sure your new password are same with confirm password "
      );
    const body = {
      pinCode,
      newPassword: pass,
    };
    const success = () => {
      toast.success("Change password success, please login!");
    };
    const failed = (msg) => {
      toast.error(`Change password failed, ${msg}`);
    };
    dispatch(authAction.confirmThunk(body, success, failed));
  };
  const handlePassVisibility = () => {
    setShowPass(!showPass);
  };
  const handlePassVisibilityConfirm = () => {
    setShowPassConfirm(!showPassConfirm);
  };
  return (
    <>
      <Header />
      <section className={`${styles["background"]}`}>
        <div className={`${styles[""]}`}>
          <div className={`${styles["title"]}`}>Set your new password</div>
          <div className={`${styles["subtitle"]}`}></div>
        </div>
        <form className={`${styles["form"]}`} onSubmit={submitHandler}>
          <div className={`${styles.column}`}>
            <div style={{ color: "white" }} className={``}>
              Pin Code
            </div>
            <input
              className={`${styles["input"]}`}
              type="text"
              value={otp}
              disabled
            />
          </div>
          <div className={`${styles.column}`}>
            <div style={{ color: "white" }} className={``}>
              New Password
            </div>
            <input
              className={`${styles["input"]}`}
              type={showPass ? "text" : "password"}
              placeholder="Enter your new password"
              onChange={(e) => {
                setPass(e.target.value);
                setErrPass(false);
              }}
            />
            {showPass ? (
              <VisibilityIcon
                className={`${styles["visibility"]}`}
                onClick={handlePassVisibility}
              />
            ) : (
              <VisibilityOffIcon
                className={`${styles["visibility"]}`}
                onClick={handlePassVisibility}
              />
            )}
            <div className={errPass ? styles.errEmail : styles.errEmailNo}>
              <ReportIcon />
              <div>Fill New Password</div>
            </div>
          </div>
          <div className={`${styles.column}`}>
            <div style={{ color: "white" }} className={``}>
              Confirm New Password
            </div>
            <input
              className={`${styles["input"]}`}
              type={showPassConfirm ? "text" : "password"}
              placeholder="Confirm your new password"
              onChange={(e) => {
                setConfirm(e.target.value);
                setErrConfirm(false);
              }}
            />
            {showPassConfirm ? (
              <VisibilityIcon
                className={`${styles["visibility"]}`}
                onClick={handlePassVisibilityConfirm}
              />
            ) : (
              <VisibilityOffIcon
                className={`${styles["visibility"]}`}
                onClick={handlePassVisibilityConfirm}
              />
            )}
            <div className={errConfirm ? styles.errEmail : styles.errEmailNo}>
              <ReportIcon />
              <div>Confirm New Password</div>
            </div>
          </div>
          <button className={`${styles["resend"]}`} type="submit">
            {auth.isLoading ? (
              <div className={styles["lds-ring"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <div>Confirm</div>
            )}
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
