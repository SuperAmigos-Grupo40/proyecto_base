// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../models');

const tareasModel = require('../models/tareas-model');

const Tarea = tareasModel(sequelize, DataTypes);

async function getAll() {
  const listTareas = await Tarea.findAll();
  return listTareas;
}

async function getById(id) {
  const tarea = await Tarea.findByPk(id);

  if (tarea == null) {
    throw new Error('Tarea no encontrada');
  }

  return tarea;
}

// eslint-disable-next-line max-len
async function createTarea(name, description, idCoordinator, points, date, place, idCategory, cantParticipantes) {
  const tarea = new Tarea();
  tarea.name = name;
  tarea.description = description;
  tarea.idCoordinator = idCoordinator;
  tarea.points = points;
  tarea.date = date;
  tarea.place = place;
  tarea.idCategory = idCategory;
  tarea.cantParticipantes = cantParticipantes;

  const tareaCreated = await tarea.save();
  return tareaCreated;
}

// eslint-disable-next-line max-len
async function editTarea(id, name, description, idCoordinator, points, date, place, idCategory, cantParticipantes) {
  const tarea = await getById(id);

  if (name) {
    tarea.name = name;
  }

  if (description) {
    tarea.description = description;
  }

  if (idCoordinator) {
    tarea.idCoordinator = idCoordinator;
  }

  if (points) {
    tarea.points = points;
  }

  if (date) {
    tarea.date = date;
  }

  if (place) {
    tarea.place = place;
  }

  if (idCategory) {
    tarea.idCategory = idCategory;
  }

  if (cantParticipantes) {
    tarea.cantParticipantes = cantParticipantes;
  }

  const tareaEdited = await tarea.save();
  return tareaEdited;
}

async function deleteTarea(id) {
  const tarea = await getById(id);

  await tarea.destroy();
}

module.exports = {
  getAll, getById, createTarea, editTarea, deleteTarea,
};
