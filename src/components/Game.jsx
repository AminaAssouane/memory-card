import { useEffect, useState } from "react";
import { Card } from "./Card.jsx";
import { Board } from "./Board.jsx";

export function Game() {
  console.log("game logging");
  const [cards, setCards] = useState([]);
  const [board, setBoard] = useState(cards);

  useEffect(() => {
    console.log("useEffect running");

    async function fetchPokemon() {
      const ids = [6, 8, 12, 14, 16, 21, 26, 35, 66, 67, 100, 120];

      const promises = ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );

      const results = await Promise.all(promises);

      const pokemonCards = results.map((pokemon) => ({
        key: pokemon.id,
        id: pokemon.id,
        name: pokemon.name,
        imgUrl: pokemon.sprites.front_default,
        clicked: false,
      }));
      console.log(pokemonCards);

      setCards(pokemonCards);
    }

    fetchPokemon();
  }, []);

  function shuffle() {}

  return (
    <>
      <h1>Memory card game</h1>
      <Board cards={cards} />
    </>
  );
}
