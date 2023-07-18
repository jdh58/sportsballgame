import Button from '../components/Button';

import Search from '../assets/search.svg';
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
import '../styles/GuessField.css';
import '../styles/GameOver.css';

import ArrowRight from '../assets/arrow-right.svg';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function WhoAmI() {
  const [sport, setSport] = useState('nba');
  const [difficulty, setDifficulty] = useState('medium');
  const [rounds, setRounds] = useState(-1);
  const [overlay, setOverlay] = useState('none');

  const [guessDisabled, setGuessDisabled] = useState(false);
  const [hintDisabled, setHintDisabled] = useState(false);

  const [gameID, setGameID] = useState([]);
  const [round, setRound] = useState([-1]);
  const [score, setScore] = useState(0);
  const [scoreDiff, setScoreDiff] = useState(0);
  const [hints, setHints] = useState<Array<string>>([]);
  const [hintText, setHintText] = useState<Array<string>>([]);
  const [hintLevel, setHintLevel] = useState(4);
  const [playerPicture, setPlayerPicture] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [autofillAnswers, setAutofillAnswers] = useState([]);
  const [guessFocus, setGuessFocus] = useState(false);

  const navigate = useNavigate();
  const [gameState, setGameState] = useState('before');

  const Auth = useContext(AuthContext);

  const startGame = async () => {
    setGameState('loading');

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

  const submitGuess = async (e) => {
    // Disable the guess and hint buttons
    setGuessDisabled(true);
    setHintDisabled(true);

    const guess = searchQuery;

    // Wipe the search field
    setSearchQuery('');

    const response = await fetch(
      'http://localhost:3100/api/game/whoami/guess',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess, gameID }),
      }
    );
    const json = await response.json();

    // If the search query didn't work, tell the user.
    if (response.status !== 200) {
      setSearchQuery(json.error);
      return;
    }

    console.log(json);

    // If it's correct, show the score addition
    // iterate the round, update the score, set the correct player, set the score difference
    // wait 2 seconds, fade into correct overlay with score showing,
    if (json.correct) {
      const scoreAdded = hintLevel;
      setRound([...round, hintLevel]);
      setScore((score) => score + scoreAdded);
      setCorrectAnswer(json.correctPlayer);
      setScoreDiff(scoreAdded);
      // Wait for 2 seconds
      await new Promise((res) => setTimeout(res, 2000));
      // Show the overlay
      setOverlay('correct');
    } else {
      setRound([...round, hintLevel]);
      setCorrectAnswer(json.correctPlayer);
      // Wait for 2 seconds
      await new Promise((res) => setTimeout(res, 2000));
      // Show the overlay
      setOverlay('incorrect');
    }

    // If it's the end of the game, do that
    if (json.gameEnd) {
      setGameState('after');
      return;
    }

    // Otherwise, set hints to the new hints, set picture to the new picture
    // and set hint level back to 4

    // Update with new info
    setHintLevel(4);
    setPlayerPicture(json.newPlayer.playerPicture);
    setHintText([]);
    setHints([json.newPlayer.hints]);

    // Wipe the current info
    setCorrectAnswer('');

    await new Promise((res) => setTimeout(res, 2000));
    setOverlay('none');

    // Enable the buttons again
    setGuessDisabled(false);
    setHintDisabled(false);
  };

  // This will cause a text writing effect for the hints
  useEffect(() => {
    if (hints.length === 0) {
      return;
    }

    console.log('hints updated');
    const lastIndex = hints.length - 1;
    let tempString = '';
    let i = 0;

    writeLoop();
    function writeLoop() {
      setTimeout(() => {
        tempString += hints[lastIndex][i];
        setHintText([...hintText, tempString]);

        i++;
        if (i < hints[lastIndex].length) {
          writeLoop();
        }
        return;
      }, 50);
    }
  }, [hints]);

  // This will show the autocomplete if the text field is in focus
  useEffect(() => {
    if (!guessFocus || !searchQuery) {
      setAutofillAnswers([]);
      return;
    }

    (async () => {
      // Grab the answers based off the query
      const response = await fetch(
        `http://localhost:3100/api/game/playerSearch?search=${searchQuery}`
      );
      const json = await response.json();
      const top5Answers = json.top5Answers;

      // Return the <li> elements for each answer
      setAutofillAnswers(
        top5Answers.map((answer: { name: string }) => (
          <li
            className="autofillAnswer"
            onMouseDown={() => {
              setSearchQuery(answer.name);
              setGuessFocus(false);
            }}
            key={answer.name}
          >
            {answer.name}
          </li>
        ))
      );
    })();
  }, [guessFocus, searchQuery]);

  return (
    <>
      {gameState === 'loading' && (
        <div className="page optionsPage">
          <LoadingSpinner />
        </div>
      )}
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
                  className={`optionButton ${rounds === -1 ? 'selected' : ''}`}
                  onClick={() => {
                    setRounds(-1);
                  }}
                >
                  <p className="label">Freeplay</p>
                </button>
                <button
                  className={`optionButton ${rounds === 3 ? 'selected' : ''}`}
                  onClick={() => {
                    setRounds(3);
                  }}
                >
                  <p className="label">
                    3
                    <br />
                    Rounds
                  </p>
                </button>
                <button
                  className={`optionButton ${rounds === 5 ? 'selected' : ''}`}
                  onClick={() => {
                    setRounds(5);
                  }}
                >
                  <p className="label">
                    5
                    <br />
                    Rounds
                  </p>
                </button>
                <button
                  className={`optionButton ${rounds === 10 ? 'selected' : ''}`}
                  onClick={() => {
                    setRounds(10);
                  }}
                >
                  <p className="label">
                    10
                    <br />
                    Rounds
                  </p>
                </button>
                <button
                  className={`optionButton ${rounds === 25 ? 'selected' : ''}`}
                  onClick={() => {
                    setRounds(25);
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
              <div className="guessFieldContainer">
                <div className="guessField">
                  <div className="searchIconContainer">
                    <img src={Search} alt="" className="searchIcon" />
                  </div>
                  <input
                    type="text"
                    name="guess"
                    id="guess"
                    placeholder="Type your guess..."
                    maxLength={50}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.currentTarget.value);
                    }}
                    onFocus={() => {
                      setGuessFocus(true);
                    }}
                    onBlur={() => {
                      setGuessFocus(false);
                    }}
                  />
                </div>
                {autofillAnswers.length > 0 && (
                  <ul className="autofillContainer">{autofillAnswers}</ul>
                )}
              </div>
              <Button
                label="Guess"
                type="button"
                icon=""
                classes="small guess"
                disabled={guessDisabled}
                onClick={submitGuess}
              />
              <Button
                label="Next Hint"
                type="button"
                icon=""
                classes="small nexthint"
                disabled={hintDisabled}
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
                      className={
                        correctAnswer ? 'silhouette visible' : 'silhouette'
                      }
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
                <p className="score">+{scoreDiff} Points</p>
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
              <div className="score">Score: {score}</div>
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
      {gameState === 'after' && (
        <div className="page gameOverPage">
          <h1 className="gameOver">Game Over!</h1>
          <div className="scoreContainer">
            {/* <p className="bestIndicator">NEW BEST!</p> */}
            <h2 className="score">
              <span className="label">Score:</span>
              {score}
            </h2>
          </div>
          {Auth.user && (
            <h2 className="personalBest">
              <span className="label">Personal Best:</span>
              21
            </h2>
          )}
          <h2 className="mode">
            <span className="label">Mode:</span>
            {rounds} Rounds
          </h2>
          <div className="buttons">
            <div className="buttonContainer">
              <Button
                label="Play Again"
                type="button"
                icon=""
                classes="taller easy"
                disabled={false}
                onClick={() => {
                  setGameState('before');
                }}
              />
            </div>
            <div className="buttonContainer">
              <Button
                label="Main Menu"
                type="button"
                icon=""
                classes="taller"
                disabled={false}
                onClick={() => {
                  navigate('/');
                }}
              />
              <Button
                label="Leaderboards"
                type="button"
                icon=""
                classes="taller"
                disabled={false}
                onClick={() => {
                  navigate('/leaderboard');
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
