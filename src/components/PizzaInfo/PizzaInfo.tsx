import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { fetchOnePizza } from "../../redux/slices/additionally/additionallySlice";
import styles from "./PizzaStyles.module.scss";
import image from "../../assets/img/pending.gif";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const PizzaInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const pizza = useAppSelector((state) => state.additionally.item);
  const status = useAppSelector((state) => state.additionally.status);
  useEffect(() => {
    dispatch(fetchOnePizza(id || "error"));
  }, []);
  return (
    <>
      {status === "succes" && (
        <div className={styles.pizza}>
          <div className="container">
            {pizza.map((item) => (
              <div className={styles.pizza__wrapper} key={item.id}>
                <Link to="/">
                  <img
                    src={item.imageUrl}
                    className={styles.pizza__image}
                    alt="К сожалению, картинка где-то по пути к вам потерялась 😥"
                  />
                </Link>
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
                    {info.compoud.map((compoud, index) => (
                      <div key={index}>
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
};

export default PizzaInfo;
