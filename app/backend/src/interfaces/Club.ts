interface IClub{
  id: number
  clubName: string
}

type MatchScore = {
  [index:string]: number
  homeTeamGoals: number
  awayTeamGoals: number
};

interface IClubMatches extends IClub{
  homeMatches?: MatchScore[]
  awayMatches?: MatchScore[]
}

export { IClub, IClubMatches, MatchScore };
