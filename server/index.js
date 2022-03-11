// server/index.js

const express = require("express");
const PORT = 3001;
const app = express();
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '172.16.122.22',
     port: 3306,
     user: 'nate2',
     password: 'nate2',
     database: 'moviemaster'
    
});



app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});