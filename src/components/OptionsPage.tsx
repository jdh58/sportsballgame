import SportsContainer from './SportsContainer';
import DifficultyContainer from './DifficultyContainer';
import RoundContainer from './RoundContainer';
import ToggleSwitch from './ToggleSwitch';
import '../styles/OptionsPage.css';

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
        <h3>Sport</h3>
        <SportsContainer />
        <h3>Difficulty</h3>
        <DifficultyContainer sport="nba" />
        <div className="toggle">
          <h3 className="time">Time</h3>
          <ToggleSwitch />
          <h3 className="rounds">Rounds</h3>
        </div>
        <RoundContainer />
        <button className="start">Start</button>
      </div>
    </div>
  );
}
