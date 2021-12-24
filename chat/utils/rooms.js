const prisma = require('../../prisma/utils/prismaClient');

let existingRooms;

const getAllRooms = async () => prisma.room.findMany();

const updateExistingRooms = () => {
  getAllRooms().then((rooms) => {
    existingRooms = rooms;
  });
};

const getExistingRooms = () => existingRooms;

const getRoomByName = async (name) => prisma.room.findUnique({
  where: {
    name,
  },
  select: {
    name: true,
    users: {
      select: {
        name: true,
      },
    },
  },
});

updateExistingRooms();

module.exports = { getExistingRooms, updateExistingRooms, getRoomByName };
