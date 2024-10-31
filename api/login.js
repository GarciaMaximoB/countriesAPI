const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(process.cwd(), "data", "users.json");

function readUsersFromFile() {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
}

module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

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
};
