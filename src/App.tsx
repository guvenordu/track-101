/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaDice } from "react-icons/fa6";
import "./App.css";

function App() {
  const data = [
    ["Uğur", "4", "0", "4", "0", "X", "0", "X", "X"],
    ["Cemil", "1", "2", "0", "3", "0", "2", "0", "1"],
    ["Güven", "1", "4", "1", "4", "1", "5", "3", "1"],
    ["Kamil", "1", "1", "X", "1", "4", "X", "0", "4"],
    ["Serkan", "X", "0", "2", "0", "2", "0", "4", "0"],
  ];

  const calculateStats = (playerData: any) => {
    const name = playerData[0];
    const games = playerData.slice(1);

    const playedDays = games.filter((score: any) => score !== "X").length;

    const totalLosses = games.reduce((sum: any, score: any) => {
      if (score === "X" || score === "0") return sum;
      return sum + parseInt(score);
    }, 0);

    const totalGames = playedDays * 4;
    const totalWins = totalGames - totalLosses;

    return {
      name,
      playedDays,
      totalGames,
      wins: totalWins,
      losses: totalLosses,
    };
  };

  const stats = data.map(calculateStats);

  const totalAllLosses = stats.reduce((sum, player) => sum + player.losses, 0);

  const statsWithPercentage = stats.map((player) => ({
    ...player,
    lossPercentage:
      totalAllLosses > 0
        ? ((player.losses / totalAllLosses) * 100).toFixed(1)
        : 0,
  }));

  const sortedStats = [...statsWithPercentage].sort(
    (a, b) => Number(a.lossPercentage) - Number(b.lossPercentage)
  );

  return (
    <div className="table-container">
      <h2>
        101 Track <FaDice size={34} />
      </h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Player</th>
            <th>Day</th>
            <th>Loss</th>
            <th>Total Loss %</th>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
            <th>Day 4</th>
            <th>Day 5</th>
            <th>Day 6</th>
            <th>Day 7</th>
            <th>Day 8</th>
          </tr>
        </thead>
        <tbody>
          {sortedStats.map((stat, index) => {
            const playerOriginalData = data.find((d) => d[0] === stat.name);
            return (
              <tr key={stat.name}>
                <td>{index + 1}</td>
                <td>
                  <strong>{stat.name}</strong>
                </td>
                <td>{stat.playedDays}</td>
                <td className="loss">{stat.losses}</td>
                <td className="percentage">
                  <strong>{stat.lossPercentage}%</strong>
                </td>
                {playerOriginalData &&
                  playerOriginalData.slice(1).map((score, dayIndex) => (
                    <td
                      key={dayIndex}
                      className={
                        score === "X"
                          ? "absent"
                          : score === "0"
                          ? "no-loss"
                          : "played"
                      }
                    >
                      {score}
                    </td>
                  ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
