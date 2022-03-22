import {
  Points,
  Factor,
  Results,
  IStatistics,
  IScores,
  IClubMatches,
  MatchScore } from '../interfaces';

export default class LbTools {
  private static points: Points = { 1: 3, 0: 1, '-1': 0 };

  private static factor: Factor = { home: 1, away: -1 };

  static sortFunction(stat1:IStatistics, stat2:IStatistics) {
    if (stat2.totalPoints !== stat1.totalPoints) {
      return Math.sign(stat2.totalPoints - stat1.totalPoints);
    }
    if (stat2.totalVictories !== stat1.totalVictories) {
      return Math.sign(stat2.totalVictories - stat1.totalVictories);
    }
    if (stat2.goalsBalance !== stat1.goalsBalance) {
      return Math.sign(stat2.goalsBalance - stat1.goalsBalance);
    }
    if (stat2.goalsFavor !== stat1.goalsFavor) {
      return Math.sign(stat2.goalsFavor - stat1.goalsFavor);
    }
    if (stat1.goalsOwn !== stat2.goalsOwn) {
      return Math.sign(stat1.goalsOwn - stat2.goalsOwn);
    }
    return 0;
  }

  static resultsDict = (): Results => ({
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

  static calculateEfficiency = (p:number, g:number) => Number(((p / (g * 3)) * 100).toFixed(2));

  static getScores(scores:MatchScore[], path:string):IScores {
    const results = this.resultsDict();
    scores.forEach((score) => {
      const res = Math.sign((score.homeTeamGoals - score.awayTeamGoals) * this.factor[path]);
      results[res] += 1;
      results.totalPoints += this.points[res];
      results.goalsFavor += score[`${path}TeamGoals`];
      results.goalsOwn += score[`${path === 'home' ? 'away' : 'home'}TeamGoals`];
      results.goalsBalance = results.goalsFavor - results.goalsOwn;
      results.totalGames += 1;
      results.efficiency = this.calculateEfficiency(results.totalPoints, results.totalGames);
    });
    const { 1: totalVictories, 0: totalDraws, '-1': totalLosses, ...res } = results;
    return { totalVictories, totalDraws, totalLosses, ...res };
  }

  static mergeStats([homeStats, awayStats]: IScores[]): IScores[] {
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
      efficiency: this.calculateEfficiency(hp + ap, hg + ag),
    }];
  }

  static getStatistics(match:IClubMatches, path:string): IStatistics {
    let stats:IScores[] = [];
    const { homeMatches, awayMatches } = match;
    if (homeMatches) stats.push(this.getScores(homeMatches, 'home'));
    if (awayMatches) stats.push(this.getScores(awayMatches, 'away'));
    if (!path) stats = this.mergeStats(stats);

    return { name: match.clubName, ...stats[0] };
  }

  static generateLeaderboard(matchs: IClubMatches[], path:string) {
    const statistics = matchs.map((match) => this.getStatistics(match, path));
    statistics.sort(this.sortFunction);
    return statistics;
  }
}
