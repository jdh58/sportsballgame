import '../styles/DropdownItem.css';

export default function DropdownMenuItem({
  icon,
  label,
  classes,
}: {
  icon: string;
  label: string;
  classes: string;
}) {
  return (
    <div className={`dropdownItem ${classes}`}>
      <div className="iconContainer">
        <img src={icon} alt="" />
      </div>
      <p className="label">{label}</p>
    </div>
  );
}
