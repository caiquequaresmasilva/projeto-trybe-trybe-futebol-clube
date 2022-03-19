interface IClub{
  id: number
  clubName: string
}

type MatchScore = {
  homeTeamGoals: number
  awayTeamGoals: number
};

interface IClubMatches extends IClub{
  homeMatches: MatchScore[]
  awayMatches: MatchScore[]
}

interface IClubHomeMatches extends IClub{
  homeMatches: MatchScore[]
}

interface IClubAwayMatches extends IClub{
  awayMatches: MatchScore[]
}

interface IStatistics {
  name: string
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: number
}

export default IClub;
export { IClubMatches, IStatistics, MatchScore, IClubAwayMatches, IClubHomeMatches };
