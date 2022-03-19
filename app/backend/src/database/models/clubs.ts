import { Model, DataTypes } from 'sequelize';
import db from '.';
import { MatchScore } from '../../interfaces/Club';
// import OtherModel from './OtherModel';

class Club extends Model {
  public id: number;

  public clubName: string;

  public homeMatches: MatchScore[];

  public awayMatches: MatchScore[];
}

Club.init({
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Club;
