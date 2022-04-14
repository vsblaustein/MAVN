import * as React from 'react';
import Axios from 'axios';


var a_group = []; var a_master = [];
var g_group = []; var g_master = [];
var l_group = []; var l_master = [];
var r_group = []; var r_master = [];
var ra_group = []; var ra_master = [];
var rb_group = []; var rb_master = [];

// gives the range of values for release year
const yearRange = (ry) => {

}

const ratingAverage = (r) => {

    var group_avg = 0;
    var master_avg = 0;

    // compute average of group
    for(const g in r_group){
        const curr_val = r_group[g];
        group_avg += (curr_val.value * curr_val.ratio)
    }

    // compute average of group
    for(const m in r_master){
        const curr_val = r_master[m];
        master_avg += (curr_val.value * curr_val.ratio)
    }

    // takes the movie master bias into account
    group_avg *= (1 - r);
    master_avg *= r;

    console.log("group avg: " + group_avg);
    console.log("master avg: " + master_avg);
    // the sum of the averages should be returned
    console.log("overall: " + (master_avg + group_avg));

}

const lengthAverage = (l) => {
    var group_avg = 0;
    var master_avg = 0;

    // compute average of group
    for(const g in l_group){
        const curr_val = l_group[g];
        group_avg += (curr_val.value * curr_val.ratio)
    }

    // compute average of group
    for(const m in l_master){
        const curr_val = l_master[m];
        master_avg += (curr_val.value * curr_val.ratio)
    }

    // takes the movie master bias into account
    group_avg *= (1 - l);
    master_avg *= l;

    console.log("group avg: " + group_avg);
    console.log("master avg: " + master_avg);
    // the sum of the averages should be returned
    console.log("overall: " + (master_avg + group_avg));
}


// put the algorithm work in here
// Selection List: (JSON, assigned score (default = 0))

// set the group prefs variables
const setGroupPrefs = (group_list) => {

    for (const g in group_list) {
        const curr_table = group_list[g].table;
        const curr_vals = group_list[g].data;
        console.log("data for " + curr_table + " is " + curr_vals);

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
        console.log("data for " + curr_table + " is " + curr_vals);

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


export const selectMovie = (l, r, g, ry, group_list, master_list) => {
    console.log("length:" + l);
    console.log("rating:" + r);
    console.log("genre: " + g);
    console.log("year:" + ry);

    // need to enumerate values from the group preferences
    console.log("attempting to get group pref");
    console.log("group: " + group_list);
    console.log("master:" + master_list);

    // set the group and master pref variables
    setGroupPrefs(group_list);
    setMasterPrefs(master_list);



    // movie selection order
    // 1) contains one of all genres and rating >= average rating to nearest 10th
    // Genre contains one of all the genres, rating is >= group rating average to nearest 10th (0-10 floats)’
    // If genre slider == 100: must match all movie master preferences
    // Rating = 80%, then take 0.8(master avg) + 0.2(group avg) += some constant (2)
    ratingAverage(r);

    // 2) Length = same as rating, buffer of 30 minutes
    lengthAverage(l);
    // 3) Release year: min of released before and max of released after as range, 

    // 4) Actors servers as the “order by” once the “prooned” list is computed, 100% actors in movie from pref = at the top, 0 = at the bottom of the list → alters the score

}

