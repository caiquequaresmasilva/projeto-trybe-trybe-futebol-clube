import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';
import Club from './clubs';

class Match extends Model {}

Match.init({
  home_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeTeam' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayTeam' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

Club.hasMany(Match, { foreignKey: 'home_team', as: 'homeMatchs' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'awayMatchs' });

export default Match;
