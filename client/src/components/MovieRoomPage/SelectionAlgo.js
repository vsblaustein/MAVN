import * as React from 'react';
import Axios from 'axios';


// write stuff to generate the move, params = percents
// maybe change this to the Selection Algo Function?
export const selectMovie = (l,r,g,ry) => {
    console.log("length:" + l);
    console.log("rating:" + r);
    console.log("genre: " + g);
    console.log("year:" + ry);

    // need to enumerate values from the group preferences

    // need to enumerate values for movie master (current user)
}

// put the algorithm work in here
// Selection List: (JSON, assigned score (default = 0))
export default function SelectionAlgo() {

    // the values of the edit preferences pop up results are stored as state variables in index.js

    


// movie selection order
// 1) contains one of all genres and rating >= average rating to nearest 10th
// Genre contains one of all the genres, rating is >= group rating average to nearest 10th (0-10 floats)’
// If genre slider == 100: must match all movie master preferences
// Rating = 80%, then take 0.8(master avg) + 0.2(group avg) += some constant (2)

// 2) Length = same as rating, buffer of 30 minutes
// 3) Release year: min of released before and max of released after as range, 

// 4) Actors servers as the “order by” once the “prooned” list is computed, 100% actors in movie from pref = at the top, 0 = at the bottom of the list → alters the score

}