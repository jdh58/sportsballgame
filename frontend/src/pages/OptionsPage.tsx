import SportsContainer from '../components/SportsContainer';
import DifficultyContainer from '../components/DifficultyContainer';
import RoundContainer from '../components/RoundContainer';
import ToggleSwitch from '../components/ToggleSwitch';
import Button from '../components/Button';

import ArrowRight from '../assets/arrow-right.svg';
import '../styles/OptionsPage.scss';

export default function OptionsPage() {
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
          <SportsContainer />
        </div>
        <div className="optionContainer">
          <h3>Difficulty</h3>
          <DifficultyContainer sport="nba" />
        </div>
        <div className="optionContainer">
          <div className="toggle">
            <h3 className="rounds">Rounds</h3>
            <ToggleSwitch />
            <h3 className="time">Time</h3>
          </div>
          <RoundContainer />
        </div>
        <Button label="Start" icon={ArrowRight} classes="default easy" />
      </div>
    </div>
  );
}
