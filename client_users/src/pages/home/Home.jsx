import React from "react";
import Cards from "../../components/cards/Cards";
import styles from "./Home.module.css";
import Sidebar from "../../components/sideBar/Sidebar";



function Home() {
  // const os = useSelector((state) => state.s)
  return (
    <>
      <section className={styles.section}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <div className={styles.cards}>
            <div className={styles.content_cards}>
              <Cards />
            </div>
          </div>
        </div>
      </section>
      {/*<section className={styles.section2}>
        <div className={styles.slider}>
          {/* <Carousel /> */}
        {/* </div>
  </section>*/}
    </>
  );
}

export default Home;
