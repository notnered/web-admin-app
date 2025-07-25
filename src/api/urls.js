const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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

router.post('/users', async (req, res) => {
    try {
        const body = req.body;
        if (!body){
            throw new Error('Request body is empty');
        }

        const { username, password, name } = body;
        if (!username || !password || !name ){
            throw new Error('Not all data provided');
        }

        const checkedUser = await Users.find({
            where: {
                username: username,
            }
        });
        if (checkedUser){
            throw new Error('User with that username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const splitName = name.split(' ');
        const user = await Users.create({
            username: username,
            password: hashedPassword,
            first_name: splitName[0],
            last_name: splitName[1],
        });
        console.log(body, user);
        res.status(200).send(user);
    } catch (err) {
        console.error(err);
        res.status(406).end();
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id', id);
        res.status(200).end();
    } catch (err) {
        console.error(err);
        res.status(400).end();
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
            }
        })
        if (!deletedUser){
            throw new Error('Cant find user with that id');
        }

        res.status(200).send(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(404).end();
    }
});

module.exports = router;
