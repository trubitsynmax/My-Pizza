import { useCallback, useContext, useRef, useState } from "react";
import styles from "./Input.module.scss";
import { searchContext } from "../../App";
import debounce from "lodash.debounce";

export default function Input() {
  const [value, setValue] = useState("");
  const { usersValue, setUsersValue } = useContext(searchContext);
  const inputRef = useRef();

  const focusInput = () => {
    setValue("");
    setUsersValue("");
    inputRef.current.focus();
  };

  const getInput = useCallback(
    debounce((str) => {
      setUsersValue(str);
    }, 1000),
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
