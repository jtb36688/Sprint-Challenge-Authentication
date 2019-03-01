const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/users-module");

const auth = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.post("/api/checkauth", auth.checkauth)
  server.get("/api/jokes", auth.authenticate, getJokes);
};

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  db.add(user)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function login(req, res) {
  const { username, password } = req.body;
  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = auth.makejwt(user);
        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
