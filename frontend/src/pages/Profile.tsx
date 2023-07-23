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

import { Link } from 'react-router-dom';

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
  _id: string;
};

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState<User | null>(null);

  const urlID = useParams().userID;

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await fetch(
          `https://sportsballgame.onrender.com/api/user/${urlID}`
        );
        const json = await response.json();

        setProfileUser(json.user);
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
            </div>
          </div>
          <div className="separator"></div>
          <div className="topScores">
            <Link
              to={`/leaderboard/${profileUser?.username}`}
              className="scoresHeader"
            >
              <p>View {profileUser?.username}'s Top Scores</p>
              <div className="rightArrow">
                <img src={RightArrow} alt="small arrow right" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
