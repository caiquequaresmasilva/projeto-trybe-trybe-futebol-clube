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

const getScores = (scores:MatchScore[], path:string):IScores => {
  const results: Results = {
    1: 0, 0: 0, '-1': 0, goalsFavor: 0, goalsOwn: 0, totalPoints: 0, goalsBalance: 0,
  };
  scores.forEach((score) => {
    const res = Math.sign((score.homeTeamGoals - score.awayTeamGoals) * factor[path]);
    results[res] += 1;
    results.totalPoints += points[res];
    results.goalsFavor += score[`${path}TeamGoals`];
    results.goalsOwn += score[`${path === 'home' ? 'away' : 'home'}TeamGoals`];
    results.goalsBalance = results.goalsFavor - results.goalsOwn;
  });
  const { 1: totalVictories, 0: totalDraws, '-1': totalLosses, ...res } = results;
  return { totalVictories, totalDraws, totalLosses, ...res };
};

const sumStats = (stats1:IScores, stats2:IScores):IScores => ({
  totalVictories: stats1.totalVictories + stats2.totalVictories,
  totalDraws: stats1.totalDraws + stats2.totalDraws,
  totalLosses: stats1.totalLosses + stats2.totalLosses,
  totalPoints: stats1.totalPoints + stats2.totalPoints,
  goalsFavor: stats1.goalsFavor + stats2.goalsFavor,
  goalsOwn: stats1.goalsOwn + stats2.goalsOwn,
  goalsBalance: stats1.goalsBalance + stats2.goalsBalance,
});

const getStatistics = (match:IClubMatches, path:string): IStatistics => {
  let stats:IScores;
  let totalGames:number;
  const { homeMatches, awayMatches } = match;
  if (!path) {
    const stats1 = getScores(homeMatches as MatchScore[], 'home');
    const stats2 = getScores(awayMatches as MatchScore[], 'away');
    stats = sumStats(stats1, stats2);
    totalGames = (<MatchScore[]>homeMatches).length + (<MatchScore[]>awayMatches).length;
  } else if (path === 'home') {
    stats = getScores(homeMatches as MatchScore[], path);
    totalGames = (<MatchScore[]>homeMatches).length;
  } else {
    stats = getScores(awayMatches as MatchScore[], path);
    totalGames = (<MatchScore[]>awayMatches).length;
  }
  const efficiency = Number(((stats.totalPoints / (totalGames * 3)) * 100).toFixed(2));
  return { name: match.clubName, totalGames, efficiency, ...stats };
};

const generateLeaderboard = (matchs: IClubMatches[], path:string) => {
  const statistics = matchs.map((match) => getStatistics(match, path));
  statistics.sort(sortFunction);
  return statistics;
};

export default generateLeaderboard;
