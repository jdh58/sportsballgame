import '../styles/Button.css';

export default function Button({
  label,
  icon,
  size,
  classes,
}: {
  label: string;
  icon: string;
  size: string;
  classes: string;
}) {
  const classList = `button ${size} ${classes}`;

  return (
    <button className={classList}>
      <p className="label">{label}</p>
      {icon ? (
        <div className="buttonIconContainer">
          <img src={icon} alt={`${label} icon`} className="buttonIcon" />
        </div>
      ) : null}
    </button>
  );
}
