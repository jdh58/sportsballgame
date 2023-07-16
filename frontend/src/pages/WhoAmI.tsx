import Button from '../components/Button';
import GuessField from '../components/GuessField';
import LeBron from '../assets/lebron.webp';
import Check from '../assets/check.svg';
import Close from '../assets/close.svg';
import NBA from '../assets/nba.png';
import MLB from '../assets/mlb.png';
import NFL from '../assets/nfl.png';

import '../styles/SportsContainer.css';
import '../styles/DifficultyContainer.css';
import '../styles/RoundContainer.css';
import '../styles/WhoAmI.css';
import '../styles/OptionsPage.scss';

import ArrowRight from '../assets/arrow-right.svg';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function WhoAmI() {
  const [sport, setSport] = useState('nba');
  const [difficulty, setDifficulty] = useState('medium');
  const [rounds, setRounds] = useState('free');

  const Auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('before');
  const [overlay, setOverlay] = useState<string | null>('correct');

  const startGame = async () => {
    // Start the game on the backend
    const response = await fetch(
      'http://localhost:3100/api/game/whoami/start',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.user?.token}`,
        },
        body: JSON.stringify({ sport, difficulty, rounds }),
      }
    );
    const json = await response.json();

    console.log(json);
    // If the user has an invalid token, wipe the user and send them to login
    if (response.status === 401) {
      navigate('/logout');
      return;
    }

    // Otherwise, the game was successfully created. Update the game state
    setGameState('during');
  };

  return (
    <>
      {gameState === 'before' && (
        <div className="page optionsPage">
          <div className="mainContainer">
            <h2 className="title">
              <p>
                Who Am I?
                <br />
                Game Options
              </p>
              <div className="separator"></div>
            </h2>
            <div className="optionContainer">
              <h3>Sport</h3>
              <div className="sportsContainer">
                <button
                  className={`optionButton ${
                    sport === 'nba' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setSport('nba');
                  }}
                >
                  <div className="optionPicContainer">
                    <img src={NBA} alt="" />
                  </div>
                  <p>NBA</p>
                </button>
                <button
                  className={`optionButton ${
                    sport === 'nfl' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setSport('nfl');
                  }}
                >
                  <div className="optionPicContainer">
                    <img src={NFL} alt="" />
                  </div>
                  <p>NFL</p>
                </button>
                <button
                  className={`optionButton ${
                    sport === 'mlb' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setSport('mlb');
                  }}
                >
                  <div className="optionPicContainer">
                    <img src={MLB} alt="" />
                  </div>
                  <p>MLB</p>
                </button>
              </div>
            </div>
            <div className="optionContainer">
              <h3>Difficulty</h3>
              <div className="difficultyContainer">
                <button
                  className={`optionButton ${
                    difficulty === 'easy' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setDifficulty('easy');
                  }}
                >
                  <p className="label">35+ Mins/G</p>
                  <p className="easy">Easy</p>
                </button>
                <button
                  className={`optionButton ${
                    difficulty === 'medium' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setDifficulty('medium');
                  }}
                >
                  <p className="label">15+ Mins/G</p>
                  <p className="medium">Medium</p>
                </button>
                <button
                  className={`optionButton ${
                    difficulty === 'hard' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setDifficulty('hard');
                  }}
                >
                  <p className="label">All Players</p>
                  <p className="hard">Hard</p>
                </button>
              </div>
            </div>
            <div className="optionContainer">
              <div className="toggle">
                <h3 className="rounds">Rounds</h3>
                {/* <ToggleSwitch active={false} />
              <h3 className="time">Time</h3> */}
              </div>
              <div className="roundContainer">
                <button
                  className={`optionButton ${
                    rounds === 'free' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setRounds('free');
                  }}
                >
                  <p className="label">Freeplay</p>
                </button>
                <button
                  className={`optionButton ${
                    rounds === 'three' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setRounds('three');
                  }}
                >
                  <p className="label">
                    3
                    <br />
                    Rounds
                  </p>
                </button>
                <button
                  className={`optionButton ${
                    rounds === 'five' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setRounds('five');
                  }}
                >
                  <p className="label">
                    5
                    <br />
                    Rounds
                  </p>
                </button>
                <button
                  className={`optionButton ${
                    rounds === 'ten' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setRounds('ten');
                  }}
                >
                  <p className="label">
                    10
                    <br />
                    Rounds
                  </p>
                </button>
                <button
                  className={`optionButton ${
                    rounds === 'twenty-five' ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setRounds('twenty-five');
                  }}
                >
                  <p className="label">
                    25
                    <br />
                    Rounds
                  </p>
                </button>
              </div>
            </div>
            <Button
              label="Start"
              type="button"
              icon={ArrowRight}
              classes="default easy"
              disabled={false}
              onClick={startGame}
            />
          </div>
        </div>
      )}
      {gameState === 'during' && (
        <div className="page whoAmIPage">
          <div className="mainContainer">
            <div className="inputs">
              <GuessField type="player" />
              <Button
                label="Guess"
                type="button"
                icon=""
                classes="small guess"
                disabled={false}
                onClick={undefined}
              />
              <Button
                label="Next Hint"
                type="button"
                icon=""
                classes="small nexthint"
                disabled={false}
                onClick={undefined}
              />
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
      )}
    </>
  );
}
