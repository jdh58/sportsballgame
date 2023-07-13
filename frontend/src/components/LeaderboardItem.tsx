import ProfilePic from './ProfilePic';

import Blank from '../assets/white.png';

import '../styles/LeaderboardItem.css';

export default function LeaderboardItem() {
  return (
    <div className="leaderboardItem">
      <p className="rank">1</p>
      <ProfilePic image={Blank} />
      <p className="username">jdh58</p>
      <p className="score">25 pts</p>
    </div>
  );
}
