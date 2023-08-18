import React from "react";

import styles from "./Landing.module.css";

export default function Landing(props) {
  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={props.logIn}>
        Home Page
      </button>
    </div>
  );
}
