import { Card, Categories, Skeleton, Sort } from "../components/script";

export default function Home({ isOpen, setIsOpen, error, isLoading, data }) {
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {error && (
            <div>
              К сожалению, произошла какая ошибка, попробуйте повторить попытку
              позже 😟
            </div>
          )}
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : data.map((item, index) => <Card key={index} {...item} />)}
        </div>
      </div>
    </>
  );
}
