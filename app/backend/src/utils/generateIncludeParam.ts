import Match from '../database/models/matchs';

const generateFindParams = (path: string) => (
  {
    model: Match,
    as: `${path}Matches`,
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
    where: { inProgress: false },
  }
);

const generateIncludeParam = (path:string) => {
  if (!path) {
    return [generateFindParams('away'), generateFindParams('home')];
  }
  return [generateFindParams(path)];
};

export default generateIncludeParam;
