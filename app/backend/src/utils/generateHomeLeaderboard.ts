import { IClubHomeMatches, IStatistics, MatchScore } from '../interfaces/Club';

interface Points {
  [index:string]: number
  1:number
  0:number
  '-1': number
}

interface Results extends Points{
  goalsFavor: number
  goalsOwn: number
  totalPoints: number
  goalsBalance: number
}

const getHomeResults = (scores:MatchScore[]) => {
  const points: Points = { 1: 3, 0: 1, '-1': 0 };
  const results: Results = {
    1: 0, 0: 0, '-1': 0, goalsFavor: 0, goalsOwn: 0, totalPoints: 0, goalsBalance: 0,
  };
  scores.forEach((score) => {
    const { homeTeamGoals, awayTeamGoals } = score;
    const res = Math.sign(homeTeamGoals - awayTeamGoals);
    results[res] += 1;
    results.totalPoints += points[res];
    results.goalsFavor += homeTeamGoals;
    results.goalsOwn += awayTeamGoals;
    results.goalsBalance = results.goalsFavor - results.goalsOwn;
  });
  const { 1: totalVictories, 0: totalDraws, '-1': totalLosses, ...res } = results;
  return { totalVictories, totalDraws, totalLosses, ...res };
};
const getHomeStatistics = (match:IClubHomeMatches): IStatistics => {
  const homeResults = getHomeResults(match.homeMatches);
  const totalGames = match.homeMatches.length;
  const efficiency = Number(((homeResults.totalPoints / (totalGames * 3)) * 100).toFixed(2));

  return {
    name: match.clubName,
    totalGames,
    efficiency,
    ...homeResults,
  };
};

const sortFunction = (stat1:IStatistics, stat2:IStatistics) => {
  if (stat2.totalPoints - stat1.totalPoints !== 0) {
    return Math.sign(stat2.totalPoints - stat1.totalPoints);
  }
  if (stat2.totalVictories - stat1.totalVictories !== 0) {
    return Math.sign(stat2.totalVictories - stat1.totalVictories);
  }
  if (stat2.goalsBalance - stat1.goalsBalance !== 0) {
    return Math.sign(stat2.goalsBalance - stat1.goalsBalance);
  }
  if (stat2.goalsFavor - stat1.goalsFavor !== 0) {
    return Math.sign(stat2.goalsFavor - stat1.goalsFavor);
  }
  if (stat1.goalsOwn - stat2.goalsOwn !== 0) {
    return Math.sign(stat1.goalsOwn - stat2.goalsOwn);
  }
  return 0;
};

const generateHomeLeaderboard = (matchs: IClubHomeMatches[]) => {
  const statistics = matchs.map(getHomeStatistics);
  statistics.sort(sortFunction);
  return statistics;
};

export default generateHomeLeaderboard;
