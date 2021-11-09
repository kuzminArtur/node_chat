const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.getRooms = async (req, res, next) => {
    try {
        const rooms = await prisma.room.findMany({
            select: {
                name: true,
                users: true
            }
        })
        res.status(200).send(rooms);
    } catch (err) {
        next(err);
    }

}

module.exports.createRoom = async (req, res, next) => {
    const { name } = req.body
    try {
        const room = await prisma.room.create({
            data: {
                name
            },
            select: {
                name: true,
                users: true
            }
        });
        res.status(201).send(room);
    }
    catch (err) {
        next(err);
    }
}