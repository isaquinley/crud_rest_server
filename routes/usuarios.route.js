const { Router } = require("express");
const { check } = require("express-validator");
const {
  esRolValido,
  esEmailExistente,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const validarCampos = require("../middlewares/validar-campos");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDetele,
  usuariosPatch,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe contener al menos 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    check("correo").custom(esEmailExistente),
    //  se valida contra la info de la bd
    validarCampos, //ejecuta las validaciones del route y despues las del middleware si todo esta ok pasa a hacer el post
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "no es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    check("id", "no es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
  ],
  usuariosDetele
);

router.patch("/", usuariosPatch);

module.exports = router;
