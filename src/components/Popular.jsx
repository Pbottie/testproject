import { useEffect, useState } from "react";
function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        "https://api.spoonacular.com/recipes/random?number=9",
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
          },
        }
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes))
      setPopular(data.recipes);
    }
  };

  return (
    <div>
      {popular.map((recipe) => {
        return (
          <div key={recipe.id}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.instructions}</p>
          </div>
        );
      })}
    </div>
  );
}
export default Popular;
