import styles from "../../components/loader/Loader.module.css"

const Loader = () => {

    window.addEventListener("load", function(){
        document.getElementById("loader")?.classList.toggle("loader2")
    })

  return (
    <div class={styles.contenedor}>
      <div className={styles.loader} id="loader" >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader
