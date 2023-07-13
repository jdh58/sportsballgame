import NBA from '../assets/nba.png';
import MLB from '../assets/mlb.png';
import NFL from '../assets/nfl.png';
import '../styles/SportsContainer.css';

export default function SportsContainer() {
  return (
    <div className="sportsContainer">
      <button className="optionButton">
        <div className="optionPicContainer">
          <img src={NBA} alt="" />
        </div>
        <p>NBA</p>
      </button>
      <button className="optionButton">
        <div className="optionPicContainer">
          <img src={NFL} alt="" />
        </div>
        <p>NFL</p>
      </button>
      <button className="optionButton">
        <div className="optionPicContainer">
          <img src={MLB} alt="" />
        </div>
        <p>MLB</p>
      </button>
    </div>
  );
}
