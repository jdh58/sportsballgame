import '../styles/TileButton.css';
import Curry from '../assets/curry.jpg';

export default function TileButton({
  label,
  bgImage = null,
}: {
  label: string;
  bgImage: string | null;
}) {
  return (
    <div
      className="tileButtonContainer"
      style={
        bgImage
          ? {
              backgroundImage: `url(${Curry})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : {}
      }
    >
      <div
        className={bgImage ? 'tileButton booo' : 'tileButton'}
        style={
          bgImage
            ? {
                backgroundImage: `linear-gradient(0deg, rgba(20, 2, 2, .75), rgba(20, 20, 2, .2))`,
              }
            : {}
        }
      >
        <p className="label">{label}</p>
      </div>
    </div>
  );
}
