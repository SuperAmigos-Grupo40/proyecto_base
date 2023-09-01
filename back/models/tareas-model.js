const { Model } = require('sequelize');

// const volunteer = require('./volunteer-model');
// const coordinator = require('./coordinator-model');
// const category = require('./category-model');

module.exports = (sequelize, DataTypes) => {
  class tarea extends Model {
    static associate() {
      // Tarea.belongsToMany(volunteer, { through: 'tareas-mid' });
      // volunteer.belongsToMany(Tarea, { through: 'tareas-mid' });
      // Tarea.belongsTo(coordinator, { foreignKey: 'idCoordinator' });
      // Tarea.belongsTo(category, { foreignKey: 'idCategory' });
    }
  }
  tarea.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCoordinator: {
        type: DataTypes.INTEGER,
      },
      point: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantParticipantes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    }, {
      sequelize,
      modelName: 'tarea',
      tableName: 'tareas',
      timestamps: false,
      underscored: false,
      createdAt: false,
      updatedAt: false,
    },
  );

  return tarea;
};
