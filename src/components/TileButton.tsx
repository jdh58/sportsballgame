export default function TileButton({
  label,
  icon = null,
}: {
  label: string;
  icon: string | null;
}) {
  return (
    <div className="tileButton">
      {icon ? (
        <div className="tileIconContainer">
          <img src={icon} alt="" className="tileIcon" />
        </div>
      ) : null}
      <p className="label">{label}</p>
    </div>
  );
}
