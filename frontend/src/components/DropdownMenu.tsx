import ProfilePic from './ProfilePic';
import DropdownItem from './DropdownMenuItem';

import Blank from '../assets/white.png';
import User from '../assets/user-filled.svg';
import Leaderboard from '../assets/leaderboard.svg';
import Help from '../assets/help.svg';
import Logout from '../assets/logout.svg';

import '../styles/DropdownMenu.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function DropdownMenu({ killMenu }: { killMenu: Function }) {
  const Auth = useContext(AuthContext);

  return (
    <div className="dropdown">
      <div className="profile">
        {Auth.user ? (
          <ProfilePic image={Auth.user?.profilePicURL} />
        ) : (
          <ProfilePic image={Blank} />
        )}
        <p className="username">{Auth.user?.username}</p>
      </div>
      <DropdownItem
        icon={User}
        label="My Profile"
        redirect={`/profile/${Auth.user?.username}`}
        classes=""
        killMenu={killMenu}
      />
      <DropdownItem
        icon={Leaderboard}
        label="Leaderboard"
        redirect="/leaderboard"
        classes=""
        killMenu={killMenu}
      />
      <DropdownItem
        icon={Help}
        label="Contact & Support"
        redirect="/contact"
        classes=""
        killMenu={killMenu}
      />

      <DropdownItem
        icon={Logout}
        label="Log Out"
        redirect="/logout"
        classes="red"
        killMenu={killMenu}
      />
    </div>
  );
}
