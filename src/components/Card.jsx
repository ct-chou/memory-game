import { useState, useEffect } from 'react';
import '../styles/Card.css';

const pokedexInitial = [ 'eevee', 'snorlax', 'pikachu', 'mew', 'charizard', 'bulbasaur', 'squirtle', 'jigglypuff', 'cubone', 'charmander'];

function shuffle(array) {
  const shuffledArray = [...array]; // Create a copy of the array to avoid mutating the original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


function CardGame({score, setScore, highScore, setHighScore}) {
  const [imgUrls, setImgUrls] = useState([]); // Initialize imgUrl state to null
  const [pokedex, setPokedex] = useState(pokedexInitial); // Array of Pokemon names
  const [selectedList, setSelectedList] = useState([]); // Array to store selected Pokemon names
  const [gameOver, setGameOver] = useState(false); // State to track game over status

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    async function catchPokemon(namePokemon) {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + namePokemon);
      const data = await response.json();
      if(isMounted) {
        setImgUrls((prevImgUrls) => [
          ...prevImgUrls,
          { name: namePokemon, imgUrl: data.sprites.front_default }
        ]);
      }
    }
    pokedexInitial.forEach(namePokemon => {
      catchPokemon(namePokemon);
    });

    return () => {
      isMounted = false;
    };

  }, []);

  function getPokemonUrl(name) {
    const pokemonUrl = imgUrls.find(pokemon => pokemon.name === name);
    return pokemonUrl ? pokemonUrl.imgUrl : null;
  }
  
  function selectImage(pokemonName) {
    if(selectedList === null) {
      setSelectedList([pokemonName]);
      setScore(score + 1);
    }
    else if(selectedList.find((name) => name === pokemonName)) {
      if(score > highScore) {
        setHighScore(score);
      }
      setGameOver(true);
    }
    else {
      setSelectedList((prevSelectedList) => [...prevSelectedList, pokemonName]);
      setScore(score + 1);
    }
    setPokedex(shuffle(pokedex));
  }

  function resetGame() {
    setScore(0);
    setSelectedList([]);
    setGameOver(false);
  }

  return (
    <>
      {gameOver && (
        <div className="overlay">
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Your score: {score}</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}

      <div className="card-container">
        {pokedex.map((pokemon) => ( // Conditionally render the image only when imgUrl is available
          <div key={pokemon} className="card">
            <img 
              src={getPokemonUrl(pokemon)} 
              alt="Pokemon" 
              className='pokemon-image'
              onClick = {() => selectImage(pokemon)} // Call selectImage with the pokemon name
              />
            <p>{pokemon}</p>
          </div>
          ))}
      </div>
    </>
  );
}

export default CardGame;