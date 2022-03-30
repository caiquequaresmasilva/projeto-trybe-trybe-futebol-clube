import { Model, DataTypes } from 'sequelize';
import db from '.';
import { MatchScore } from '../../interfaces/Club';

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

export default Club;
