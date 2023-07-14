import Spinner from '../assets/spinner.svg';

import '../styles/LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="spinner">
      <img src={Spinner} alt="" />
    </div>
  );
}
