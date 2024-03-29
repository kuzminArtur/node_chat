const { prisma } = require('../../prisma');

const saveMessage = async (text, user, room) => {
  await prisma.message.create({
    data: {
      text,
      room: { connect: { id: room.id } },
      user: { connect: { id: user.id } },
    },
  });
};

module.exports = { saveMessage };
