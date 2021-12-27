const { LoginError } = require('../errorTypes/authErrors');
const { prisma } = require('../../prisma');

const getUser = async (name) => {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  });
  if (!user) {
    throw new LoginError('User not exist');
  }
  return user;
};

module.exports = { getUser };
