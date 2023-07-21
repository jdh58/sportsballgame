import ProfilePic from './ProfilePic';

import { Link } from 'react-router-dom';

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
  score: number | string;
}) {
  return (
    <div className="leaderboardItem">
      <p className="rank">{rank}</p>
      <ProfilePic image={picture} />
      <Link to={`/profile/${username}`} className="username">
        {username}
      </Link>
      <p className="score">
        {typeof score === 'number' ? `${score} pts` : `${score}`}
      </p>
    </div>
  );
}
