import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    setData(localStorage.getItem("auth") || "");
  }, []);

  return (
    <>
      <div className={styles.content_box}>
        <div className={styles.title}>
          <h1>ReactSeals presents</h1>
          <h1>Reflix!</h1>
          <button
            className={styles.nav_button}
            onClick={() => (location.href = "movies")}
          >
            Browse
          </button>
          {!data && (
            <button
              className={styles.nav_button}
              onClick={() => (location.href = "login")}
            >
              Login
            </button>
          )}
        </div>
        <div className={styles.footer}>
          <p>ReactSeals intership program assignment app</p>
        </div>
      </div>
    </>
  );
};

export default Home;
