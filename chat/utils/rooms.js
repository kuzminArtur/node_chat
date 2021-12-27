const { prisma } = require('../../prisma');

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

const getRoomFromReq = (req) => {
  const roomName = req.url.split('/').at(-1);
  return existingRooms.find((room) => room.name === roomName);
};

updateExistingRooms();

module.exports = {
  getExistingRooms, updateExistingRooms, getRoomByName, getRoomFromReq,
};
