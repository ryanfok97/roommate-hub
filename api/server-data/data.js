var spotifyApi = require('../controllers/spotify-api-controller');

class Data {
    // obj contains username and spotify object to add to queue (track, album, or playlist)
    static async addToQueue(obj) {
        let toAdd;
        switch (obj.spotifyObject.type) {
            case 'track':
                toAdd = obj;
                this.queue.push({
                    user: obj.user,
                    track: obj.spotifyObject,
                });
                break;
            case 'album':
                const albumTracks = await spotifyApi.getAlbumTracks(obj.spotifyObject.id);
                toAdd = albumTracks.body.items.map((track) => {
                    return {
                        user: obj.user,
                        track: track,
                    };
                });
                this.queue.push(...toAdd);
                break;
            case 'playlist':
                const playlistTracks = await spotifyApi.getPlaylistTracks(spotifyObject.id);
                toAdd = playlistTracks.body.items.map((track) => {
                    return {
                        user: obj.user,
                        track: track,
                    };
                });
                this.queue.push(...toAdd);
                break;
        }
    }

    static next() {
        this.lastPlayed = this.queue.shift().track;
        return this.lastPlayed;
    }

    static hasNext() {
        return this.queue.length > 0;
    }

    static lastPlayed() {
        return this.lastPlayed.uri;
    }

    static setIsPlaying(isPlaying) {
        return this.isPlaying = isPlaying;
    }
    
    static addUser(user) {
        this.users.push(user);
    }

    static removeUser(user) {
        const idx = this.users.indexOf(user);
        this.users.splice(idx, 1);
    }
}

Data.queue = [];
Data.users = [];
Data.lastPlayed = '';
Data.deviceId = '';
Data.isPlaying = false;

module.exports = Data;