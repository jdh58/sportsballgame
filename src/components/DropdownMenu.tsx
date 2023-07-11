import ProfilePic from './ProfilePic';
import ToggleSwitch from './ToggleSwitch';
import DropdownItem from './DropdownItem';

import Blank from '../assets/white.png';
import User from '../assets/user-filled.svg';
import Leaderboard from '../assets/leaderboard.svg';
import Help from '../assets/help.svg';
import Settings from '../assets/settings.svg';
import Logout from '../assets/logout.svg';

import '../styles/Dropdown.css';

export default function Dropdown() {
  return (
    <div className="dropdown">
      <div className="profile">
        <ProfilePic image={Blank} />
        <p className="username">jdh58</p>
      </div>
      <DropdownItem icon={User} label="My Profile" classes="" />
      <DropdownItem icon={Leaderboard} label="Leaderboards" classes="" />
      <DropdownItem icon={Help} label="Help & Support" classes="" />
      <DropdownItem icon={Settings} label="Settings" classes="" />
      <DropdownItem icon={Logout} label="Log Out" classes="red" />
      <div className="lightMode">
        <p>Light</p>
        <ToggleSwitch />
        <p>Dark</p>
      </div>
    </div>
  );
}
