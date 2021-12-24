const prisma = require('../../prisma/utils/prismaClient');
const { updateExistingRooms, getRoomByName } = require('../utils/rooms');

const getRooms = async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({
      select: {
        name: true,
        _count: {
          select: {
            users: true,
          },
        },
      },
    });
    res.status(200).send(rooms);
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await getRoomByName(req.params.roomName);
    res.status(200).send(room);
  } catch (err) {
    next(err);
  }
};

const createRoom = async (req, res, next) => {
  const { name } = req.body;
  const { user } = req;
  try {
    const room = await prisma.room.create({
      data: {
        name,
        users: {
          connect: {
            id: user.id,
          },
        },
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
    res.status(201).send(room);
    updateExistingRooms();
  } catch (err) {
    next(err);
  }
};

module.exports = { getRooms, getRoom, createRoom };
