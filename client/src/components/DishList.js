import React, { useState, useEffect } from "react";
import Dish from "./Dish";
import { useParams } from "react-router-dom";

export default function DishList(props) {
  const { onAdd, signedInUser } = props;
  const { category } = useParams();
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/menus/${category}`);
        if (!response.ok) {
          setError(await response.json());
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        setDishes(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [category]);


  return (
    <>
      {
        isLoading ? <p> Loading...</p> :
          error && error.menuError ? <h4 className="text-danger">{error.menuError}</h4> :
            dishes.length > 0 ? (
              <div className="dishContainer">
                <ul className="dishList row">
                  {dishes.map((dish) => (
                    <li key={dish._id} className="col-xl-3 col-lg-4 col-md-6" >
                      <Dish key={dish._id} dish={dish} onAdd={onAdd} signedInUser={signedInUser} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <h3>Coming Soon</h3>
            )
      }
    </>
  );
}
