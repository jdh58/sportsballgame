export default function DifficultyContainer() {
  return (
    <div className="difficultyContainer">
      <button className="optionButton">
        <p className="label">35+ Mins/G</p>
        <p className="easy">Easy</p>
      </button>
      <button className="optionButton">
        <p className="label">15+ Mins/G</p>
        <p className="medium">Medium</p>
      </button>
      <button className="optionButton ">
        <p className="label">All Players</p>
        <p className="hard">Hard</p>
      </button>
    </div>
  );
}
