import { useNavigate } from 'react-router-dom';
import '../styles/TileButton.css';

export default function TileButton({
  label,
  bgImage = null,
  bgColor = null,
  redirect,
}: {
  label: string;
  bgImage: string | null;
  bgColor: string | null;
  redirect: string;
}) {
  const navigate = useNavigate();

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
      onClick={() => {
        navigate(redirect);
      }}
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
