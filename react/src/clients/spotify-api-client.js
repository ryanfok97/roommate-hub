async function search(query, callback) {
    const response = await fetch('http://localhost:3001/spotify/search?query=' + query, {
        accept: 'application/json'
    })
    .then(checkStatus)
    .then(parseJson)
    .then(callback)
    .catch((err) => {
        console.log(err);
    });
}

async function parseJson(res) {
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

const SpotifyApiClient = {
    search
};

export default SpotifyApiClient;