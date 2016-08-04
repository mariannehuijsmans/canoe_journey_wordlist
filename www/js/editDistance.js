/**
 * editDistance.js
 * 
 * A simple Levenshtein distance calculator, except weighted such
 * that insertions at the beginning and deletions at the end cost less.
 *
 * AUTHOR: Pat Littell
 * LAST UPDATED: 2015-05-16
 */

var distanceCalculator2 = function(entries) {

    // First, create a dict of candidates, where the key is the comparison form
    // and the value is the entry itself.    
    var candidates = {};
    var candidateKeys = [];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var compareForm = entry["compare_form"];
        if (!(compareForm in candidates)) {
            candidates[compareForm] = [];
            candidateKeys.push(String(compareForm));
        }
        candidates[compareForm].push(entry);
    }  
    // Then build a Levenshtein Automaton from the keys
    var builder = new levenshtein.Builder()
    .dictionary(candidateKeys, false) 
    .algorithm("transposition")       
    .sort_candidates(true)                    
    .include_distance(true)                    
    .maximum_candidates(10);                   
    var transducer = builder.transducer();

    // Return the appropriate search function
    return function(query) {
        var results = [];
        var distanceFormPairs = transducer.transduce(query,Math.floor(query.length/3.0));
        for (var i = 0; i < distanceFormPairs.length; i++) {
            var distance = distanceFormPairs[i][1];
            var form = distanceFormPairs[i][0];
            var resultingEntries = candidates[form];
            for (var j = 0; j < resultingEntries.length; j++) {
                resultingEntries[j]["distance"] = distance;
                results.push([distance, resultingEntries[j]]);
            }
        }
        return results;
    };
};

var distanceCalculatorEng = function(entries) {

    // First, create a dict of candidates, where the key is the comparison form
    // and the value is the entry itself.    
    var candidates = {};
    var candidateKeys = [];
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var compareForm = entry["definition"];
        if (!(compareForm in candidates)) {
            candidates[compareForm] = [];
            candidateKeys.push(String(compareForm));
        }
        candidates[compareForm].push(entry);
    }  
    // Then build a Levenshtein Automaton from the keys
    var builder = new levenshtein.Builder()
    .dictionary(candidateKeys, false) 
    .algorithm("transposition")       
    .sort_candidates(true)                    
    .include_distance(true)                    
    .maximum_candidates(10);                   
    var transducer = builder.transducer();

    // Return the appropriate search function
    return function(query) {
        var results = [];
        var distanceFormPairs = transducer.transduce(query,Math.floor(query.length/3.0));
        for (var i = 0; i < distanceFormPairs.length; i++) {
            var distance = distanceFormPairs[i][1];
            var form = distanceFormPairs[i][0];
            var resultingEntries = candidates[form];
            for (var j = 0; j < resultingEntries.length; j++) {
                resultingEntries[j]["distance"] = distance;
                results.push([distance, resultingEntries[j]]);
            }
        }
        return results;
    };
};

var distanceCalculator = {

    insertionCost : 1.0,
    deletionCost : 1.0,
    insertionAtBeginningCost : 0.11,
    deletionAtEndCost : 0.1,
    substitutionCost : 1.0,

    getEditDistance : function(a, b) {
        if(a.length === 0) return b.length; 
        if(b.length === 0) return a.length; 

        var matrix = [];
        // var currentInsertionCost, currentDeletionCost, currentSubstitutionCost = 0;

        // increment along the first column of each row
        var i;
        for(i = 0; i <= b.length; i++){
            matrix[i] = [i * this.insertionAtBeginningCost];
        }

        // increment each column in the first row
        var j;
        for(j = 0; j <= a.length; j++){
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for(i = 1; i <= b.length; i++){
            for(j = 1; j <= a.length; j++){
                currentInsertionCost = matrix[i][j-1] + this.insertionCost;
                currentSubstitutionCost = matrix[i-1][j-1] + (b.charAt(i-1) != a.charAt(j-1) ? this.substitutionCost : 0);
                currentDeletionCost = matrix[i-1][j] + (j==a.length ? this.deletionAtEndCost : this.deletionCost);            
                matrix[i][j] = Math.min(currentSubstitutionCost, Math.min(currentInsertionCost, currentDeletionCost));

            }
        }

        return matrix[b.length][a.length];
    },


    // Given a query <a> and a series of targets <bs>, return the least distance to any target
    getLeastEditDistance : function(a, bs) {
        var that = this;
        return Math.min.apply(null, bs.map(function(b) {
            return that.getEditDistance(a,b);
        }));
    }
}