import '../styles/TileButton.css';
import Curry from '../assets/curry.jpg';

export default function TileButton({
  label,
  bgImage = null,
  bgColor = null,
}: {
  label: string;
  bgImage: string | null;
  bgColor: string | null;
}) {
  return (
    <div
      className="tileButtonContainer"
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : {}
      }
    >
      <div
        className="tileButton"
        style={
          bgImage
            ? {
                backgroundImage: `linear-gradient(0deg, rgba(${bgColor}, .75), rgba(${bgColor}, .2))`,
              }
            : {}
        }
      >
        <p className="label">{label}</p>
      </div>
    </div>
  );
}
