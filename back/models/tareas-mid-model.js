const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tareasMid extends Model {}

  tareasMid.init(
    {
      idTarea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idVolunteer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      asistencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'tareas-mid',
      tableName: 'tareasMid',
      timestamps: false,
    },
  );

  return tareasMid;
};
