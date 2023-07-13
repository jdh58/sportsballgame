import '../styles/Button.css';

export default function Button({
  label,
  type,
  icon,
  classes,
}: {
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  icon: string;
  classes: string;
}) {
  return (
    <button type={type} className={`button ${classes}`}>
      <p className="label">{label}</p>
      {icon ? (
        <div className="buttonIconContainer">
          <img src={icon} alt={`${label} icon`} className="buttonIcon" />
        </div>
      ) : null}
    </button>
  );
}
