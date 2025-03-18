const { Login } = require("../models");
const { validateLogin } = require("../validations/loginValidation");

exports.createLoginType = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const login = await Login.create(req.body);
    res.status(201).send(login);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getLoginType = async (req, res) => {
  try {
    const logins = await Login.findAll();
    res.status(200).send(logins);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getLoginTypeById = async (req, res) => {
  try {
    const logins = await Login.findByPk(req.params.id, {
      //   includes: [
      //     {
      //       model: ,
      //       as: "",
      //     },
      //   ],
    });
    if (!logins) return res.status(404).send("logins not found");
    res.status(200).send(logins);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateLoginType = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const logins = await Login.findByPk(req.params.id);
    if (!logins) return res.status(404).send("logins not found");
    await logins.update(req.body);
    res.status(200).send(logins);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteLoginType = async (req, res) => {
  try {
    const logins = await Login.findByPk(req.params.id);
    if (!logins) return res.status(404).send("logins not found");
    const distristLogin = logins.toJSON();

    await logins.destroy();
    res.status(204).send(distristLogin);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
