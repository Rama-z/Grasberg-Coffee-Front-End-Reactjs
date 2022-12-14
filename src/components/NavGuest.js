import React from "react";
import styles from "../styles/NavGuest.module.css";
import { Link } from "react-router-dom";

export default function NavGuest() {
  return (
    <>
      <nav
        className={`${styles["drop-nav2"]} ${styles["gap-nav"]} col col-lg col-md`}
      >
        <Link to={"/auth/login"}>
          <p className={`${styles["login"]}`}>Login</p>
        </Link>
        <Link to={"/auth/register"}>
          <p className={`${styles["signup"]}`}>Sign Up</p>
        </Link>
      </nav>
    </>
  );
}
