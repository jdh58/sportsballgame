import Blank from '../assets/white.png';

import '../styles/ProfilePic.css';

export default function ProfilePic({ image }: { image: string }) {
  return (
    <div className="profilePicContainer">
      <img src={Blank} alt="profile picture" className="profilePic" />
    </div>
  );
}
