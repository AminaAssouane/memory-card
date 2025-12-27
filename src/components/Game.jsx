import { useEffect, useState } from "react";
import { Card } from "./Card.jsx";
import { Board } from "./Board.jsx";
import { Score } from "./Score.jsx";

export function Game() {
  const [cards, setCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const currentScore = cards.filter((card) => card.clicked).length;

  useEffect(() => {
    async function fetchPokemon() {
      const ids = [6, 8, 12, 14, 16, 21, 26, 35, 66, 67, 100, 120];

      const promises = ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );

      const results = await Promise.all(promises);

      const pokemonCards = results.map((pokemon) => ({
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

  function shuffle(cardsToShuffle) {
    let currentIndex = cardsToShuffle.length;
    let newCards = [...cardsToShuffle];

    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newCards[currentIndex], newCards[randomIndex]] = [
        newCards[randomIndex],
        newCards[currentIndex],
      ];
    }

    return newCards;
  }

  /* Wrong function : 
  function handleCardClick(id) {
    let lost = false;
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id !== id) {
          console.log("hope i aint here");
          return card;
        } else {
          if (!card.clicked) {
            console.log("in the if");
            return { ...card, clicked: true };
          } else {
            console.log("in the else");
            lost = true;
            return card;
          }
        }
      });
      return updatedCards;
    });
    if (!lost) {
      setCurrentScore((prev) => prev + 1);
      shuffle();
    } else loseGame();
  }*/

  function handleCardClick(id) {
    setCards((prevCards) => {
      const clickedCard = prevCards.find((card) => card.id === id);

      // If we lose
      if (clickedCard.clicked) {
        setBestScore((prevBest) =>
          currentScore > prevBest ? currentScore : prevBest
        );

        return shuffle(
          prevCards.map((card) => ({
            ...card,
            clicked: false,
          }))
        );
      }

      // If it's a correct click
      const updatedCards = prevCards.map((card) =>
        card.id === id ? { ...card, clicked: true } : card
      );

      return shuffle(updatedCards);
    });
  }

  return (
    <>
      <h1>Memory card game</h1>
      <Score currentScore={currentScore} bestScore={bestScore} />
      <Board cards={shuffle(cards)} onClick={handleCardClick} />
    </>
  );
}
