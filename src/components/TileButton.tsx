import '../styles/TileButton.css';

export default function TileButton({
  label,
  bgImage = null,
}: {
  label: string;
  bgImage: string | null;
}) {
  return (
    <div className="tileButton">
      <p className="label">{label}</p>
    </div>
  );
}
