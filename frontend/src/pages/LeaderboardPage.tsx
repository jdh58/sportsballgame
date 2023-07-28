import { useContext, useEffect, useState } from 'react';
import LeaderboardItem from '../components/LeaderboardItem';
import DownArrow from '../assets/down.svg';

import '../styles/LeaderboardPage.css';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

// @ts-ignore
import { v4 as uuid } from 'uuid';

export default function LeaderboardPage() {
  const [sport, setSport] = useState('NBA');
  const [game, setGame] = useState('Who Am I?');
  const [mode, setMode] = useState('3 Rounds');
  const [difficulty, setDifficulty] = useState('Easy');
  const [dropdown, setDropdown] = useState('none');

  const [loading, setLoading] = useState(true);

  const [userTopScore, setUserTopScore] = useState<React.ReactElement | null>(
    null
  );
  const [urlTopScore, setURLTopScore] = useState<React.ReactElement | null>(
    null
  );

  const urlUsername = useParams().username;
  const Auth = useContext(AuthContext);

  const [leaderboardItems, setLeaderbordItems] = useState<
    Array<React.ReactElement>
  >([]);

  useEffect(() => {
    setLoading(true);

    const grabLeaderboardItems = async function () {
      const response = await fetch(
        'https://sportsballgame.onrender.com/api/score/top50',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sport, game, mode, difficulty }),
        }
      );

      const json = await response.json();

      const scores = json.results;

      const leaderboardItemArray = await Promise.all(
        scores.map(
          async (score: { userID: string; score: number }, index: number) => {
            const scoreUserResponse = await fetch(
              `https://sportsballgame.onrender.com/api/user/id/${score.userID}`
            );

            const scoreUserJson = await scoreUserResponse.json();

            const scoreUser = scoreUserJson.user;

            return (
              <LeaderboardItem
                rank={index + 1}
                username={scoreUser.username}
                picture={scoreUser.profilePicURL}
                score={score.score}
                key={uuid()}
              />
            );
          }
        )
      );

      setLeaderbordItems(leaderboardItemArray);
    };

    const grabUserTopScore = async function () {
      // If the user is logged in, grab their top score for the selected category
      if (!Auth.user) {
        return;
      }
      const userTopScoreResponse = await fetch(
        `https://sportsballgame.onrender.com/api/score/user/${Auth.user._id}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sport, game, mode, difficulty }),
        }
      );
      const userTopScoreJSON = await userTopScoreResponse.json();

      // If the user doesn't have a score for this mode,
      // set the user top score to a placeholder and return
      if (userTopScoreJSON.error) {
        setUserTopScore(
          <LeaderboardItem
            rank={0}
            username={Auth.user.username}
            picture={Auth.user.profilePicURL}
            score="None"
          />
        );
        return;
      }

      // Otherwise, save the score and get the score's rank
      const userTopScoreNUM = userTopScoreJSON.userTopScore;

      const userScoreRankResponse = await fetch(
        `https://sportsballgame.onrender.com/api/score/amountAbove/${userTopScoreNUM}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sport, game, mode, difficulty }),
        }
      );
      const userScoreRankJSON = await userScoreRankResponse.json();

      setUserTopScore(
        <LeaderboardItem
          rank={userScoreRankJSON.amountAbove + 1}
          username={Auth.user.username}
          picture={Auth.user.profilePicURL}
          score={userTopScoreNUM}
        />
      );
    };

    const grabURLUserTopScore = async function () {
      if (!urlUsername) {
        return;
      }

      // First, grab the url user for the profile pic
      const urlUserResponse = await fetch(
        `https://sportsballgame.onrender.com/api/user/${urlUsername}`
      );
      const urlUserJSON = await urlUserResponse.json();
      const urlUser = urlUserJSON.user;

      // If the user doesn't exist, set top score to null and return
      if (urlUserJSON.error) {
        setURLTopScore(null);
        return;
      }

      const urlTopScoreResponse = await fetch(
        `https://sportsballgame.onrender.com/api/score/user/${urlUser._id}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sport, game, mode, difficulty }),
        }
      );
      const urlTopScoreJSON = await urlTopScoreResponse.json();

      // If the user doesn't have a score for this mode,
      // set the user top score to a filler and return
      if (urlTopScoreJSON.error) {
        setURLTopScore(
          <LeaderboardItem
            rank={0}
            username={urlUsername}
            picture={urlUser.profilePicURL}
            score="None"
          />
        );
        return;
      }

      // Otherwise, save the score and get the score's rank
      const urlTopScoreNUM = urlTopScoreJSON.userTopScore;

      const urlScoreRankResponse = await fetch(
        `https://sportsballgame.onrender.com/api/score/amountAbove/${urlTopScoreNUM}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sport, game, mode, difficulty }),
        }
      );
      const urlScoreRankJSON = await urlScoreRankResponse.json();

      setURLTopScore(
        <LeaderboardItem
          rank={urlScoreRankJSON.amountAbove + 1}
          username={urlUsername}
          picture={urlUser.profilePicURL}
          score={urlTopScoreNUM}
        />
      );
    };

    // Run all in parallel to speed up the process since they're independent
    (async () => {
      await Promise.all([
        grabLeaderboardItems(),
        grabUserTopScore(),
        grabURLUserTopScore(),
      ]);
      setLoading(false);
    })();
  }, [Auth, urlUsername, sport, game, mode, difficulty]);

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
              <div className="normalScores">
                {loading ? <LoadingSpinner /> : leaderboardItems}
              </div>
              <div className="specialScores">
                {userTopScore && userTopScore}
                {urlTopScore && urlTopScore}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
