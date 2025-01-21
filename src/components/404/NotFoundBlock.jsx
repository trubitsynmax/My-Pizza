import styles from "./NotFoundBlock.module.scss";
import { Link } from "react-router";
export default function NotFoundBlock() {
  return (
    <div className={styles.block}>
      <h2 className={styles.subtitle}>
        <span className={styles.title}>😢</span>
        <br /> К сожалению, данной страницы не существует
      </h2>
      <Link to="/" className={styles.btn}>
        На главную
      </Link>
    </div>
  );
}
