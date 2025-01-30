import { useCallback, useContext, useRef, useState } from "react";
import styles from "./Input.module.scss";
import { searchContext } from "../../App";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { setValueInput } from "../../redux/slices/filterSlice";

export default function Input() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const focusInput = () => {
    setValue("");
    dispatch(setValueInput(""));
    inputRef.current.focus();
  };

  const getInput = useCallback(
    debounce((str) => {
      dispatch(setValueInput(str));
    }, 500),
    []
  );

  const eventInput = (event) => {
    setValue(event.target.value);
    getInput(event.target.value);
  };
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={eventInput}
        type="text"
        placeholder="Поиск пицц"
        className={styles.input}
        maxLength={45}
      />
      {value && <div className={styles.cross} onClick={focusInput}></div>}
    </div>
  );
}
