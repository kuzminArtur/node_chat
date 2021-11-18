const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcryptjs');
const config = require('../../configs/appConfig');
const {generateToken, generateByRefresh} = require('../utils/tokenHandler');
const {RegistrationError} = require("../errorTypes/authErrors");


const prisma = new PrismaClient();

const createUser = async (req, res, next) => {
    const saltRounds = config.salt_rounds;
    const {name, password} = req.body;
    const isUserExist = await prisma.user.count({
        cursor: {
            name: name
        }
    });
    try {
        if (isUserExist) {
            throw new RegistrationError;
        }
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
    } catch
        (err) {
        next(err);
    }
}

const getUser = async (name, password) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                name: name,
            }
        });
        if (!user) {
            throw new Error("Пользователь не существует"); // Обработчик ошибок
        }
        const isLoginSuccess = await bcrypt.compare(password, user.password);
        if (!isLoginSuccess) {
            throw new Error("Имя пользователя и пароль не совпадают"); // Обработчик ошибок
        }
        return user;
    } catch (err) {
        throw new Error(err);
    }
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
    const token = await generateByRefresh(refresh);
    res.status(200).send(token);
}

module.exports = {createUser, loginUser, refreshToken};