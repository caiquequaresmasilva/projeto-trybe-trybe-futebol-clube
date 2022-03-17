import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';
import Club from './clubs';

type ClubName = { clubName: string };

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;

  public homeClub: ClubName;

  public awayClub: ClubName;
}

Match.init({
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
  tableName: 'matchs',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayClub' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

Club.hasMany(Match, { foreignKey: 'home_team', as: 'homeMatches' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'awayMatches' });

export default Match;
