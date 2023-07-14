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

export default function OptionsPage() {
  const [sport, setSport] = useState('nba');
  const [difficulty, setDifficulty] = useState('medium');
  const [rounds, setRounds] = useState('free');

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
            <ToggleSwitch active={false} />
            <h3 className="time">Time</h3>
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
        />
      </div>
    </div>
  );
}
