var services = angular.module('starter.services', [])

services.factory('Language', function() {
  // Here is where you can change the name, and alphabet
    
    // Change the text between the quotation marks to change your language name
    var languageName = "ʔayʔaǰuθəm";

    // Change the letters here to change your alphabet. Be sure to include unicode characters in the format \u0331
    var lettersInLanguage = ["\u0294", "a", "\u010D", "e", "\u025B", "\u0259", "g", "h", "i", "\u0269", "j\u030C", "k", "k\u02B7", "k\u0313", "k\u0313\u02B7", "l", "l\u0313", "\u026C", "\u019B", "\u019B\u0313", "m", "m\u0313", "n", "n\u0313", "o", "p", "p\u0313", "q", "q\u0313", "q\u02B7", "q\u0313\u02B7", "s", "\u0161", "t", "t\u0313", "t\u0313\u01DBF", "\u0x3B8", "u", "\u028A", "w", "w\u0313", "x", "x\u02B7", "\u03C7", "\u03C7\u02B7", "y", "y\u0313"];
    
    var optionalField = "Plural Form";
    
    return {
    name: function() {
      return languageName;
    },
    letters: function() {
      return lettersInLanguage;
    },
    optional: function() {
        return optionalField;
    }
  };
});
