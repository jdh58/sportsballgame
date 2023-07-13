import '../styles/RoundContainer.css';

export default function RoundContainer() {
  return (
    <div className="roundContainer">
      <button className="optionButton">
        <p className="label">Freeplay</p>
      </button>
      <button className="optionButton">
        <p className="label">
          3
          <br />
          Rounds
        </p>
      </button>
      <button className="optionButton">
        <p className="label">
          5
          <br />
          Rounds
        </p>
      </button>
      <button className="optionButton">
        <p className="label">
          10
          <br />
          Rounds
        </p>
      </button>
      <button className="optionButton">
        <p className="label">
          25
          <br />
          Rounds
        </p>
      </button>
    </div>
  );
}
