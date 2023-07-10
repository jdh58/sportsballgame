import Button from './Button';
import GuessField from './GuessField';
import LeBron from '../assets/lebron.webp';
import Check from '../assets/check.svg';
import Close from '../assets/close.svg';

import '../styles/WhoAmI.css';
import { useState } from 'react';

export default function WhoAmI() {
  const [overlay, setOverlay] = useState<string | null>('');

  return (
    <div className="page whoAmIPage">
      <div className="mainContainer">
        <div className="inputs">
          <GuessField type="player" />
          <Button label="Guess" icon="" size="small" classes="guess" />
          <Button label="Next Hint" icon="" size="small" classes="nexthint" />
        </div>
        {overlay ? null : (
          <div className="gameContainer">
            <div className="hintsContainer">
              <div className="impossible">
                <h3>Impossible (4 pts)</h3>
                <p className="hint">I ate a Banana in the 6th grade</p>
              </div>
              <div className="hard">
                <h3>Hard (3 pts)</h3>
                <p className="hint">
                  I went to Kentucky for college. It's lit!
                </p>
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
                <img src={LeBron} alt="" className="silhouette" />
              </div>
              <h4 className="playerName">Lebron James</h4>
            </div>
          </div>
        )}

        {overlay === 'correct' ? (
          <div className="notifyContainer correct">
            <div className="iconContainer">
              <img src={Check} alt="" />
            </div>
            <p className="correct">Correct!</p>
            <p className="score">+5 Points</p>
          </div>
        ) : null}
        {overlay === 'incorrect' ? (
          <div className="notifyContainer incorrect">
            <div className="iconContainer">
              <img src={Close} alt="" />
            </div>
            <p className="incorrect">Incorrect!</p>
            <p className="score">No Points ;(</p>
          </div>
        ) : null}

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
