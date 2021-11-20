const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcryptjs');
const config = require('../../configs/appConfig');
const {generateToken, generateByRefresh} = require('../utils/tokenHandler');
const {LoginError, RegistrationError, TokenError} = require("../errorTypes/authErrors");


const prisma = new PrismaClient();

const createUser = async (req, res, next) => {
    const saltRounds = config.salt_rounds;
    const {name, password} = req.body;
    const isUserExist = await prisma.user.count({
        cursor: {
            name: name
        }
    });
    if (isUserExist) {
        next(new RegistrationError);
        return;
    }
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        const user = await prisma.user.create({
            data: {
                name: name,
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

const getUser = async (name, password) => {
    const user = await prisma.user.findUnique({
        where: {
            name: name,
        }
    });
    if (!user) {
        throw new LoginError('User not exist');
    }
    const isLoginSuccess = await bcrypt.compare(password, user.password);
    if (!isLoginSuccess) {
        throw new LoginError;
    }
    return user;
}

const loginUser = async (req, res, next) => {
    const {name, password} = req.body;
    try {
        const user = await getUser(name, password);
        const token = await generateToken(user.name);
        res.status(200).send(token);
    } catch (err) {
        next(err);
    }
}

const refreshToken = async (req, res, next) => {
    const {refresh} = req.body;
    try {
        const token = await generateByRefresh(refresh);
        res.status(200).send(token);
    } catch (err) {
        next(new TokenError);
    }

}

module.exports = {createUser, loginUser, refreshToken};