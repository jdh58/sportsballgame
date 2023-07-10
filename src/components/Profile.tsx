import ProfilePic from './ProfilePic';
import Button from './Button';

export default function Profile() {
  return (
    <div className="page profilePage">
      <div className="mainContainer">
        <div className="profileHeader">
          <ProfilePic image="" />
          <div className="nameInfo">
            <h1 className="username">jdh58</h1>
            <div className="badges">
              <div className="badge"></div>
              <div className="badge"></div>
              <div className="badge"></div>
              <div className="badge"></div>
              <div className="badge"></div>
              <div className="badge"></div>
            </div>
          </div>
          <div className="buttons">
            <Button label="Message" icon="" size="" classes="" />
            <Button label="+ Add" icon="" size="" classes="easy" />
          </div>
        </div>
        <div className="separator"></div>
        <div className="topScores">
          <h2 className="scoresHeader">
            <p>Top Scores</p>
            <img src="small arrow right" alt="" />
          </h2>
          <div className="scoresContainer">
            <div className="third">
              <img src="ribbon" alt="" />
              <h3 className="score">2</h3>
              <p className="topPercentage">Top 32.6%</p>
            </div>
            <div className="first">
              <img src="ribbon" alt="" />
              <h3 className="score">32</h3>
              <p className="topPercentage">Top 1.1%</p>
            </div>
            <div className="second">
              <img src="ribbon" alt="" />
              <h3 className="score">4</h3>
              <p className="topPercentage">Top 2.7%</p>
            </div>
          </div>
        </div>
        <div className="separator"></div>
        <div className="favoritesList">
          <h2 className="favoritesHeader">Favorites</h2>
          <div className="favoritesContainer">
            <div className="team">
              <h3>Team:</h3>
              <img src="team" alt="" />
              <p>Top 32.6%</p>
            </div>
            <div className="sport">
              <h3>Sport:</h3>
              <img src="sportsball" alt="" />
              <p>Top 1.1%</p>
            </div>
            <div className="game">
              <h3>Game:</h3>
              <img src="gameIcon" alt="" />
              <p>Top 2.7%</p>
            </div>
            <div className="player">
              <h3>Player:</h3>
              <img src="playerHeadshot" alt="" />
              <p>Top 2.7%</p>
            </div>
          </div>
        </div>
        <div className="endSeparator">
          <div className="separator"></div>
          <p className="report">Report User?</p>
        </div>
      </div>
    </div>
  );
}
