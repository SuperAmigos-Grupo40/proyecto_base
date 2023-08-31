const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TareasMid extends Model {}

  TareasMid.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      asistencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TareasMid',
      timestamps: false,
    },
  );

  return TareasMid;
};
