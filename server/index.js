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
  const img = req.body.img;
  try {
    const result = await db.query(
      "INSERT INTO users (username, name, password, email, dob, image_path) VALUES (?, ?, ?, ?, ?, ?)",
      [username, full_name, password, email, dob, img]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

//POST: update user request, MAKE THIS ERROR CHECK
app.post('/updateUser', async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const dob = req.body.dob;
  const img = req.body.img;
  const curr_user = req.body.curr_user;
  try {
    const result = await db.query(
      "UPDATE users SET username = ?, email = ?, dob = ?, image_path = ? WHERE username = ?",
      [username, email, dob, img, curr_user]);
    res.send(req.body);
  } catch (err) {
    res.send("bad username");
  }
});

//POST: login request
app.post('/login', async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  //console.log("check for user " + username + " password " + password);
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
app.get('/getActors', async (req, res) => {
  try {
    const result = await db.query(
      "SELECT DISTINCT full_name FROM actors");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: Get actors from DB
app.get('/getMovieMaster', async (req, res) => {
  const c = req.query.c;
  try {
    const result = await db.query(
      "SELECT username FROM part_of WHERE code = ? AND is_master = 1;"
      , [c]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

//GET: metadata of a movie from DB
app.get('/getMetadata', async (req, res) => {
  const title = req.body.title;
  try {
    const result = await db.query(
      "SELECT * FROM movies WHERE title = ?",
      [title]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: Get genres from DB
app.get('/getGenres', async (req, res) => {
  try {
    const result = await db.query(
      "SELECT DISTINCT genre FROM genres");
    res.send(result);
  } catch (err) {
    throw err;
  }
});


// GET: Get movies from DB
app.get('/getMovies', async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM movies");
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// POST: Get single movie from DB
app.post('/getMovie', async (req, res) => {
  const title = req.body.t;
  const year = req.body.y;
  //console.log("req.body", req.body);
  try {
    const result = await db.query(
      "SELECT * FROM movies WHERE title = ? AND year = ?",
      [title, year]);
    res.send(result);
  }
  catch (err) {
    throw err;
  }
});

// POST: Get all genres for a single movie from DB
app.post('/getGenresOfMovie', async (req, res) => {
  const title = req.body.t;
  const year = req.body.y;
  //console.log("req.body", req.body);
  try {
    const result = await db.query(
      "SELECT genre FROM movie_genre WHERE title = ? AND year = ?",
      [title, year]);
    res.send(result);
  }
  catch (err) {
    throw err;
  }
});


// GET: cast members for a given movie
app.get('/getCastMembers', async (req, res) => {
  const movie_title = req.query.title;
  const yr = req.query.year;
  try {
    const result = await db.query(
      "SELECT DISTINCT actor FROM cast_members WHERE title = ? \
      and year = ?",
      [movie_title, yr]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: user information
app.get('/getProfile', async (req, res) => {
  const name = req.query.name;
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [name]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: user's movie rooms
app.get('/getMovieRooms', async (req, res) => {
  const name = req.query.name;
  try {
    const result = await db.query(
      "SELECT * FROM part_of WHERE username = ?",
      [name]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: user's movie rooms
app.get('/getMovieRoomName', async (req, res) => {
  const code = req.query.code;
  try {
    const result = await db.query(
      "SELECT * FROM movie_room WHERE code = ?",
      [code]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET: check if movie room exists
app.get('/checkMovieRoomCode', async (req, res) => {
  const c = req.query.c;
  try {
    const result = await db.query(
      "SELECT * FROM movie_room WHERE code = ?",
      [c]);
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
  BigInt.prototype.toJSON = function () { return this.toString() }

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

// do yo thang
app.get('/getFirstProon', async (req, res) => {
  console.log("getting first proon");
  const lower = req.query.lower;
  const higher = req.query.higher;
  const num_genres = req.query.num_genres;
  console.log("buffer: [%o %o]", lower, higher);
  console.log("num genres: ", num_genres);

  try {
    const result = await db.query(
      //need to figure out count genre
      "SELECT * FROM movies HAVING rating BETWEEN ? AND ?",
      [lower, higher]);
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
  BigInt.prototype.toJSON = function () { return this.toString() }

  console.log("fetching " + table + " for " + username);
  try {
    const result = await db.query(
      "SELECT DISTINCT n.value, MAX(n.numerator) as numerator, MIN(n.numerator / d.denominator) AS ratio \
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
            GROUP BY n.value \
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
  BigInt.prototype.toJSON = function () { return this.toString() }

  try {
    const result = await db.query(
      "SELECT * FROM movies WHERE title = ?", [movie_title]);
    res.send(result);
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

//GET: the movie master of a given movie room
app.get('/getMaster', async (req, res) => {
  const roomCode = req.query.code;
  console.log(roomCode);
  try {
    const result = await db.query(
      "SELECT movie_master FROM movie_room WHERE code = ?",
      [roomCode]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

//GET: the movie selection of a given movie room
app.get('/getSelection', async (req, res) => {
  const roomCode = req.query.code;
  console.log(roomCode);
  try {
    const result = await db.query(
      "SELECT title, image_path FROM movie_selection WHERE code = ?",
      [roomCode]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

//POST: adds to movie_selection table
app.post('/movieSelection', async (req, res) => {
  const code = req.body.code;
  const title = req.body.title;
  const year = req.body.year;
  const imagePath = req.body.imagePath;
  console.log("params: " + code + " " + title + " " + year);
  try {
    const result = await db.query(
      "INSERT INTO movie_selection (code, title, year, image_path) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE image_path = ? ",
      [code, title, year, imagePath, imagePath]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

app.post('/addAlert', async (req, res) => {
  const code = req.body.code;
  const title = req.body.title;
  const year = req.body.year;
  const imagePath = req.body.imagePath;
  const username = req.body.username;
  try{
    const result = await db.query(
      "INSERT INTO alerts (code, title, year, image_path, username) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE image_path = ? ",
      [code, title, year, imagePath, username, imagePath]);
      res.send(req.body);

  } catch (err){
    throw err;
  }
});

app.post('/addSelectionAlert', async (req, res) => {
  const code = req.body.code;
  const title = req.body.title;
  const year = req.body.year;
  const imagePath = req.body.imagePath;
  const username = req.body.username;
  try{
    const result = await db.query(
      "INSERT INTO selectionAlert (code, title, year, image_path, username) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE image_path = ? ",
      [code, title, year, imagePath, username, imagePath]);
      res.send(req.body);

  } catch (err){
    throw err;
  }
});

// removes alert
app.post('/removeAlert', async (req, res) => {
  const code = req.body.code;
  const user = req.body.username;
  try {
    const result = await db.query(
      "DELETE FROM alerts WHERE code = (?) AND username = (?)",
      [code, user]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// removes alert
app.post('/removeSelectionAlert', async (req, res) => {
  const code = req.body.code;
  const user = req.body.username;
  try {
    const result = await db.query(
      "DELETE FROM selectionAlert WHERE code = (?) AND username = (?)",
      [code, user]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get('/checkAlert', async (req, res) => {
  const code = req.query.code;
  const user = req.query.user;
  try {
    const result = await db.query(
      "SELECT count(*) AS cnt FROM alerts WHERE code = ? AND username = ?",
      [code, user]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get('/checkSelectionAlert', async (req, res) => {
  const code = req.query.code;
  const user = req.query.user;
  try {
    const result = await db.query(
      "SELECT count(*) AS cnt FROM selectionAlert WHERE code = ? AND username = ?",
      [code, user]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get('/getSelectionAlert', async (req, res) => {
  const code = req.query.code;
  const user = req.query.user;
  try {
    const result = await db.query(
      "SELECT title, image_path FROM selectionAlert WHERE code = ? AND username = ?",
      [code, user]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get('/getAlert', async (req, res) => {
  const code = req.query.code;
  const user = req.query.user;
  try {
    const result = await db.query(
      "SELECT title, image_path FROM alerts WHERE code = ? AND username = ?",
      [code, user]);
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

//POST: adds to actors table
app.post('/addActors', async (req, res) => {
  const fl_name = req.body.fl_name;
  const f_name = req.body.f_name;
  const l_name = req.body.l_name;
  const a_dob = req.body.a_dob;
  try {
    const result = await db.query(
      "INSERT INTO actors(full_name, first_name, last_name, dob) VALUES (?,?,?,?)",
      [fl_name, f_name, l_name, a_dob]);
    res.send(req.body);
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

// removes a member from a room
app.post('/removeMembers', async (req, res) => {
  const users = req.body.users;
  try {
    const result = await db.query(
      "DELETE FROM part_of WHERE username IN (?)",
      [users]);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

//POST: adds to cast_members table
app.post('/addCastMembers', async (req, res) => {
  const m_title = req.body.m_title;
  const m_year = req.body.m_year;
  const m_actor = req.body.m_actor;
  const m_actor_dob = req.body.m_actor_dob;
  try {
    const result = await db.query(
      "INSERT INTO cast_members(title, year, actor, actor_dob) VALUES(?,?,?,?)",
      [m_title, m_year, m_actor, m_actor_dob]);
    res.send(req.body);
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

// QUERIES FOR INSERTING INTO ROOMS
//POST: adds movie room
app.post('/addMovieRoom', async (req, res) => {
  const room_code = req.body.room_code;
  const room_name = req.body.room_name;
  const created = req.body.created;
  const pass = req.body.pass;
  const master = req.body.master;
  try {
    console.log("results: " + room_code + " " + room_name + " " + created + " " + pass + " " + master);
    const result = await db.query(
      "INSERT INTO movie_room(code, name, date_created, password, movie_master) VALUES(?,?,?,?,?)",
      [room_code, room_name, created, pass, master]);
    res.send(req.body);
  } catch (err) {
    throw err;
  }
});

//POST: add user to part of on first sign in
app.post('/addPartOf', async (req, res) => {
  const user = req.body.user;
  const room_code = req.body.room_code;
  const master = req.body.master;
  try {
    const result = await db.query(
      "INSERT ignore INTO part_of(username,code,is_master) VALUES(?,?,?)",
      [user, room_code, master]);
    res.send(req.body);
  } catch (err) {
    if (err.message.toString().includes("no: 1062")) {
      res.send("duplicate");
    }
    else throw err;
  }
});

//POST: register request
app.get('/getPassword', async (req, res) => {
  const roomCode = req.query.roomCode;
  try {
    const result = await db.query(
      "SELECT password FROM movie_room WHERE code = ?",
      [roomCode]);
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
