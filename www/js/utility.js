if(typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}


function makeLinkSafe(entryID) {
    return entryID.replace(" ","+");
}

var allEntries = [];
function getAllEntries() {
    if (allEntries.length > 0) {
        return allEntries;
    }
    
    $.each(dataDict, function(resourceID, manifest) {
        $.each(manifest["data"], function(i, entry) {
            entry["source_id"] = resourceID;
            if ("template" in manifest) {
                entry["template"] = manifest["template"];
            }
            allEntries.push(entry);
        });
    });
    return allEntries;
}
