import '../styles/Button.css';

export default function Button({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  return (
    <button className="button">
      <p className="label">{label}</p>
      {icon ? (
        <div className="buttonIconContainer">
          <img src={icon} alt={`${label} icon`} className="buttonIcon" />
        </div>
      ) : null}
    </button>
  );
}
