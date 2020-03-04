const BASE_URL = "http://localhost:3001";

function search(query, callback) {
    fetch(BASE_URL + '/spotify/search?query=' + query, {
        accept: 'application/json'
    })
    .then(checkStatus)
    .then(parseJson)
    .then(callback)
    .catch((err) => {
        console.log(err);
    });
}

function resume() {
    fetch(BASE_URL + '/spotify/resume', {
        method: 'PUT'
    })
    .then(checkStatus)
    .catch((err) => {
        console.log(err);
    });
}

function pause() {
    fetch(BASE_URL + '/spotify/pause', {
        method: 'PUT'
    })
    .then(checkStatus)
    .catch((err) => {
        console.log(err);
    });
}

function next() {
    fetch(BASE_URL + '/spotify/next', {
        method: 'PUT'
    })
    .then(checkStatus)
    .catch((err) => {
        console.log(err);
    });
}

function getDevices(callback) {
    fetch(BASE_URL + '/spotify/devices', {
        method: 'GET'
    })
    .then(checkStatus)
    .then(parseJson)
    .then(callback)
    .catch((err) => {
        console.log(err);
    })
}

/**************************************************
 * HELPER METHODS                                 *
 **************************************************/

function parseJson(res) {
    return res.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
};

exports.search = (query, callback) => {
    search(query, callback);
}

exports.resume = () => {
    resume();
}

exports.pause = () => {
    pause();
}

exports.next = () => {
    next();
}

exports.getDevices = (callback) => {
    getDevices(callback);
}