var serverData = require('../server-data/data');

const getRoommates = () => {
    return serverData.roommates.roommates;
}

const handleAddRoommate = (newRoommate) => {
    serverData.roommates.addRoommate(newRoommate);
}

const handleRemoveRoommate = (index) => {
    serverData.roommates.removeRoommate(index);
}

const handleInOutButtonChange = (index, value) => {
    serverData.roommates.changeInOutValue(index, value);
}


module.exports = {
    getRoommates: () => getRoommates(),
    handleAddRoommate: (newRoommate) => handleAddRoommate(newRoommate),
    handleRemoveRoommate: (index) => handleRemoveRoommate(index),
    handleInOutButtonChange: (index, value) => handleInOutButtonChange(index, value)
}