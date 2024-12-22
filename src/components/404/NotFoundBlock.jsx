import styles from "./NotFoundBlock.module.scss";
export default function NotFoundBlock() {
  return (
    <div className={styles.block}>
      <h2 className={styles.subtitle}>
        <span className={styles.title}>😢</span>
        <br /> К сожалению, данной страницы не существует
      </h2>
      <p className={styles.text}>Вернитесь на главную страницу</p>
    </div>
  );
}
