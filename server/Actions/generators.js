function generateUuid() {
    // generate a short uuid
    return '_' + Math.random().toString(36).substr(2, 15);
};
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
    uuid: generateUuid,
    randomInt: getRandomInt,
}
