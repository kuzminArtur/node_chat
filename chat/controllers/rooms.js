const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports.getRooms = async (req, res, next) => {
    const rooms = await prisma.room.findMany({
        select: {
            name: true
        }
    })
    res.json(rooms)
}

module.exports.createRoom = async (req, res, next) => {
    const { name } = req.body
    const result = await prisma.room.create({
        data: {
            name
        },
        select: {
            name: true
        }
    })
    res.json(result)
}