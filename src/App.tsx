/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaDice } from "react-icons/fa6";
import "./App.css";

function App() {
  const data = [
    ["Uğur", "4", "0", "4", "0", "0", "0", "X", "X", "X"],
    ["Cemil", "1", "2", "0", "3", "0", "2", "0", "1", "2"],
    ["Güven", "1", "4", "1", "4", "1", "5", "3", "1", "2"],
    ["Kamil", "1", "1", "X", "1", "4", "X", "0", "4", "1"],
    ["Serkan", "X", "0", "2", "0", "2", "0", "4", "0", "1"],
  ];

  // Günlük toplam oyun sayısını hesapla (dikey)
  const calculateDailyTotalGames = () => {
    const dailyTotals = [];

    // Her gün için (sütun bazında)
    for (let day = 1; day < data[0].length; day++) {
      let dayTotal = 0;

      // Her oyuncu için o günkü skoru kontrol et
      for (let player = 0; player < data.length; player++) {
        const score = data[player][day];
        if (score !== "X" && score !== "0") {
          dayTotal += parseInt(score);
        }
      }

      dailyTotals.push(dayTotal);
    }

    return dailyTotals;
  };

  const dailyTotalGames = calculateDailyTotalGames();

  const calculateStats = (playerData: any) => {
    const name = playerData[0];
    const games = playerData.slice(1);

    const playedDays = games.filter((score: any) => score !== "X").length;

    // Toplam kayıp ve toplam oyun sayısını hesapla
    let totalLosses = 0;
    let totalGames = 0;

    games.forEach((score: any, dayIndex: number) => {
      if (score !== "X") {
        // Oyuncu geldiyse, o günkü toplam oyun sayısını ekle
        totalGames += dailyTotalGames[dayIndex];

        if (score !== "0") {
          totalLosses += parseInt(score);
        }
      }
    });

    const totalWins = totalGames - totalLosses;

    // Kayıp yüzdesi
    const lossPercentage =
      totalGames > 0 ? ((totalLosses / totalGames) * 100).toFixed(1) : "0.0";

    return {
      name,
      playedDays,
      totalGames,
      wins: totalWins,
      losses: totalLosses,
      lossPercentage,
    };
  };

  const stats = data.map(calculateStats);

  const sortedStats = [...stats].sort(
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
            <th>Games</th>
            <th>Loss</th>
            <th>Loss%</th>
            <th>D1</th>
            <th>D2</th>
            <th>D3</th>
            <th>D4</th>
            <th>D5</th>
            <th>D6</th>
            <th>D7</th>
            <th>D8</th>
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
                <td>{stat.totalGames}</td>
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
