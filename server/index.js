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
      res.send({ message: "Wrong username/password combination" });
    }
  } catch (err) {
    throw err;
  }
});

// GET: Get actors from DB
app.get('/getActors', async(req,res) => {
  try {
    const result = await db.query(
      "SELECT DISTINCT full_name FROM actors");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: Get genres from DB
app.get('/getGenres', async(req,res) => {
  try {
    const result = await db.query(
      "SELECT DISTINCT genre FROM genres");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: Get movies from DB
app.get('/getMovies', async(req,res) => {
  try {
    const result = await db.query(
      "SELECT * FROM movies");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// **** START PREFERENCES ****
//POST: adds to rating_pref table
app.post('/ratingPref', async (req, res) => {
  const username = req.body.username;
  const rating = req.body.rating;
  try {
    const result = await db.query(
      "INSERT INTO rating_pref (username, rating) VALUES (?, ?)",
      [username, rating]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

// POST: adds to length_pref table
app.post('/lengthPref', async (req, res) => {
  const username = req.body.username;
  const length = req.body.length;
  try {
    const result = await db.query(
      "INSERT INTO length_pref (username, length) VALUES (?, ?)",
      [username, length]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

// POST:adds to genre_pref table
app.post('/genrePref', async (req, res) => {
  const username = req.body.username;
  const genre = req.body.genre;
  try {
    const result = await db.query(
      "INSERT INTO genre_pref (username, genre) VALUES (?, ?)",
      [username, genre]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

//POST: adds to actor_pref table
app.post('/actorPref', async (req, res) => {
  const username = req.body.username;
  const actor = req.body.actors;
  try {
    const result = await db.query(
      "INSERT INTO actor_pref (username, actor) VALUES (?, ?)",
      [username, actor]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

//POST: adds to release_year_pref table
app.post('/releaseYearPref', async (req, res) => {
  const username = req.body.username;
  const s_year = req.body.s_year;
  const e_year = req.body.e_year;
  try {
    const result = await db.query(
      "INSERT INTO start_year_pref (username, start_year) VALUES (?, ?)",
      [username, s_year]);
    const result2 = await db.query(
      "INSERT INTO end_year_pref (username, end_year) VALUES (?, ?)",
      [username, e_year]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

//POST: clear preferences
app.post('/clearPref', async (req, res) => {
  const username = req.body.username;
  try {
    const result = await db.query(
      "DELETE FROM actor_pref WHERE username = ?",
      [username]);
    const result1 = await db.query(
      "DELETE FROM genre_pref WHERE username = ?",
      [username]);
    const result2 = await db.query(
      "DELETE FROM start_year_pref WHERE username = ?",
      [username]);
    const result3 = await db.query(
      "DELETE FROM end_year_pref WHERE username = ?",
      [username]);
    const result4 = await db.query(
      "DELETE FROM rating_pref WHERE username = ?",
      [username]);
    const result5 = await db.query(
      "DELETE FROM length_pref WHERE username = ?",
      [username]);

    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

// **** END PREFERENCES ****

// **** INSERT INTO TABLES ****
//POST: adds to movies table
app.post('/addMovie', async (req, res) => {
  const m_title = req.body.m_title;
  const m_year = req.body.m_year;
  const m_length = req.body.m_length;
  const m_image_path = req.body.m_image_path;
  const m_rating = req.body.m_rating;
  const m_plot = req.body.m_plot;
  try {
    const result = await db.query(
      "INSERT INTO movies(title, year, length, image_path, rating, plot) VALUES (?,?,?,?,?,?);",
      [m_title, m_year, m_length, m_image_path, m_rating, m_plot]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

//POST: adds to movie_genre table
app.post('/addMovieGenre', async (req, res) => {
  const m_title = req.body.m_title;
  const m_year = req.body.m_year;
  const m_genre = req.body.m_genre;
  try {
    const result = await db.query(
      "INSERT INTO movie_genre(title, year, genre) VALUES (?,?,?)",
      [m_title, m_year, m_genre]);
    res.send(req.body);
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