export default function LeaderboardPage() {
  return (
    <main className="page leaderboardPage">
      <div className="mainContainer">
        <section className="selectors">
          <div>
            <h2>Game</h2>
            <Selector />
          </div>
          <div>
            <h2>Mode</h2>
            <Selector />
          </div>
        </section>
        <div className="leaderboardContainer">
          <h1 className="title">Leaderboard</h1>
          <div className="leaderboard">
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <LeaderboardItem />
            <div className="specialItems">
              <LeaderboardItem />
              <LeaderboardItem />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
