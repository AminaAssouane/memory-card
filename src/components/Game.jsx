import { useEffect, useState } from "react";
import { Card } from "./Card.jsx";
import { Board } from "./Board.jsx";

export function Game() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
      const data = await response.json();
      setData(data);
    }

    fetchPokemon();
  }, []);

  function shuffle() {}
}
