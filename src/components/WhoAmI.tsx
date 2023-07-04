import Button from './Button';
import GuessField from './GuessField';

import '../styles/WhoAmI.css';

export default function WhoAmI() {
  return (
    <div className="page whoAmIPage">
      <div className="mainContainer">
        <div className="inputs">
          <GuessField type="player" />
          <Button label="Guess" icon="" size="small" classes="guess" />
          <Button label="Next Hint" icon="" size="small" classes="nexthint" />
        </div>
        <div className="gameContainer">
          <div className="hintsContainer">
            <div className="impossible">
              <h3>Impossible (4 pts)</h3>
              <p className="hint">I ate a Banana in the 6th grade</p>
            </div>
            <div className="hard">
              <h3>Hard (3 pts)</h3>
              <p className="hint">I went to Kentucky for college. It’s lit!</p>
            </div>
            <div className="normal">
              <h3>Normal (2 pts)</h3>
              <p className="hint">Bro just get it already come on</p>
            </div>
            <div className="easy">
              <h3>Easy (1 pts)</h3>
              <p className="hint">I am literally LeBron James</p>
            </div>
          </div>
          <div className="player">
            <h2 className="title">Who Am I?</h2>
            <div className="silhouetteContainer">
              <img src="" alt="" className="silhouette" />
            </div>
            <h4 className="playerName">Lebron James</h4>
          </div>
        </div>
        <div className="gameInfo">
          <div className="score">Score: 5</div>
          <div className="rounds">
            <div className="roundIndicator"></div>
            <div className="roundIndicator"></div>
            <div className="roundIndicator"></div>
            <div className="roundIndicator"></div>
            <div className="roundIndicator"></div>
            <div className="roundIndicator"></div>
            <div className="roundIndicator"></div>
            <div className="roundIndicator"></div>
            <div className="roundIndicator"></div>
            <div className="roundIndicator"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
