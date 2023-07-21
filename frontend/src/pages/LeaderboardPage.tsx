import { useEffect, useState } from 'react';
import LeaderboardItem from '../components/LeaderboardItem';
import DownArrow from '../assets/down.svg';
import Selector from '../components/Selector';

import '../styles/LeaderboardPage.css';
import { useParams } from 'react-router-dom';

export default function LeaderboardPage() {
  const [sport, setSport] = useState('NBA');
  const [game, setGame] = useState('Who Am I?');
  const [mode, setMode] = useState('3 Rounds');
  const [difficulty, setDifficulty] = useState('Easy');

  const [dropdown, setDropdown] = useState('none');

  const userID = useParams().userID;

  const [leaderboardItems, setLeaderbordItems] = useState<
    Array<React.ReactElement>
  >([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3100/api/score/top50', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sport, game, mode, difficulty }),
      });

      const json = await response.json();

      const scores = json.results;

      console.log(json);

      const leaderboardItemArray = await Promise.all(
        scores.map(async (score, index) => {
          console.log(score);
          console.log(index);
          const scoreUserResponse = await fetch(
            `http://localhost:3100/api/user/id/${score.userID}`
          );

          const scoreUserJson = await scoreUserResponse.json();

          console.log(scoreUserJson);

          const scoreUser = scoreUserJson.user;

          return (
            <LeaderboardItem
              rank={index + 1}
              username={scoreUser.username}
              picture={scoreUser.profilePicURL}
              score={score.score}
            />
          );
        })
      );

      setLeaderbordItems(leaderboardItemArray);
    })();
  }, [userID, sport, game, mode, difficulty]);

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
                  <div className="label">{sport}</div>
                  <div className="arrowContainer">
                    <img src={DownArrow} alt="" />
                  </div>
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
              <div className="selectorContainer">
                <div
                  className="selector"
                  onClick={() => {
                    setDropdown('games');
                  }}
                >
                  <div className="label">{game}</div>
                  <div className="arrowContainer">
                    <img src={DownArrow} alt="" />
                  </div>
                </div>
                <div
                  className={
                    dropdown === 'games'
                      ? 'leaderboardDropdown visible'
                      : 'leaderboardDropdown'
                  }
                >
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setGame('Who Am I?');
                      setDropdown('none');
                    }}
                  >
                    Who Am I?
                  </span>
                  <span
                    className={'dropdownElement'}
                    onClick={() => {
                      setGame('Higher or Lower');
                      setDropdown('none');
                    }}
                  >
                    Higher or Lower
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setGame('Grid');
                      setDropdown('none');
                    }}
                  >
                    Grid
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setGame('Face Mix');
                      setDropdown('none');
                    }}
                  >
                    Face Mix
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setGame('Call the Call');
                      setDropdown('none');
                    }}
                  >
                    Call the Call
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setGame('Shot Chart Secret');
                      setDropdown('none');
                    }}
                  >
                    Shot Chart Secret
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setGame('Lineup Decoder');
                      setDropdown('none');
                    }}
                  >
                    Lineup Decoder
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h2>Mode</h2>
              <div className="selectorContainer">
                <div
                  className="selector"
                  onClick={() => {
                    setDropdown('modes');
                  }}
                >
                  <div className="label">{mode}</div>
                  <div className="arrowContainer">
                    <img src={DownArrow} alt="" />
                  </div>
                </div>
                <div
                  className={
                    dropdown === 'modes'
                      ? 'leaderboardDropdown visible'
                      : 'leaderboardDropdown'
                  }
                >
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setMode('3 Rounds');
                      setDropdown('none');
                    }}
                  >
                    3 Rounds
                  </span>
                  <span
                    className={'dropdownElement'}
                    onClick={() => {
                      setMode('5 Rounds');
                      setDropdown('none');
                    }}
                  >
                    5 Rounds
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setMode('10 Rounds');
                      setDropdown('none');
                    }}
                  >
                    10 Rounds
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setMode('25 Rounds');
                      setDropdown('none');
                    }}
                  >
                    25 Rounds
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h2>Difficulty</h2>
              <div className="selectorContainer">
                <div
                  className="selector"
                  onClick={() => {
                    setDropdown('difficulties');
                  }}
                >
                  <div className="label">{difficulty}</div>
                  <div className="arrowContainer">
                    <img src={DownArrow} alt="" />
                  </div>
                </div>
                <div
                  className={
                    dropdown === 'difficulties'
                      ? 'leaderboardDropdown visible'
                      : 'leaderboardDropdown'
                  }
                >
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setDifficulty('Easy');
                      setDropdown('none');
                    }}
                  >
                    Easy
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setDifficulty('Medium');
                      setDropdown('none');
                    }}
                  >
                    Medium
                  </span>
                  <span
                    className="dropdownElement"
                    onClick={() => {
                      setDifficulty('Hard');
                      setDropdown('none');
                    }}
                  >
                    Hard
                  </span>
                </div>
              </div>
            </div>
          </section>
          <div className="leaderboardContainer">
            <h1 className="title">Leaderboard</h1>
            <div className="leaderboard">
              <div className="normalScores">{leaderboardItems}</div>
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
