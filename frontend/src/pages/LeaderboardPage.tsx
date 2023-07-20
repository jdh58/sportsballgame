import { useState } from 'react';
import LeaderboardItem from '../components/LeaderboardItem';
import Selector from '../components/Selector';

import '../styles/LeaderboardPage.css';

export default function LeaderboardPage() {
  const [sport, setSport] = useState('NBA');
  const [game, setGame] = useState('whoami');
  const [mode, setMode] = useState('whoami');
  const [difficulty, setDifficulty] = useState('whoami');

  const [dropdown, setDropdown] = useState('none');

  return (
    <>
      {dropdown !== 'none' && (
        <div
          className="overlay"
          onClick={() => {
            setDropdown('none');
          }}
        ></div>
      )}
      <main className="page leaderboardPage">
        <div className="mainContainer">
          <section className="selectors">
            <div>
              <h2>Sport</h2>
              <div className="selectorContainer">
                <div
                  className="selector"
                  onClick={() => {
                    setDropdown('sports');
                  }}
                >
                  {sport}
                </div>
                <div
                  className={
                    dropdown === 'sports'
                      ? 'leaderboardDropdown visible'
                      : 'leaderboardDropdown'
                  }
                >
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setSport('NBA');
                      setDropdown('none');
                    }}
                  >
                    NBA
                  </span>
                  <span
                    className={'dropdownElement'}
                    onClick={() => {
                      setSport('NFL');
                      setDropdown('none');
                    }}
                  >
                    NFL
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setSport('MLB');
                      setDropdown('none');
                    }}
                  >
                    MLB
                  </span>
                </div>
              </div>
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
                onClick={setGame}
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
                onClick={setMode}
              />
            </div>
            <div>
              <h2>Difficulty</h2>
              <Selector
                name="difficulty"
                options={['Easy', 'Meduim', 'Hard']}
                onClick={setDifficulty}
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
    </>
  );
}
