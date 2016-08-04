waldayu.transducers = {};
waldayu.transduce = function(str, transducerName) {
    if (transducerName in waldayu.transducers) {        
        var transducer = waldayu.transducers[transducerName];
        return transducer(str);
    } else {
        waldayu.err('Transducer <b>' + transducerName + '</b> not found.');
        return str;
    }
};

waldayu.convertQuery = function(str, lang, orthType) {
    var orths = config[lang][orthType];
    return waldayu.transduce(str, orths);
};
    
waldayu.convertWords = function(words, orth) {
    return words.map(function(word) {
        return waldayu.transduce(word, orth);
    });
};
    
waldayu.orthographizeEntries = function(dictionary) {
    $.each(dictionary, function(resourceID, manifest) {
        $.each(manifest["data"], function(index, entry) {
            entry["word"] = waldayu.convertWords(entry["word"], manifest["norm"]);
            entry["forms"] = entry["word"].slice();
            if ("variants" in entry) {
                entry["forms"].concat(entry["variants"]);
            }
            entry["display_form"] = waldayu.convertWords(entry["forms"], manifest["display"]);
//            console.log(entry["display_form"])
            entry["underlying_form"] = waldayu.convertWords(entry["forms"], manifest["underlying"]);
            entry["compare_form"] = waldayu.convertWords(entry["forms"], manifest["compare"]);
            entry["sorting_form"] = waldayu.convertWords(entry["forms"], manifest["sorting"]);
        });
    });
};

/* Then we add the transducers one by one */
waldayu.transducers["approx"] = (function() {
    var correspondences = {"\u0294": "", "\u0313": "", "\u02b7": "", "\u025b": "e", "\u0259": "\u025b", "h": "\u03c7", "i": "\u0269", "\u0269": "i", "j\u030c": "\u010d", "k": "k\u02b7", "q": "q\u02b7", "\u026c": "l", "l": "\u026c", "\u019b": "t\u026c", "t\u01dbf": "\u03b8", "\u03b8": "t\u01dbf", "u": "\u028a", "\u028a": "u", "x": "\u03c7", "\u03c7": "x"};
    var keys = ["\u0294", "\u0313", "\u02b7", "\u025b", "\u0259", "\u025b", "\u0259", "h", "i", "\u0269", "j\u030c", "k", "q", "\u026c", "l", "\u019b", "t\u01dbf", "u", "\u028a", "x", "\u03c7"];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();

/* missing "q": "q\u0313", "k": "k\u0313" */ 

waldayu.transducers["phonics"] = (function() {
    var correspondences = {"\u0294": "'", "\u010d": "ch", "e": "ai", "\u025b": "eh", "\u0259": "e", "i": "ee", "\u0269": "ih", "j\u030c": "j", "k": "q", "q": "k", "\u026c": "tl", "\u019b": "tl", "\u0161": "sh", "u": "oo", "\u03c7": "x"};
    var keys = ["\u0294", "\u010d", "e", "\u025b", "\u0259", "i", "\u0269", "j\u030c", "k", "q", "\u026c", "\u019b", "\u0161", "u", "\u03c7"];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();

waldayu.transducers["num"] = (function() {
    var correspondences = {
        "\u0294": "100",
        "a": "101",
        "\u010d": "102",
        "e": "103",
        "\u025b": "104",
        "\u0259": "105",
        "g": "106",
        "h": "107", 
        "i": "108",
        "\u0269": "109",
        "j\u030c": "110",
        "k": "111",
        "k\u0313": "112",
        "k\u02b7": "113",
        "k\u0313\u02b7": "114",
        "\u026c": "115",
        "\u019b": "116",
        "\u019b\u0313": "117",
        "m": "118",
        "m\u0313": "119",
        "n": "120",
        "n\u0313": "121",
        "o": "123",
        "p": "124",
        "p\u0313": "125",
        "q": "126",
        "q\u0313": "127",
        "q\u02b7": "128",
        "q\u0313\u02b7": "129",
        "s": "130",
        "\u0161": "131",
        "t": "132",
        "t\u01dbf": "133",
        "t\u0313": "134",    
        "t\u0313\u01dbf": "135",
        "\u03b8":"136",
        "u":"137",
        "\u028a":"139",
        "w":"140",
        "w\u0313":"141",
        "x":"142",
        "x\u02b7":"143",
        "\u03c7":"144",
        "\u03c7\u02b7":"145",
        "y":"146",
        "y\u0313":"147",
    };
    var keys = ["p\u0313", "\u1e43\u0301", "\u1e43", "m\u0313", "\u1e43\u0313", "t\u0313", "\u1e47\u0301", "\u1e47", "n\u0313", "\u1e47\u0313", "c\u0313", "\u03bb", "\u019b", "\u019b\u0313", "\u026b", "\u1e37\u0301", "\u1e37", "l\u0313", "\u1e37\u0313", "k\u0313", "i\u0301", "y\u0313", "i\u0313", "gv", "kv", "k\u0313v", "xv", "u\u0301", "w\u0313", "u\u0313", "g\u030cv", "qv", "q\u0313v", "x\u030cv", "g\u030c", "q\u0313", "x\u030c", "a\u0301", "h\u0313", "a\u0313", "\u0127", "\u0294", "p", "m", "t", "n", "z", "c", "d", "s", "l", "g", "k", "x", "y", "i", "w", "u", "q", "a", "b"];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();


waldayu.transducers["sorting_composite"] = (function(){
    var orths = ["fm_to_display","num"];
    return function(str) {
        for (var i = 0; i < orths.length; i++) {
            transducer = waldayu.transducers[orths[i]];
            str = transducer(str);
        }
        return str;
    };
})();
waldayu.transducers["sorting_composite_2013"] = (function(){
    var orths = ["g2013_to_display","num"];
    return function(str) {
        for (var i = 0; i < orths.length; i++) {
            transducer = waldayu.transducers[orths[i]];
            str = transducer(str);
        }
        return str;
    };
})();
waldayu.transducers["compare_composite"] = (function(){
    var orths = ["norm","fm_to_display","approx"];
    return function(str) {
        for (var i = 0; i < orths.length; i++) {
            transducer = waldayu.transducers[orths[i]];
            str = transducer(str);
        }
        return str;
    };
})();
waldayu.transducers["compare_composite_2013"] = (function(){
    var orths = ["norm","g2013_to_display","approx"];
    return function(str) {
        for (var i = 0; i < orths.length; i++) {
            transducer = waldayu.transducers[orths[i]];
            str = transducer(str);
        }
        return str;
    };
})();
waldayu.transducers["display_composite"] = (function(){
    var orths = ["norm","fm_to_display"];
    return function(str) {
        for (var i = 0; i < orths.length; i++) {
            transducer = waldayu.transducers[orths[i]];
            str = transducer(str);
        }
        return str;
    };
})();
waldayu.transducers["display_composite_2013"] = (function(){
    var orths = ["norm","g2013_to_display"];
    return function(str) {
        for (var i = 0; i < orths.length; i++) {
            transducer = waldayu.transducers[orths[i]];
            str = transducer(str);
        }
        return str;
    };
})();
waldayu.transducers["fm_to_display"] = (function() {
    var correspondences = {"A": "A", "a": "a", "d": "d", "D": "D", "E": "E", "e": "e", "1": "\u0119", "T": "T", "ts": "ts", "t": "t", "Ts": "Ts", "S": "S", "s": "s", "H": "H", "h": "h", "K": "K", "k": "k", "G": "G", "g": "g", "J": "J", "j": "j", "n": "n", "N": "N", "M": "M", "m": "m", "r": "r", "R": "R", "w": "w", "W": "W", "Y": "Y", "y": "y", "i": "i", "u": "u", "o": "o", "O": "O", "I": "I", "U": "U", "2": "\u01EB", "3": "\u02C0", "'": "\u0313"};
    var keys = ["Ts", "ts", "1", "2", "A", "a", "d", "D", "e", "E", "t", "T", "S", "s", "H", "h", "K", "k", "G", "i", "g", "J", "j", "n", "N", "M", "m", "r", "R", "w", "W", "y", "Y", "u", "o", "O", "U", "3", "'"];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();
waldayu.transducers["g2013_to_display"] = (function() {
    var correspondences = {"w'": "'w", "aa": "aa", "ee": "ee", "gy": "gy", "ii": "ii", "n": "n", "xw": "xw", "m'": "'m", "k'": "k'", "kw'": "kw'", "'": "'", "g_": "g\u0331", "ts": "ts", "x_": "x\u0331", "u": "u", "k_'": "k\u0331'", "t": "t", "oo": "oo", "gw": "gw", "ky'": "ky'", "y'": "'y", "hl": "hl", "x": "x", "k_": "k\u0331", "a": "a", "l'": "'l", "b": "b", "e": "e", "d": "d", "g": "g", "i": "i", "h": "h", "k": "k", "m": "m", "l": "l", "o": "o", "n'": "'n", "p": "p", "kw": "kw", "p'": "p'", "w": "w", "ts'": "ts'", "y": "y", "t'": "t'", "ky": "ky", "uu": "uu"};
    var keys = ["k\\_\\'", "kw\\'", "ky\\'", "ts\\'", "l\\'", "m\\'", "n\\'", "w\\'", "y\\'", "g\\_", "k\\_", "k\\'", "p\\'", "t\\'", "x\\_", "\\'", "aa", "ee", "gw", "gy", "hl", "ii", "kw", "ky", "oo", "ts", "uu", "xw", "a", "b", "d", "e", "g", "g", "h", "i", "k", "l", "m", "n", "n", "o", "p", "t", "u", "w", "x", "y"];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();
waldayu.transducers["norm"] = (function() {
    var correspondences = {"`": "'", "\u0320": "_", "\u0332": "_", "\u02ca": "'", "\u02cd": "_", "\u02bc": "'", "\u0331": "_", "\u02b9": "'", "\u0313": "'", "\u0312": "'", "\u0315": "'", "\u0314": "'", "\u2019": "'", "\u2018": "'", "\u031b": "'", "\u02bd": "'", "\u02bb": "'"};
    var keys = ["\\\u2019", "\\\u2018", "\\\u02ca", "\\`", "\\\u0312", "\\\u0313", "\\\u0314", "\\\u0315", "\\\u031b", "\\\u02bb", "\\\u02bc", "\\\u02bd", "\\\u02b9", "\\\u0331", "\\\u0332", "\\\u0320", "\\\u02cd"];
    var regex = new RegExp("(" + keys.join('|') + ")", 'g');
    return function(str) {
        return str.replace(regex, function(a,b) {
            return correspondences[a];
        });
    };
})();

/*Load the config information into a Javascript variable */
var config = {"L1":{"name":"Gitksan","underlying":"display_composite","compare":"compare_composite"},"L2":{"name":"English","underlying":"","compare":""},"department":"University of British Columbia Department of Linguistics","PI":["Henry Davis"],"developers":["Patrick Littell","Aidan Pine"],"lexicographers":["Aidan Pine","Avery Ozburn","Elise McClay","Katie Bicevskis","Kevin Dickie","Kyra BW","Michael David Schwan","Samuel Akinbo","T. J. Heins","Zoe Wang"]};

// We define some templates for slotting entry data into.



// What follows is the stuff that executes when the page is loaded
//$(document).ready(function() {  
    
    

    /* First we go through the dictionary and compute the other orthographic forms, both the ones the user will
    see and the ones we use internally */
    waldayu.orthographizeEntries(dataDict);
    
    
var entryID = function() {
    for (var i = 0; i<dataDict.fm2014.data.length;i++) { 
    dataDict.fm2014.data[i].entryID= parseInt("999" + i);
}
};

entryID();

 // Sort entries
var sorted = [];
    var sorting = function(){
       var toSorted = getAllEntries().sort(function(a,b) {
            return a.sorting_form[0].substring(0, 3) - b.sorting_form[0].substring(0, 3);
        });
        for (var i=100;i<146;i++){
                for (var j=0; j<toSorted.length; j++){
                    if(toSorted[j].sorting_form[0].substring(0,3) === i.toString()){
                        toSorted[j].firstWord = true;
                        break;
                    } 
                }
            };
        for (var i=0; i<toSorted.length; i++){
            sorted.push(toSorted[i]);
        }
        return sorted;
       };   
    
sorting();
var test = [];
 var themeTest = function() {
     for (var i = 0;i<dataDict.fm2014.data.length; i++) {
         if (dataDict.fm2014.data[i].theme === undefined){
                
            }
            else if (dataDict.fm2014.data[i].theme[0] === "test") {
                console.log(dataDict.fm2014.data[i])
                test.push(dataDict.fm2014.data[i]);
            }
            
        }
 }           
themeTest()    


    var startIndex = 0;
    /* A utility function used by the above when finding a word.  It finds the entry,
        injects it into a template, and inserts that template into the page. */
    function findEntry(word, dataResourceID) {
        if (!(dataResourceID in dataDict)) {
            $("#entryDivInner").html("ERROR: Cannot find data resource " + dataResourceID);
            return;
        }
        var entries = dataDict[dataResourceID]["data"];
        for (var i = 0; i < entries.length; i++) {
            if (entries[i]["word"] == word) {
                var result = waldayu.render("entry", entries[i]);
                $("#entryDivInner").html(result);
                return;
            }
        }
        $("#entryDivInner").html("Cannot find word " + word);
    }
    


//});



