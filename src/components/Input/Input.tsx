import React, { useCallback, useRef, useState } from "react";
import styles from "./Input.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setValueInput } from "../../redux/slices/filterSlice";

const Input: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    setValue("");
    dispatch(setValueInput(""));
    inputRef.current?.focus();
  };

  const getInput = useCallback(
    debounce((str: string) => {
      dispatch(setValueInput(str));
    }, 500),
    []
  );

  const eventInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
};

export default Input;
