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
  totalGames: number
  efficiency: number
}

type Factor = {
  [index:string]:number
  home:number
  away:number
};

interface IScores{
  totalPoints: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  totalGames:number
  efficiency: number

}

interface IStatistics extends IScores {
  name: string
  efficiency: number
  totalGames: number
}

export { Points, Results, Factor, IStatistics, IScores };
