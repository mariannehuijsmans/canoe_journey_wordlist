
// get the distances


waldayu.searchers = {}
waldayu.searchers["L1"] = function() {

    var weights = { "compare_form" : 1.0, "underlying_form" : 0.1 };
    var thresholds = { "exact" : 0.0, "partial" : 1.0, "other" : 4.0 };

    return function(needle, haystack, query_value) {
        var results = [];
        for (var i = 0; i < haystack.length; i++) {
            var entry = haystack[i];
            var distance = 0;

            waldayu.convertQuery(query_value, "L1", "compare")

            for (weightKey in weights) {
                if (weights.hasOwnProperty(weightKey)) {
                    weightValue = weights[weightKey];
                    distance += distanceCalculator.getLeastEditDistance(needle[weightKey], entry[weightKey]) * weightValue;
                }
            }
            entry["distance"] = distance;   // keep track of the result for testing purposes
            results.push(entry);
        }

        // sort the results by distance
        results.sort(function(a,b) {
            return a["distance"] - b["distance"];
        });

        return results;    
    }
}();

waldayu.searchers["L12"] = function() {
    var weights = { "definition" : 1.0 };
    var thresholds = { "exact" : 0.9, "partial" : 1.9, "other" : 1000.0 };

};

var l1SearchAlg = null;
function searchGit(query_value) {
    if (l1SearchAlg === null) {
        l1SearchAlg = distanceCalculator2(getAllEntries());
    }
    var needle = waldayu.convertQuery(query_value, "L1", "compare");
    return l1SearchAlg(needle);
}
var l2SearchAlg = null;
function searchEng(query_value) {
    if (l2SearchAlg === null) {
        l2SearchAlg = distanceCalculatorEng(getAllEntries());
    }
    query_value = query_value.toLowerCase();
    return l2SearchAlg(query_value);
}
//
//function searchEng(query_value) {
//    var results = [];
//    query_value = query_value.toLowerCase();
//    // get the distances
//    var entries = getAllEntries();
//    for (var i = 0; i < entries.length; i++) {
//        var target_value = entries[i]["definition"];
//        //var normalized_target = target_value.toLowerCase();
//        var distance = distanceCalculator.getLeastEditDistance(query_value, target_value);
//        entries[i]["distance"] = distance;
//        results.push(entries[i]);
//    }
//
//    // sort the results
//    results.sort(function(a,b) {
//        return a["distance"] - b["distance"];
//    });
//
//    return results;
//
//}
var response = [];
function search(lang_value, side, input_area) {
    response = [];
    var query_value = $(input_area).val().trim();
    if (query_value !== '') {

        $("div#results").fadeOut({duration:0});
        $(".searchInstructions").fadeOut({duration:0});

        if (lang_value == 'git') {
            results = searchGit(query_value);
        } else {
            results = searchEng(query_value);
        }


        for (var i = 0; i < Math.min(10, results.length); i++) {
            var distance = results[i][0];
            var result = results[i][1];
            response.push(result);
        }

        response.sort(function(a,b) {
            return a[0] - b[0];
        });
        console.log(response);
        $("div#results").show();
    }
    return false;    
}

function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}

function getRandom10() {
    var entries = shuffle(getAllEntries());             // shuffle entries
    return entries.slice(0,10);
}

function get10(entries, startIndex) {
    return entries.slice(startIndex,startIndex+10);                                  
}

function get1(entries, startIndex) {
    return entries.slice(startIndex,startIndex+1);                                  
}