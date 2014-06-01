function Transport(song, bpm) {
    this.song = song;
    this.playstart = Utils.getNow() / 1000.0;
    this.playing = false;
	this.offset = -0.0;
    this.pos = 0.0;
    this.bpm = bpm || 120;
	var hits_per_beat = 4.0;
	
	console.log("Creating transport object with ", song, bpm);

    var now = function () {
        return Utils.getNow() / 1000.0;
    }

    this.getPos = function () {
        if (this.song === undefined) {
            if (!this.playing) {
                return this.pos;
            }

            return now() - this.playstart;
        }

        return song.currentTime;
    }

    this.getBeat = function () {
        // seconds / beats_per_second
        return -this.offset+(this.getPos() * (this.bpm/60.0));
    }

    this.play = function() {
        this.playing = true; 
        this.playstart = now() + this.pos;

        console.log("Playing song from ", this.getPos());

        // If there's no song set, just pretend we are playing.
        if (this.song === undefined) 
            return;

        song.play();
    }

    this.togglePlaying = function() {

        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }
	
	this.toggleMute = function() {
		if (song.volume == 0.0) {
			song.volume = 1.0;
		} else {
			song.volume = 0.0
		}
	}
	
	this.getSong = function() {
		return this.song;
	}
	
	this.isPlaying = function() {
		return this.playing;
	}

    this.playstart = this.getPos();
}

Transport.prototype.pause = function() {
    this.playing = false;

        if (this.song === undefined)
            return;

    this.song.pause();
}

Transport.prototype.seek = function(seconds) {
	var oldstate = this.playing;
	this.pause();
	this.song.currentTime = Math.min(seconds, this.song.duration-0.001);
	
	if (oldstate) 
		this.play();
	
	return this.getPos();
}
