import ToggleSwitch from '../components/ToggleSwitch';
import Button from '../components/Button';
import NBA from '../assets/nba.png';
import MLB from '../assets/mlb.png';
import NFL from '../assets/nfl.png';

import '../styles/SportsContainer.css';
import '../styles/DifficultyContainer.css';
import '../styles/RoundContainer.css';

import ArrowRight from '../assets/arrow-right.svg';
import '../styles/OptionsPage.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OptionsPage() {
  const [sport, setSport] = useState('nba');
  const [difficulty, setDifficulty] = useState('medium');
  const [rounds, setRounds] = useState('free');

  const navigate = useNavigate();

  const startGame = () => {
    // Redirect user to the game page
    navigate('/whoami');
  };

  // TO-DO: Start button starts the game, go from there

  // User presses start, they get redirected to /whoami

  // First, ensure the player has a token that is valid. If not, redirect to logout
  // A new Game document is created that has the username, game type, round type,
  // difficulty type, player's score, what round they're on, the 4 hints for that
  // round, the correct answer name, the correct player's silouhette, timestamp,
  // and the hint they're on

  // The game fades in and starts with the round indicator on 0, blurred player.
  // The guess button is greyed out when a guess is not entered. Next hint active
  // The first hint is scrolled onto the screen like text writing
  // Then you can either type a guess with the dropdown menu or press next hint
  // You have to select one of the pre selected answers for guess to activate

  // On guess, the database will check the guess against the correct player name

  // If incorrect, it will keep the score at 0, pick the next player, create the new hints,
  // iterate the round,

  // If correct, it will check how many hints have been shown, and update the
  // score off of that. Then it will pick the next player, create the new hints,
  // and iterate the round,

  // On frontend,
  // Round indicator will iterate with failure and scroe will stay 0
  // The silouhette will become slightly less blurred
  // If you guess wrong, it will fade in the incorrect thing and then fade to next player
  // If you guess right, it will fade in the correct thing and then fade to next player
  // and also update your score

  // When the rounds exceed the max amount of rounds, trigger the endgame
  // Check if the user really is who they say they are
  // If they are, then add that score to the scores collection with all the
  // relevant game and player info

  // For the time version. there should just be a clock next to the score on
  // the frontend that ticks, and after every round if the type of game is timed
  // the database should check that the current time is not past the timestamp +
  // whatever was selected

  // IMPLEMENT LEADERBOARD DROP DOWN MENUS with state

  // By default, attatch the logged in user score to the bottom of scoreboard
  // If they dont have one put none instead of score

  // On top scores click, attatch the clicked user as well as the logged in

  // Get top scores working

  return (
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
              className={`optionButton ${sport === 'nba' ? 'selected' : ''}`}
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
              className={`optionButton ${sport === 'nfl' ? 'selected' : ''}`}
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
              className={`optionButton ${sport === 'mlb' ? 'selected' : ''}`}
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
              className={`optionButton ${rounds === 'free' ? 'selected' : ''}`}
              onClick={() => {
                setRounds('free');
              }}
            >
              <p className="label">Freeplay</p>
            </button>
            <button
              className={`optionButton ${rounds === 'three' ? 'selected' : ''}`}
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
              className={`optionButton ${rounds === 'five' ? 'selected' : ''}`}
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
              className={`optionButton ${rounds === 'ten' ? 'selected' : ''}`}
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
  );
}
