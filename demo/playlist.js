
function PlaylistEntry(effect, begin, end, params, title) {
    this.effect = effect ;
    this.begin = begin;
    this.end = end;
    this.params = params || {};
    this.title = title || "untitled";
}

function Playlist (data) {
   /* Each timeline entry an object of the form
    *
    * { 
    *   effect: "red"                   // string identifier of the effect to show
    *   begin : 0.5,                    // entry begin time in seconds 
    *   end : 10.42123,                 // end time in seconds
    *   [title : "entryname"],          // optional title for UI
    * }
    *
    */

    this.entries = [];
    var self = this;
    
    if (data === undefined) {
        return;
    }

    data.entries.map(function (entry) {
        var e = $.extend({title : "untitled"}, entry);
        self.entries.push(new PlaylistEntry(e.effect, e.begin, e.end, e.params, e.title));
    });
}

Playlist.prototype.add = function (entry) {
    this.entries.push(entry);
    this.entries.sort(function (a,b) {
        if (a.begin < b.begin) 
            return -1;
        if (a.begin > b.begin) 
            return 1;

        return 0;
    });
}

/* 
 * Returns the playlist entry in the current position on the timeline
 * time:    The time in seconds.
 */
Playlist.prototype.getCurrent = function (time) {
    var candidates = [];

    for (var i=0;i<this.entries.length;i++) {
        var entry = this.entries[i];

        if (time < entry.begin || time > entry.end)
            continue;
         
        candidates.push(entry);
    }

    if (candidates.length == 0) {
        return null;
    }

    // TODO choose the entry with the highest priority
    return candidates[0];
}
