import LeaderboardItem from './LeaderboardItem';
import Selector from './Selector';

import '../styles/LeaderboardPage.css';

export default function LeaderboardPage() {
  return (
    <main className="page leaderboardPage">
      <div className="mainContainer">
        <section className="selectors">
          <div>
            <h2>Sport</h2>
            <Selector name="sport" options={['NBA', 'MLB', 'NFL']} />
          </div>
          <div>
            <h2>Game</h2>
            <Selector
              name="game"
              options={[
                'Who Am I?',
                'Higher or Lower',
                'Grid',
                'Face Mix',
                'Call the Call',
                'Shot Chart Secret',
                'Lineup Decoder',
              ]}
            />
          </div>
          <div>
            <h2>Mode</h2>
            <Selector
              name="mode"
              options={[
                'Freeplay',
                '3 Rounds',
                '5 Rounds',
                '10 Rounds',
                '25 Rounds',
                '3 Minutes',
                '5 Minutes',
                '10 Minutes',
                '25 Minutes',
              ]}
            />
          </div>
        </section>
        <div className="leaderboardContainer">
          <h1 className="title">Leaderboard</h1>
          <div className="leaderboard">
            <div className="normalScores">
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
              <LeaderboardItem />
            </div>
            <div className="specialScores">
              <LeaderboardItem />
              <LeaderboardItem />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
