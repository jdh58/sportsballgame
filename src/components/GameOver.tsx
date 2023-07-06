import Button from './Button';

import '../styles/GameOver.css';

export default function GameOver() {
  return (
    <div className="page gameOverPage">
      <h1 className="gameOver">Game Over!</h1>
      <div className="scoreContainer">
        <p className="bestIndicator">NEW BEST!</p>
        <h2 className="score">
          <span className="label">Score:</span>
          21
        </h2>
      </div>
      <h2 className="personalBest">
        <span className="label">Personal Best:</span>
        21
      </h2>
      <h2 className="mode">
        <span className="label">Mode:</span>5 Rounds
      </h2>
      <div className="buttons">
        <Button label="Play Again" icon="" size="taller" classes="easy" />
        <div className="buttonContainer">
          <Button label="Game Options" icon="" size="taller" classes="" />
          <Button label="Main Menu" icon="" size="taller" classes="" />
        </div>
        <Button label="Leaderboards" icon="" size="taller" classes="" />
      </div>
    </div>
  );
}
