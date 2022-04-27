const Role = require("../models/role.model");
const Usuario = require("../models/usuario.model");
const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no se encunetra en la db`);
  }
};

const esEmailExistente = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`El correo ya está registrado`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const existeUsuarioID = await Usuario.findById(id);
  if (!existeUsuarioID) {
    throw new Error(`El ID no eciste`);
  }
};

module.exports = {
  esRolValido,
  esEmailExistente,
  existeUsuarioPorId,
};
