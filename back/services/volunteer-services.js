/* eslint-disable object-shorthand */
/* eslint-disable import/order */
// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize } = require('sequelize');
const volunteerModel = require('../models/volunteer-model');
const models = require('../models/index');

const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
const bcrypt = require('bcrypt');

const Volunteer = volunteerModel(sequelize, DataTypes);

async function getAll() {
  const listVolunteer = await Volunteer.findAll();
  return listVolunteer;
}

async function getById(id) {
  const user = await Volunteer.findByPk(id);

  if (user == null) {
    throw new Error('Usuario no encontrado');
  }

  return user;
}

async function createUser(name, lastname, dni, email, password, address, phone) {
  const user = new Volunteer();

  user.name = name;
  user.lastname = lastname;
  user.dni = dni;
  user.email = email;
  user.password = await bcrypt.hash(password, 10);
  user.address = address;
  user.phone = phone;

  const userCreated = await user.save();
  delete userCreated.dataValues.password;

  return userCreated;
}

async function editUser(id, name, lastname, dni, email, address, phone, points) {
  const user = await getById(id);

  if (name) {
    user.name = name;
  }

  if (lastname) {
    user.lastname = lastname;
  }

  if (email) {
    user.email = email;
  }

  if (dni) {
    user.dni = dni;
  }

  if (address) {
    user.address = address;
  }

  if (points) {
    user.points = points;
  }

  if (phone) {
    user.phone = phone;
  }

  const userEdited = await user.save();

  delete userEdited.dataValues.password;

  return userEdited;
}

async function modifyPassword(id, currentPassword, newPassword) {
  try {
    const user = await getById(id);

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      throw new Error('La contraseña actual es incorrecta');
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;

      const userEdited = await user.save();
      delete userEdited.dataValues.password;
      return userEdited;
    }
  } catch (error) {
    throw new Error('Error al modificar la contraseña');
  }
}

async function deleteUser(id) {
  const user = await getById(id);

  await user.destroy();
}

async function login(email, password) {
  const user = await Volunteer.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error('Email o contraseña incorrectos');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Email o contraseña incorrectos');
  }
  const token = jwt.sign({ id: user.id, tipoUsuario: 'voluntario' }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
}

async function asignarTareaVoluntario(idTarea = 1, idVoluntario = 4) {
  try {
    // Se busca el voluntario por id
    // eslint-disable-next-line max-len
    const voluntario = await models.volunteer.findByPk(idVoluntario); // <-- Esta es la forma de importar los modelos para que funcione

    // Se valida si hay voluntario
    if (!voluntario) throw new Error('No existe un voluntario con el id especificado');

    // Se busca la tarea por id
    const tarea = await models.tarea.findByPk(idTarea);

    // Se valida si hay voluntario
    if (!tarea) throw new Error('No existe una tarea con el id especificado');

    // Al voluntario se le agrega la tarea, y se le pasa un objeto extra,
    // para asignar ese valor a la propiedad asistio de la tabla intermedia
    await voluntario.addTarea(tarea, { through: { asistio: false } });
    await voluntario.save();

    // Se busca al usuario por su id, y se incluyen las tareas que tiene asignadas
    const voluntarioConTareas = await models.volunteer.findOne({
      where: {
        id: idVoluntario,
      },
      include: [
        {
          model: models.tarea,
        },
      ],
    });
    return voluntarioConTareas;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAll, getById, createUser, editUser, deleteUser, login, modifyPassword, asignarTareaVoluntario,
};
