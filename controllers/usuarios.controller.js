const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario.model");

const usuariosGet = async (req, res = response) => {
  const { limite, from } = req.query;

  const [total, usuariosActivosTotal, usuariosInactivosTotal, usuarios] =
    await Promise.all([
      Usuario.countDocuments(),
      Usuario.countDocuments({ estado: true }),
      Usuario.countDocuments({
        estado: false,
      }),
      Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(from)),
    ]);

  res.json({
    total,
    usuariosActivosTotal,
    usuariosInactivosTotal,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  // Guardar usuario en la bd
  await usuario.save();
  res.json({
    msg: "Post API controlador",
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  console.log(req.body);
  const { password, google, correo, ...resto } = req.body;

  // Validar contra bd
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    msg: "Put API controlador",
    usuario,
  });
};

const usuariosDetele = async (req, res = response) => {
  const id = req.params.id;
  // const usuario = await Usuario.findByIdAndDelete(id) // Elimina al user fisicamente del espacio en la bd
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }); // cambia el estado a inactivo
  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "Patch API controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDetele,
  usuariosPatch,
};
