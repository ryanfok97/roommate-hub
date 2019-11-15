const EventEmitter = require('events');

class Data {
    static addTrack(uri) {
        this.queue.push(uri);
    }

    static next() {
        this.lastPlayed = this.queue.shift();
        return this.lastPlayed;
    }

    static lastPlayed() {
        return this.lastPlayed;
    }
}

Data.queue = [];
Data.lastPlayed = null;

module.exports = Data;