import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { fetchOnePizza } from "../../redux/slices/additionallySlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PizzaStyles.module.scss";
import image from "../../assets/img/pending.gif";

export default function PizzaInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pizza = useSelector((state) => state.additionally.item);
  const status = useSelector((state) => state.additionally.status);
  useEffect(() => {
    dispatch(fetchOnePizza(id));
  }, []);
  return (
    <>
      {status === "succes" && (
        <div className={styles.pizza}>
          <div className="container">
            {pizza.map((item) => (
              <div className={styles.pizza__wrapper} key={item.id}>
                <img
                  src={item.imageUrl}
                  className={styles.pizza__image}
                  alt="К сожалению, картинка где-то по пути к вам потерялась 😥"
                />
                <h2 className={styles.pizza__title}>{item.name}</h2>
                <p className={styles.pizza__price}>
                  Цена данной пиццы: {item.price}
                </p>
                <p className={styles.pizza__rating}>
                  Рейтинг: {item.rating} 🍕
                </p>
                {item.info.map((info) => (
                  <div className={styles.pizza__body} key={info.caloric}>
                    <p className={styles.pizza__caloric}>
                      <span>Калорийность:</span> {info.caloric}
                    </p>
                    <p className={styles.pizza__proteins}>
                      <span>Белки:</span> {info.proteins}
                    </p>
                    <p className={styles.pizza__fats}>
                      <span>Жиры:</span> {info.fats}
                    </p>
                    <p className={styles.pizza__carbohydrates}>
                      <span>Углеводы:</span> {info.carbohydrates}
                    </p>
                    <p className={styles.pizza__dietaryFiber}>
                      <span>Диетическое волокно:</span> {info.dietaryFiber}
                    </p>
                    <p className={styles.pizza__water}>
                      <span>Вода:</span> {info.water}
                    </p>
                    <p className={styles.text}>В состав пиццы входит:</p>
                    {info.compoud.map((compoud) => (
                      <div key={compoud.length}>
                        <p>{compoud}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <Link to="/" className={styles.pizza__btn}>
              На главную
            </Link>
          </div>
        </div>
      )}
      {status === "pending" && (
        <div className={styles.pending}>
          <p>Идет загрузка, нужно немного подождать...</p>
          <img src={image} alt="Картинка где-то потерялась 😥" />
        </div>
      )}
      {status === "error" && (
        <div className={styles.error}>
          <p>
            К сожалению, произошла какая-то ошибка, попробуйте попытку позже 😥
          </p>
          <Link to="/" className={styles.pizza__btn}>
            На главную
          </Link>
        </div>
      )}
    </>
  );
}
