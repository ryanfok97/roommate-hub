const listEvents = (callback) => {
  fetch('http://localhost:3001/', {
    accept: 'application/json'
  })
  .then(checkStatus)
  .then(parseJson)
  .then(callback)
  .catch((err) => {
    console.log(err);
  });
}

const parseJson = (res) => {
  return res.json();
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
};

module.exports = {
  listEvents
};