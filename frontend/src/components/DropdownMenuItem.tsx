import { useNavigate } from 'react-router-dom';
import '../styles/DropdownMenuItem.css';

export default function DropdownMenuItem({
  icon,
  label,
  redirect,
  classes,
  killMenu,
}: {
  icon: string;
  label: string;
  redirect: string;
  classes: string;
  killMenu: Function;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`dropdownItem ${classes}`}
      onClick={() => {
        killMenu();
        navigate(redirect);
      }}
    >
      <div className="iconContainer">
        <img src={icon} alt="" />
      </div>
      <p className="label">{label}</p>
    </div>
  );
}
