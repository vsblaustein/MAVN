// server/index.js

const express = require("express");
const cors = require("cors");
const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());
const mariadb = require('mariadb');
var db = mariadb.createPool({
     host: '172.16.122.22',
     port: 3306,
     user: 'nate2',
     password: 'nate2',
     database: 'moviemaster'
    
});

module.exports = Object.freeze({
  pool: db
});

//POST: register request
app.post('/register', async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const full_name = req.body.full_name;
  const email = req.body.email;
  const dob = req.body.dob;
  try {
    const result = await db.query(
      "INSERT INTO users (username, name, password, email, dob, image_path) VALUES (?, ?, ?, ?, ?, NULL)", 
      [username, full_name, password, email, dob]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

//POST: login request
app.post('/login', async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  console.log("check for user " + username + " password " + password);
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?", 
      [username, password]);
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({message: "Wrong username/password combination"});
    }
  } catch (err) {
    throw err;
  }
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});