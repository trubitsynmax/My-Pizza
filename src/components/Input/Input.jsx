import styles from "./Input.module.scss";
export default function Input({ usersValue, setUsersValue }) {
  return (
    <div className={styles.root}>
      <input
        value={usersValue}
        onChange={(event) => setUsersValue(event.target.value)}
        type="text"
        placeholder="Поиск пицц"
        className={styles.input}
        maxLength={45}
      />
      {usersValue && (
        <div className={styles.cross} onClick={() => setUsersValue("")}></div>
      )}
    </div>
  );
}
