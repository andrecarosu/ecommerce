import React,{ useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getProductByName, getAllProducts } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductByName(input));
      history.push("/product");
     setInput("")
  };

  const handle = (e) => {
    const { value } = e.target
    setInput(value)
    dispatch(getProductByName(value));
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        className={styles.input}
        value={input}
        onChange={handle}
        type="text"
        required=""
        placeholder="Buscar"
      />
       <button type="submit" className={styles.button} >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBar;
