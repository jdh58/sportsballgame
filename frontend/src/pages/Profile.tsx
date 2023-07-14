import ProfilePic from '../components/ProfilePic';
import Button from '../components/Button';

import Blank from '../assets/white.png';
import Badge1k from '../assets/1kbadge.svg';
import Badge2k from '../assets/2kbadge.svg';
import Badge3k from '../assets/3kbadge.svg';
import Badge4k from '../assets/4kbadge.svg';
import Badge5k from '../assets/5kbadge.svg';
import Badge6k from '../assets/6kbadge.svg';
import RightArrow from '../assets/small-right-arrow.svg';
import Ribbon from '../assets/ribbon.svg';
import Medals from '../assets/medals.svg';
import Blazers from '../assets/blazers.png';
import ARod from '../assets/arod.png';
import LeBron from '../assets/lebron.webp';
import Baseball from '../assets/baseball.png';

import DropdownMenu from '../components/DropdownMenu';

import '../styles/Profile.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

type User = {
  email: string;
  username: string;
  profilePicURL: string;
  scores: object;
  badges: object;
};

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState<User | null>(null);

  const urlID = useParams().userID;

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await fetch(`http://localhost:3100/api/user/${urlID}`);
        const json = await response.json();

        setProfileUser(json);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [urlID]);

  return (
    <div className="page profilePage">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mainContainer">
          <div className="profileHeader">
            {profileUser ? (
              <ProfilePic image={profileUser.profilePicURL} />
            ) : null}
            <div className="nameInfo">
              <h1 className="username">{profileUser?.username}</h1>
              <div className="badges">
                {/* <div className="badge">
                <img src={Badge1k} alt="" />
              </div>
              <div className="badge">
                <img src={Badge2k} alt="" />
              </div>
              <div className="badge">
                <img src={Badge3k} alt="" />
              </div>
              <div className="badge">
                <img src={Badge4k} alt="" />
              </div>
              <div className="badge">
                <img src={Badge5k} alt="" />
              </div>
              <div className="badge">
                <img src={Badge6k} alt="" />
              </div> */}
              </div>
            </div>
            <div className="buttons">
              <Button
                label="Message"
                type="button"
                icon=""
                classes="smaller"
                disabled={true}
                onClick={undefined}
              />
              <Button
                label="+ Add"
                type="button"
                icon=""
                classes="smaller easy"
                disabled={true}
                onClick={undefined}
              />
            </div>
          </div>
          <div className="separator"></div>
          <div className="topScores">
            <h2 className="scoresHeader">
              <p>Top Scores</p>
              <div className="rightArrow">
                <img src={RightArrow} alt="small arrow right" />
              </div>
            </h2>
            <div className="scoresContainer">
              <div className="third">
                <div className="ribbonContainer">
                  <img src={Ribbon} alt="third place ribbon" />
                </div>
                <div className="scoreInfo">
                  <h3 className="score">2</h3>
                  <p className="topPercentage">Top 32.6%</p>
                  <p className="game">NFL Who Am I (5 Rds)</p>
                </div>
              </div>
              <div className="first">
                <div className="ribbonContainer">
                  <img src={Medals} alt="first place medal" />
                </div>
                <div className="scoreInfo">
                  <h3 className="score">32</h3>
                  <p className="topPercentage">Top 1.1%</p>
                  <p className="game">NBA Who Am I (3 Min)</p>
                </div>
              </div>
              <div className="second">
                <div className="ribbonContainer">
                  <img src={Ribbon} alt="second place ribbon" />
                </div>
                <div className="scoreInfo">
                  <h3 className="score">4</h3>
                  <p className="topPercentage">Top 2.7%</p>
                  <p className="game">MLB Grids (3 Rds)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="favoritesList">
            <h2 className="favoritesHeader">Favorites</h2>
            <div className="favoritesContainer">
              <div className="team">
                <h3>Team:</h3>
                <img src={Blazers} alt="" />
                <p>Portland Trail Blazers</p>
              </div>
              <div className="sport">
                <h3>Sport:</h3>
                <img src={Baseball} alt="" />
                <p>Baseball</p>
              </div>
              <div className="game">
                <h3>Game:</h3>
                <img src={LeBron} alt="" />
                <p>Who Am I</p>
              </div>
              <div className="player">
                <h3>Player:</h3>
                <img src={ARod} alt="" />
                <p>Aaron Rodgers</p>
              </div>
            </div>
          </div>
          <div className="endSeparator">
            <div className="separator"></div>
            <p className="report">Report User?</p>
          </div>
        </div>
      )}
    </div>
  );
}
