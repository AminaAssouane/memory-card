import { useEffect, useState } from "react";

export function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  if (!data) return <p>Loading...</p>;

  return <p>{data.name}</p>;
}
