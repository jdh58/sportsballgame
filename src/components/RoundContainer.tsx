export default function RoundContainer() {
  return (
    <div className="roundContainer">
      <button className="optionButton">
        <p className="label">Freeplay</p>
      </button>
      <button className="optionButton">
        <p className="label">3</p>
        <p className="easy">Rounds</p>
      </button>
      <button className="optionButton">
        <p className="label">5</p>
        <p className="easy">Rounds</p>
      </button>
      <button className="optionButton">
        <p className="label">10</p>
        <p className="easy">Rounds</p>
      </button>
      <button className="optionButton">
        <p className="label">25</p>
        <p className="easy">Rounds</p>
      </button>
    </div>
  );
}
