const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const usersFilePath = path.join(__dirname, "../data/users.json");

function readUsersFromFile() {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
}

app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Falta el parámetro username" });
  }

  const users = readUsersFromFile();
  const user = users.find((u) => u.username === username);

  if (user) {
    res.json({ password: user.password });
  } else {
    res.status(404).json({ error: "Usuario no encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
