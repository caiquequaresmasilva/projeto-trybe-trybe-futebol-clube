import {
  Points,
  Factor,
  Results,
  IStatistics,
  IScores,
  IClubMatches,
  MatchScore } from '../interfaces';

const points: Points = { 1: 3, 0: 1, '-1': 0 };
const factor:Factor = { home: 1, away: -1 };

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

const resultsDict = (): Results => ({
  1: 0,
  0: 0,
  '-1': 0,
  goalsFavor: 0,
  goalsOwn: 0,
  totalPoints: 0,
  goalsBalance: 0,
  totalGames: 0,
  efficiency: 0,
});

const calculateEfficiency = (p:number, g:number) => Number(((p / (g * 3)) * 100).toFixed(2));

const getScores = (scores:MatchScore[], path:string):IScores => {
  const results = resultsDict();
  scores.forEach((score) => {
    const res = Math.sign((score.homeTeamGoals - score.awayTeamGoals) * factor[path]);
    results[res] += 1;
    results.totalPoints += points[res];
    results.goalsFavor += score[`${path}TeamGoals`];
    results.goalsOwn += score[`${path === 'home' ? 'away' : 'home'}TeamGoals`];
    results.goalsBalance = results.goalsFavor - results.goalsOwn;
    results.totalGames += 1;
    results.efficiency = calculateEfficiency(results.totalPoints, results.totalGames);
  });
  const { 1: totalVictories, 0: totalDraws, '-1': totalLosses, ...res } = results;
  return { totalVictories, totalDraws, totalLosses, ...res };
};

const mergeStats = ([homeStats, awayStats]: IScores[]): IScores[] => {
  const { totalPoints: hp, totalGames: hg } = homeStats;
  const { totalPoints: ap, totalGames: ag } = awayStats;
  return [{
    totalVictories: homeStats.totalVictories + awayStats.totalVictories,
    totalDraws: homeStats.totalDraws + awayStats.totalDraws,
    totalLosses: homeStats.totalLosses + awayStats.totalLosses,
    totalPoints: homeStats.totalPoints + awayStats.totalPoints,
    goalsFavor: homeStats.goalsFavor + awayStats.goalsFavor,
    goalsOwn: homeStats.goalsOwn + awayStats.goalsOwn,
    goalsBalance: homeStats.goalsBalance + awayStats.goalsBalance,
    totalGames: homeStats.totalGames + awayStats.totalGames,
    efficiency: calculateEfficiency(hp + ap, hg + ag),
  }];
};

const getStatistics = (match:IClubMatches, path:string): IStatistics => {
  let stats:IScores[] = [];
  const { homeMatches, awayMatches } = match;
  if (homeMatches) stats.push(getScores(homeMatches, 'home'));
  if (awayMatches) stats.push(getScores(awayMatches, 'away'));
  if (!path) stats = mergeStats(stats);

  return { name: match.clubName, ...stats[0] };
};

const generateLeaderboard = (matchs: IClubMatches[], path:string) => {
  const statistics = matchs.map((match) => getStatistics(match, path));
  statistics.sort(sortFunction);
  return statistics;
};

export default generateLeaderboard;
