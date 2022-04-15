import * as React from 'react';
import Axios from 'axios';

// vars to store the query results
var a_group = []; var a_master = [];
var g_group = []; var g_master = [];
var l_group = []; var l_master = [];
var r_group = []; var r_master = [];
var ra_group = []; var ra_master = [];
var rb_group = []; var rb_master = [];


// returns how many movie master genres must match?
const genreMatches = (g) => {
    // if g == 100% must match the number of genres in the master preferences
    console.log("num movie master genres is : " + g_master.length);
    const numMatches = Math.round(g_master.length * g);
    console.log("number of matches: ", numMatches)
    return numMatches;
    // if g == 0% does not have to match any genres
}

const ratingAverage = (r) => {

    var group_avg = 0;
    var master_avg = 0;

    // compute average of group
    for (const g in r_group) {
        const curr_val = r_group[g];
        group_avg += (curr_val.value * curr_val.ratio)
    }

    // compute average of group
    for (const m in r_master) {
        const curr_val = r_master[m];
        master_avg += (curr_val.value * curr_val.ratio)
    }

    // takes the movie master bias into account
    group_avg *= (1 - r);
    master_avg *= r;

    console.log("group avg: " + group_avg);
    console.log("master avg: " + master_avg);
    // the sum of the averages should be returned, rounds to 10th
    return Math.round(10 * (master_avg + group_avg)) / 10;

}

const lengthAverage = (l) => {
    var group_avg = 0;
    var master_avg = 0;

    // compute average of group
    for (const g in l_group) {
        const curr_val = l_group[g];
        group_avg += (curr_val.value * curr_val.ratio)
    }

    // compute average of group
    for (const m in l_master) {
        const curr_val = l_master[m];
        master_avg += (curr_val.value * curr_val.ratio)
    }

    // takes the movie master bias into account
    group_avg *= (1 - l);
    master_avg *= l;

    console.log("group avg: " + group_avg);
    console.log("master avg: " + master_avg);
    // the sum of the averages should be returned
    return Math.round(master_avg + group_avg);

}

// gives the range of values for release year
const yearRange = (ry) => {

    var group_min = 2060; var master_min = 2060;
    var group_max = 0; var master_max = 0;

    // compute group min
    for (const g in ra_group) {
        const curr_val = ra_group[g];
        group_min = curr_val.value < group_min ? curr_val.value : group_min;
    }

    // compute group max
    for (const g in rb_group) {
        const curr_val = rb_group[g];
        group_max = curr_val.value > group_max ? curr_val.value : group_max;
    }

    // compute group min
    for (const m in ra_master) {
        const curr_val = ra_master[m];
        master_min = curr_val.value < master_min ? curr_val.value : master_min;
    }

    // compute group ma
    for (const m in rb_master) {
        const curr_val = rb_master[m];
        master_max = curr_val.value > master_max ? curr_val.value : master_max;
    }

    // console.log("group min: " + group_min + " max: " + group_max);
    // console.log("master min: " + master_min + " max: " + master_max);

    // math to compute the ranges
    const min_after = Math.min(group_min, master_min);
    const max_after = Math.max(group_min, master_min);
    const min_before = Math.min(group_max, master_max);
    const max_before = Math.max(group_max, master_max);

    const lower_range = Math.round(min_after + ((max_after - min_after) * ry));
    const upper_range = Math.round(max_before - ((max_before - min_before) * ry));

    console.log("lower: " + lower_range + " and upper: " + upper_range);

    var res = [];
    // returns the lower and upper ranges
    res.push(lower_range); res.push(upper_range);
    return res;


}

// if all moviemaster actors present, give 100%
// else, enumerate by how many movie master and group actors are in the cast_mambers list?
const actorPref = (a) => {
    // need to get the list of cast members for each movie
    // need to count how many cast members are in the movie_master actor list (and group)?

    // map stores the actor name as key and number of times it is in there * the master preferences as val
    var groupActors = new Map(); // access via map.get
    var masterActors = new Map();

    // add the actors for group and master into maps, rounded to 100ths
    for (const g in a_group) {
        const curr_actor = a_group[g];
        groupActors.set(curr_actor.value, Math.round(100 * curr_actor.numerator * (1 - a)) / 100);
    }

    for(const m in a_master){
        const curr_actor = a_master[m];
        masterActors.set(curr_actor.value, Math.round(100 * curr_actor.numerator * a) / 100);
    }

    console.log("printing maps");
    // holds actor names and preference to the 100th, want to maximize the sum of the values
    console.log(groupActors);
    console.log(masterActors);

}

// put the algorithm work in here
// Selection List: (JSON, assigned score (default = 0))

// set the group prefs variables
const setGroupPrefs = (group_list) => {

    for (const g in group_list) {
        const curr_table = group_list[g].table;
        const curr_vals = group_list[g].data;
        console.log("data for " + curr_table + " is %o", curr_vals);

        if (curr_table === 'genre_pref') {
            g_group = curr_vals;
        }
        else if (curr_table === 'length_pref') {
            l_group = curr_vals;
        }
        else if (curr_table === 'rating_pref') {
            r_group = curr_vals;
        }
        else if (curr_table === 'actor_pref') {
            a_group = curr_vals;
        }
        else if (curr_table === 'start_year_pref') {
            ra_group = curr_vals;
        }
        else if (curr_table === 'end_year_pref') {
            rb_group = curr_vals;
        }

    }
}

// set the movie master prefs variables
const setMasterPrefs = (master_list) => {

    for (const m in master_list) {
        const curr_table = master_list[m].table;
        const curr_vals = master_list[m].data;

        // console.log("data for " + curr_table + " is " + curr_vals);

        console.log("master data for " + curr_table + " is %o", curr_vals);


        if (curr_table === 'genre_pref') {
            g_master = curr_vals;
        }
        else if (curr_table === 'length_pref') {
            l_master = curr_vals;
        }
        else if (curr_table === 'rating_pref') {
            r_master = curr_vals;
        }
        else if (curr_table === 'actor_pref') {
            a_master = curr_vals;
        }
        else if (curr_table === 'start_year_pref') {
            ra_master = curr_vals;
        }
        else if (curr_table === 'end_year_pref') {
            rb_master = curr_vals;
        }

    }

}


const getFirstProonCall = async (lower, upper, num_genres) => {
    try {
        const resp = await Axios.get('http://localhost:3001/getFirstProon', {
            params: {
                lower: lower,
                higher: upper,
                num_genres: num_genres
            }
        });
        //console.log("data: ", resp.data);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
}

const getMovieGenresFromDB = async (title, year) => {
    //need to run query in server
    try {
        const resp = await Axios.post('http://localhost:3001/getGenresOfMovie', {
            t: title,
            y: year
        });
        //console.log("moviegenres from db: ", resp.data);
        const results = [];
        for (var x of resp.data) {
            results.push(x.genre);
        }
        //console.log("movie genres from db: ", results)
        return results;
    } catch (err) {
        console.error(err);
    }
}

//do this after filter by rating
const proonByGenre = async (genres, num_genres, movie_list) => {
    //console.log("movie list: ", movie_list);
    console.log("pruning by genres: ", genres);
    //console.log("matches: ", num_genres);
    var res = [];
    var ct = 0;
    //for every single movie, we need to make sure it contains genre matches of at least num_genres.
    for (var movie of movie_list) {
        const movie_genres = await getMovieGenresFromDB(movie.title, movie.year);
        //console.log(movie_genres);
        ct = 0;
        for (var g of movie_genres) {
            //console.log("g: %o", g);
            if (genres.includes(g)) {
                ct++;
                //console.log("found a match: ", ct);
                if (ct >= num_genres) {
                    res.push(movie);
                    break;
                }
            }
        }
    }
    console.log("res after pruning by genre: ", res)
    return res;
}

//given master_list, extract into a list of master genres
const getMasterGenres = (master_list) => {
    //console.log("%o", master_list);
    var res = [];
    for (var idx of master_list) {
        //console.log("idx:",idx);
        if (idx.table === 'genre_pref') {
            for (var genre of idx.data) {
                //console.log("genre: ", genre)
                res.push(genre.value);
            }
        }
    }
    //console.log("master genre: ", res)
    return res;
}

const getProonList = async (master_list, num_genres, rating) => {
    //here we need to select movies that
    //1. does the genre match with moviemaster,
    //2. also meets rating criteria within a buffer of 2.
    const buffer = 2;
    const lower = Math.max(0, rating - buffer);
    const upper = Math.min(10, rating + buffer);
    console.log("buffer: [%o, %o]", lower, upper);

    const movies_matching_rating = await getFirstProonCall(lower, upper, num_genres);
    
    const master_genres = getMasterGenres(master_list);
    
    const firstProonList = await proonByGenre(master_genres, num_genres, movies_matching_rating);
    console.log("first proon: ", firstProonList);
    return firstProonList;


}

export const selectMovie = async (l, r, g, ry, group_list, master_list) => {
    console.log("length:" + l);
    console.log("rating:" + r);
    console.log("genre: " + g);
    console.log("year:" + ry);
    console.log("actors: " + a);

    // need to enumerate values from the group preferences
    console.log("attempting to get group pref");
    console.log("group: %o", group_list);
    console.log("master: %o", master_list);

    // set the group and master pref variables
    setGroupPrefs(group_list);
    setMasterPrefs(master_list);

    // movie selection order
    // 1) contains one of all genres and rating >= average rating to nearest 10th

    // this is how many genres must be matched to MOVIE MASTER genres
    const num_genres = genreMatches(g);

    // does not include the over/under buffer yet
    const rating_val = ratingAverage(r);

    // 2) Length = same as rating, buffer of 30 minutes
    const length_val = lengthAverage(l);

    // 3) Release year: min of released before and max of released after as range, 
    const res = yearRange(ry);
    // split the result into lower and upper
    const lower_range = res[0];
    const upper_range = res[1];

    // print the resulting values
    console.log("ranges: " + lower_range + " to " + upper_range);
    console.log("rating: " + rating_val + " length: " + length_val + " genre: " + num_genres);

    //lets proon the list. we'll first target movies that are within the rating buffer, then run it through genre filtering using master_list.
    const prooned_list = getProonList(master_list, num_genres, rating_val);


    // 4) Actors servers as the “order by” once the “prooned” list is computed, 
    // 100% actors in movie from pref = at the top, 0 = at the bottom of the list → alters the score
    actorPref(a);


}

