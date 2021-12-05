const prisma = require('../../prisma/utils/prismaClient');

let existingRooms;

const getAllRooms = async () => {
    return await prisma.room.findMany({
        select: {
            name: true
        }
    });
}

const updateExistingRooms = () => {
    getAllRooms().then((rooms) => {
        existingRooms = rooms.map(room => room.name);
    });
}

const getRooms = () => {
    return existingRooms;
}

updateExistingRooms();

module.exports = {getRooms, updateExistingRooms};