import ProfilePic from './ProfilePic';

import Blank from '../assets/white.png';

import '../styles/LeaderboardItem.css';

export default function LeaderboardItem({
  rank,
  username,
  picture,
  score,
}: {
  rank: number;
  username: string;
  picture: string;
  score: number;
}) {
  return (
    <div className="leaderboardItem">
      <p className="rank">{rank}</p>
      <ProfilePic image={picture} />
      <p className="username">{username}</p>
      <p className="score">{score} pts</p>
    </div>
  );
}
