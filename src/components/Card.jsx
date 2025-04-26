import { useState, useEffect } from 'react';
import '../styles/Card.css';

const pokedex = [ 'eevee', 'snorlax', 'pikachu', 'mew', 'charizard', 'bulbasaur', 'squirtle', 'jigglypuff', 'cubone', 'charmander']; // Array of Pokemon names

function Card() {
  const [imgUrls, setImgUrls] = useState([]); // Initialize imgUrl state to null

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
    pokedex.forEach(namePokemon => {
      catchPokemon(namePokemon);
    });

    return () => {
      isMounted = false;
    };

  }, []);
  
  console.log(imgUrls); // Log the imgUrls to see the fetched data

  return (
    <div className="card-container">
      {imgUrls.map((pokemon) => ( // Conditionally render the image only when imgUrl is available
        <div key={pokemon.name} className="card">
          <img src={pokemon.imgUrl} alt="Pokemon" className='pokemon-image'/>
          <p>{pokemon.name}</p>
        </div>
        ))}
    </div>
    
  );
}

export default Card;