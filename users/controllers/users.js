const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');


const prisma = new PrismaClient();


 const createUser = async (req, res, next) => {
    const saltRounds = 10;
    const { name, password } = req.body;
    try {
        const hash = await bcrypt.hashSync(password, saltRounds);
        const user = await prisma.user.create({
            data: {
                name,
                password: hash
            },
            select: {
                name: true
            }
        });
        res.status(201).send(user);
    } catch (err) {
        next(err);
    }
}

module.exports = { createUser }