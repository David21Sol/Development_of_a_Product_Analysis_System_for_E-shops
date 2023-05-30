import React from "react";

import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <span>😞</span>
      <h2>Page's not found !</h2>
    </div>
  );
}

export default NotFoundBlock;
