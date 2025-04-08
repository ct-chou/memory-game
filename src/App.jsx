import { useState } from 'react'
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  // const [highScore, setHighScore] = useState(0);


  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
        <div id='scoreboard'>
          <div className="card">
              Current score is {score}
          </div>
          <div className="card">
              High score is {score}
          </div>
        </div>
      </header>
      
      <p className="instructions">
        Select a card to earn points. If you select a card that has already been selected, you lose. 
      </p>
    </>
  )
}

export default App
