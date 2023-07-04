import '../styles/Button.css';

export default function Button({
  label,
  icon,
  size,
}: {
  label: string;
  icon: string;
  size: string;
}) {
  return (
    <button className={size === 'small' ? 'small button' : 'button'}>
      <p className="label">{label}</p>
      {icon ? (
        <div className="buttonIconContainer">
          <img src={icon} alt={`${label} icon`} className="buttonIcon" />
        </div>
      ) : null}
    </button>
  );
}
