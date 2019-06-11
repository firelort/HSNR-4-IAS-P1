var User = {

    ORGANIZER: 1,
    EXHIBITOR: 2,
    GUEST: 3


};
Object.freeze(User);

var ShapeTypes = {
    FREE: 0,
    RESERVED: 1,
    ACCEPTED: 2,
    PREOCCUPIED: 3
};
Object.freeze(ShapeTypes);


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}