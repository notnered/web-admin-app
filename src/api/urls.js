const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = process.env.JWT_SECRET;

const Users = require('../db/models/users');

// Test route

router.get('/', async (req, res) => {
    if (res.status(200)) {
        res.send('API status is OK');
    } else {
        console.log(res);
        res.send('API status is not OK');
    }
    res.end();
});

// Auth routes

router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        if (!body) {
            throw new Error('Request body is empty');
        }

        const { username, password } = body;
        if (!username || !password) {
            throw new Error('Not all data provided');
        }

        const userObject = await Users.findOne({
            where: {
                username: username,
            },
        });
        if (!userObject) {
            throw new Error('User not found');
        }

        // console.log('userObject', userObject);

        const checkPassword = await bcrypt.compare(
            password,
            userObject.password
        );
        if (!checkPassword) {
            throw new Error('Wrong password');
        }

        const token = jwt.sign(
            {
                id: userObject.id,
                username: userObject.username,
                role: userObject.role,
            },
            secret_key,
            {
                expiresIn: '4h',
            }
        );
        res.status(200).send(
            JSON.stringify({
                token: token,
            })
        );
    } catch (err) {
        console.error(err);
        res.status(404).send(`Error: ${err}`);
    }
});

// router.post('/jwt-payload', async (req, res) => {
//     try {
//         const { token } = req.body;
//         const decodedToken = jwt.verify(token, secret_key);
//         console.log(decodedToken);
//         res.status(200).send();
//     } catch (err) {
//         console.error(err);
//         res.status(404).send(`Error: ${err}`);
//     }
// })

// CRUD routes

router.get('/users', async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).send(JSON.stringify(users));
    } catch (err) {
        console.error(err);
        res.status(404).send(`Error: ${err}`);
    }
    res.end();
});

router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            res.status(404).send('User not found');
        }

        res.status(200).send(JSON.stringify(user));
    } catch (err) {
        console.error(err);
        res.status(404).send(`Error: ${err}`);
    }
    res.end();
});

router.post('/users', async (req, res) => {
    try {
        const body = req.body;
        // console.log('key:', secret_key);
        if (!body) {
            throw new Error('Request body is empty');
        }

        // console.log(body);

        const { username, password, name, gender, birthdate } = body;
        if (!username || !password || !name) {
            throw new Error('Not all data provided');
        }

        const checkedUser = await Users.findOne({
            where: {
                username: username,
            },
        });
        if (checkedUser) {
            throw new Error('User with that username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const splitName = name.split(' ');
        const user = await Users.create({
            username: username,
            password: hashedPassword,
            first_name: splitName[0],
            last_name: splitName[1] ?? '',
            gender: gender,
            birthdate: new Date(birthdate).toISOString(),
        });
        // console.log('user created');
        // console.log(body, user);
        res.status(200).send(user);
    } catch (err) {
        console.error(err);
        res.status(406).end(`Error: ${err}`);
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // console.log('id', id);

        const user = await Users.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }

        const body = req.body;
        if (!body) {
            throw new Error('Request body is empty');
        }

        const { username, password, name, gender, birthdate } = body;
        if (!username || !password || !name) {
            throw new Error('Not all data provided');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const slicedName = name.split(' ');

        const updatedUser = await Users.update(
            {
                username: username,
                password: hashedPassword,
                first_name: slicedName[0],
                last_name: slicedName[1] ?? '',
                gender: gender,
                birthdate: new Date(birthdate).toISOString(),
            },
            {
                where: {
                    id: id,
                },
            }
        );

        // console.log(updatedUser);

        res.status(200).send(
            JSON.stringify({ Message: `User ${updatedUser} updated` })
        );
    } catch (err) {
        console.error(err);
        res.status(400).send(`Error: ${err}`);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error('No id founded');
        }

        // console.log(id);
        const deletedUser = await Users.destroy({
            where: {
                id: id,
            },
        });
        if (!deletedUser) {
            throw new Error('Cant find user with that id');
        }

        res.status(200).send(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(404).end(`Error: ${err}`);
    }
});

module.exports = router;
