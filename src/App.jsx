import { useState } from 'react'
import './App.css'
import CardGame from './components/Card.jsx'

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);


  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
        <div id='scoreboard'>
          <div className="score">
              Current score is {score}
          </div>
          <div className="score">
              High score is {highScore}
          </div>
        </div>
      </header>
      
      <p className="instructions">
        Select a card to earn points. If you select a card that has already been selected, you lose. 
      </p>
      <CardGame 
        score={score} 
        setScore={setScore} 
        highScore={highScore}
        setHighScore={setHighScore}
      >

      </CardGame>
    </>
  )
}

export default App
