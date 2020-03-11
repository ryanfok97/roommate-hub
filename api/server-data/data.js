var _ = require('lodash');
var spotifyApi = require('../controllers/spotify-api-controller');

class Data {}

/********************
 * SPOTIFY          *
 ********************/
Data.queue = [];
Data.users = [];
Data.lastPlayed = '';
Data.deviceId = '';
Data.isPlaying = false;

// obj contains username and spotify object to add to queue (track, album, or playlist)
Data.addToQueue = (obj) => {
    let toAdd;
    switch (obj.spotifyObject.type) {
        case 'track':
            toAdd = obj;
            Data.queue.push({
                user: obj.user,
                spotifyObject: obj.spotifyObject,
            });
            break;
        case 'album':
            spotifyApi.getAlbumTracks(obj.spotifyObject.id).then((albumTracks) => {
                toAdd = albumTracks.body.items.map((track) => {
                    return {
                        user: obj.user,
                        spotifyObject: track,
                    };
                });
                Data.queue.push(...toAdd);
            });
            break;
        case 'playlist':
            spotifyApi.getPlaylistTracks(obj.spotifyObject.id).then((playlistTracks) => {
                toAdd = playlistTracks.body.items.map((track) => {
                    return {
                        user: obj.user,
                        spotifyObject: track,
                    };
                });
                Data.queue.push(...toAdd);
            });
            break;
    }
}

Data.removeFromQueue = (index) => {
    return Data.queue.splice(index, 1);
}

Data.next = () => {
    if (Data.hasNext()) {
        Data.lastPlayed = Data.queue.shift().spotifyObject;
        return Data.lastPlayed;
    }
}

Data.hasNext = () => {
    return Data.queue.length > 0;
}

Data.lastPlayed = () => {
    return Data.lastPlayed.uri;
}

Data.setIsPlaying = (isPlaying) => {
    return Data.isPlaying = isPlaying;
}

Data.addUser = (user) => {
    Data.users.push(user);
}

Data.removeUser = (user) => {
    const idx = Data.users.indexOf(user);
    Data.users.splice(idx, 1);
}

/********************
 * ROOMMATES        *
 ********************/
Data.roommates = [
    {
        name: 'Brandon',
        value: 1
    },
    {
        name: 'Kadison',
        value: 1
    },
    {
        name: 'Ryan',
        value: 1
    },
    {
        name: 'Steven',
        value: 1
    }
];

Data.addRoommate = (newRoommate) => {
    Data.roommates.push(newRoommate);
    Data.roommates.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0;
        }
    });
}

Data.removeRoommate = (index) => {
    Data.roommates.splice(index, 1);
}

Data.changeInOutValue = (index, value) => {
    Data.roommates[index].value = value;
}

/********************
 * STICKY NOTE      *
 ********************/
Data.layouts = {}
Data.notes = [];

Data.addStickyNote = (i) => {
    Data.notes.push({
        i: i,
        x: 0,
        y: 0,
        w: 2,
        h: 4
    });
}

Data.changeLayouts = (layouts) => {
    _.merge(Data.layouts, layouts);
}

Data.deleteStickyNote = (note) => {
    Data.notes.splice(note, 1);
}

Data.editStickyNoteTitle = (note, title) => {
    Data.notes[note].title = title;
}

Data.editStickyNoteText = (note, text) => {
    Data.notes[note].text = text;
}

module.exports = {
    spotify: {
        queue: Data.queue,
        users: Data.users,
        lastPlayed: Data.lastPlayed,
        deviceId: Data.deviceId, 
        isPlaying: Data.isPlaying,
        addToQueue: (obj) => Data.addToQueue(obj),
        removeFromQueue: (index) => Data.removeFromQueue(index),
        next: () => Data.next(),
        hasNext: () => Data.hasNext(),
        lastPlayed: () => Data.lastPlayed(),
        setIsPlaying: (isPlaying) => Data.setIsPlaying(isPlaying),
        addUser: (user) => Data.addUser(user),
        removeUser: (user) => Data.removeUser(user)
    },
    stickyNote: {
        notes: Data.notes,
        layouts: Data.layouts,
        addStickyNote: (i) => Data.addStickyNote(i),
        changeLayouts: (layouts) => Data.changeLayouts(layouts),
        deleteStickyNote: (note) => Data.deleteStickyNote(note),
        editStickyNoteTitle: (note, title) => Data.editStickyNoteTitle(note, title),
        editStickyNoteText: (note, text) => Data.editStickyNoteText(note, text)
    },
    roommates: {
        roommates: Data.roommates,
        addRoommate: (newRoommate) => Data.addRoommate(newRoommate),
        removeRoommate: (index) => Data.removeRoommate(index),
        changeInOutValue: (index, value) => Data.changeInOutValue(index, value)
    }
};