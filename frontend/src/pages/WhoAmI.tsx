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
  const [overlay, setOverlay] = useState('none');

  const [gameID, setGameID] = useState([]);
  const [hints, setHints] = useState<Array<string>>([]);
  const [hintText, setHintText] = useState<Array<string>>([]);
  const [hintLevel, setHintLevel] = useState(4);
  const [playerPicture, setPlayerPicture] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const navigate = useNavigate();
  const [gameState, setGameState] = useState('before');

  const Auth = useContext(AuthContext);

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

    // If the user has an invalid token, wipe the user and send them to login
    if (response.status === 401) {
      navigate('/logout');
      return;
    }

    // Otherwise, the game was successfully created. Update the game state
    setHints([json.hints]);
    setPlayerPicture(json.playerPicture);
    setGameID(json._id);
    setGameState('during');
    console.log(json);
  };

  const getHint = async () => {
    // If they've already got all the hints, return
    if (hintLevel <= 1) {
      return;
    }

    // Grab a new hint
    const response = await fetch(
      'http://localhost:3100/api/game/whoami/getHint',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.user?.token}`,
        },
        body: JSON.stringify({ gameID }),
      }
    );
    const json = await response.json();

    // Append it to the hints array
    setHints([...hints, json.hint]);
    setHintLevel(json.hintLevel);

    console.log(json);
  };

  // This will cause a text writing effect for the hints
  useEffect(() => {
    if (hints.length === 0) {
      return;
    }

    const lastIndex = hints.length - 1;

    let tempString = '';

    let i = 0;

    writeLoop();

    function writeLoop() {
      setTimeout(() => {
        tempString += hints[lastIndex][i];

        i++;

        if (i % 5 === 0) {
          console.log(hintText);
        }
        setHintText([...hintText, tempString]);

        if (i < hints[lastIndex].length) {
          writeLoop();
        }
        return;
      }, 50);
    }
  }, [hints]);

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
                onClick={getHint}
              />
            </div>
            {overlay === 'none' && (
              <div className="gameContainer">
                <div className="hintsContainer">
                  <div className="impossible">
                    <h3>Impossible (4 pts)</h3>
                    <p className="hint">{hintText[0] && hintText[0]}</p>
                  </div>
                  <div className="hard">
                    <h3>Hard (3 pts)</h3>
                    <p className="hint">{hintText[1] && hintText[1]}</p>
                  </div>
                  <div className="normal">
                    <h3>Normal (2 pts)</h3>
                    <p className="hint">{hintText[2] && hintText[2]}</p>
                  </div>
                  <div className="easy">
                    <h3>Easy (1 pts)</h3>
                    <p className="hint">{hintText[3] && hintText[3]}</p>
                  </div>
                </div>
                <div className="player">
                  <h2 className="title">Who Am I?</h2>
                  <div className="silhouetteContainer">
                    <img
                      src={playerPicture ? playerPicture : LeBron}
                      alt="player headshot silhouette"
                      className="silhouette"
                    />
                  </div>
                  <h4 className="playerName">
                    {correctAnswer && correctAnswer}
                  </h4>
                </div>
              </div>
            )}

            {overlay === 'correct' && (
              <div className="notifyContainer correct">
                <div className="iconContainer">
                  <img src={Check} alt="" />
                </div>
                <p className="correct">Correct!</p>
                <p className="score">+5 Points</p>
              </div>
            )}
            {overlay === 'incorrect' && (
              <div className="notifyContainer incorrect">
                <div className="iconContainer">
                  <img src={Close} alt="" />
                </div>
                <p className="incorrect">Incorrect!</p>
                <p className="score">No Points ;(</p>
              </div>
            )}
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
