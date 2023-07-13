import '../styles/Button.css';

export default function Button({
  label,
  icon,
  classes,
}: {
  label: string;
  icon: string;
  classes: string;
}) {
  return (
    <button className={`button ${classes}`}>
      <p className="label">{label}</p>
      {icon ? (
        <div className="buttonIconContainer">
          <img src={icon} alt={`${label} icon`} className="buttonIcon" />
        </div>
      ) : null}
    </button>
  );
}
