// Sort

var scroll = ['a', 'aa', 'b', 'd', 'e', 'ee', 'g', 'g̱', 'h', 'hl', 'i', 'ii', 'j', 'k', "k'", 'ḵ', "ḵ'", 'l', "'l", 'm', "'m", 'n', "'n", 'o', 'oo', 'p', "p'", 's', 't', "t'", 'ts', "ts'", 'u', 'uu', 'w', "'w", 'x', 'x̱', 'y', "'y"];


// Sort data into alphabetized objectlists

    //Set Vars
var letterListList = [];
var sorted = [];
//console.log(getAllEntries().length);

    // Loop through letters in scroll according to how long their length is. Search longer (ex. "ts'") before shorter (ex. "t")
function sortByChar(scroll, data, charLength) {
for (var i = 0; i < scroll.length; i++) {
    
    // For each letter, create a list to house entry objects
    var letterList = [];
    
    // If the length of a letter in the scroll list matches the number passed through the sortByChar function then:
    if (scroll[i].length === charLength) {
        
        // For each object in the data    
        for (var j = 0; j < data.length; j++) {
            
        // If when you chop off the first x number of characters in the display form, where x is the number passed to the function, that string is equal to the current string in the alphabet list :
            if(data[j].display_form[0].slice(0,scroll[i].length) === scroll[i]){
                
        // Push that object into the list created for that letter, add letterIndex key/value and get the index of that entry in the data array
            data[j].letterIndex = i;    
            letterList.push(data[j]);
            var jIndex = data.indexOf(data[j]);
                
        // If the index of the current entry isn't a negative number, then remove it from the data (so it won't be added again under a different letter, and roll back the index to account for the deleted entry
            if (jIndex > -1) {
                data.splice(jIndex, 1);
                j = j-1;
            }
        }
    };
    letterListList.push(letterList);
}
};
};

// Combine individual letter arrays into one array, and add firstletter keyvalue
function combineLists (lists) {
for (var i = 0; i < lists.length; i++) {
    for (var j = 0; j < lists[i].length; j++) {
        sorted.push(lists[i][j]);
        lists[i][0].firstWord = true;
    };
};
};

// Sort according to letterIndex value
var sortedObjs = [];
function sortObjects (data) {
    for (var i=0; i<scroll.length; i++) {
        for (var j=0; j<data.length;j++) {
            if (data[j].letterIndex === i) {
                sortedObjs.push(data[j]);
            }
        };
    };
};
        



// Execute functions
sortByChar(scroll, getAllEntries(), 3);
sortByChar(scroll, getAllEntries(), 2);
sortByChar(scroll, getAllEntries(), 1);
combineLists(letterListList);
sortObjects(sorted);