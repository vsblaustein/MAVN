// server/index.js

const express = require("express");
const cors = require("cors");
const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());
const mariadb = require('mariadb');
const db = mariadb.createPool({
     host: '172.16.122.22',
     port: 3306,
     user: 'nate2',
     password: 'nate2',
     database: 'moviemaster'
    
});

//registering a new user request
app.post('/register', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const full_name = req.body.full_name;
  const email = req.body.email;
  const dob = req.body.dob;
  db.query(
    "INSERT INTO users (username, name, password, email, dob, image_path) VALUES (?, ?, ?, ?, ?, NULL)", 
    [username, full_name, password, email, dob],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});