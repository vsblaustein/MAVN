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

// QUERIES TO LOAD INFO FROM DATABASE

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

// START OF QUERIES TO ADD TO PREFERENCES

//POST: adds to rating_pref table
app.post('/ratingPref', async (req, res) => {
  const username = req.body.username;
  const rating = req.body.rating;
  try {
    const result = await db.query(
      "INSERT INTO rating_pref (username, value) VALUES (?, ?)",
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
      "INSERT INTO length_pref (username, value) VALUES (?, ?)",
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
      "INSERT INTO genre_pref (username, value) VALUES (?, ?)",
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
      "INSERT INTO actor_pref (username, value) VALUES (?, ?)",
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
      "INSERT INTO start_year_pref (username, value) VALUES (?, ?)",
      [username, s_year]);
    const result2 = await db.query(
      "INSERT INTO end_year_pref (username, value) VALUES (?, ?)",
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

// QUERIES TO GENERATE PREFERENCES CHARTS

// GET: actor preferences for current user
app.get('/getPrefChart', async (req, res) => {
  const username = req.query.username;
  const table = req.query.table;
  // allows for serializing of a BigInt (for ratio)
  BigInt.prototype.toJSON = function() { return this.toString() }

  console.log("fetching " + table + " for " + username);

  try {
    const result = await db.query(
      "SELECT n.username, n.value, n.numerator, n.numerator / d.denominator AS ratio \
        FROM( \
              SELECT username, value, COUNT(value) AS numerator \
              FROM " + table + 
              " WHERE username IN (?) \
              GROUP BY value, username ) n \
          INNER JOIN ( \
              SELECT username, COUNT(value) AS denominator \
              FROM " + table + 
              " WHERE username IN (?) \
              GROUP BY username \
          ) d ON d.username = n.username \
            ORDER BY n.value; ", [username, username]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: group preferences for current user
app.get('/getGroupPrefChart', async (req, res) => {
  const username = req.query.username;
  const table = req.query.table;
  // allows for serializing of a BigInt (for ratio)
  BigInt.prototype.toJSON = function() { return this.toString() }

  console.log("fetching " + table + " for " + username);

  try {
    const result = await db.query(
      "SELECT DISTINCT n.value, n.numerator, n.numerator / d.denominator AS ratio \
        FROM( \
              SELECT p.code, value, COUNT(value) AS numerator  \
              FROM " + table + " AS t \
              INNER JOIN part_of p ON p.username = t.username \
              WHERE t.username IN (?) \
              GROUP BY value, p.code ) n \
          INNER JOIN ( \
              SELECT p.code, COUNT(value) AS denominator \
              FROM " + table + " AS t \
              INNER JOIN part_of p ON p.username = t.username \
              WHERE t.username IN (?) \
              GROUP BY p.code \
          ) d ON d.code = n.code \
            ORDER BY n.value; ", [username, username]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

//POST: add results from movie tinder, SHOULD BE SMALLER WEIGHT?

// GET: information from movies
app.get('/getMovieMetaData', async (req, res) => {
  const movie_title = req.query.movie_title;
  // allows for serializing of a BigInt (for ratio)
  BigInt.prototype.toJSON = function() { return this.toString() }

  try {
    const result = await db.query(
      "SELECT title, year, length, rating FROM movies WHERE title = ?",[movie_title]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: all the genres for a given movie
app.get('/getMovieGenres', async (req, res) => {
  const movie_title = req.query.movie_title;
  try {
    const result = await db.query(
      "SELECT genre FROM movie_genre WHERE title = ?",
      [movie_title]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: all the cast members for a given movie
app.get('/getMovieCast', async (req, res) => {
  const movie_title = req.query.movie_title;
  try {
    const result = await db.query(
      "SELECT actor FROM cast_members WHERE title = ?",
      [movie_title]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: all the members in a given movie room (for preferences)
app.get('/getMembersList', async (req, res) => {
  const room_code = req.query.room_code;
  try {
    const result = await db.query(
      "SELECT DISTINCT username FROM part_of WHERE code = ?",
      [room_code]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: movies by genre
app.get('/getMovieGenre', async (req, res) => {
  const m_genre = req.query.m_genre;
  try {
    const result = await db.query(
      "SELECT DISTINCT image_path AS img FROM movies \
      INNER JOIN movie_genre mg ON mg.title = movies.title \
      WHERE genre = ?",
      [m_genre]);
    res.send(result);
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