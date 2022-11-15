const path = require('path');
const router = require('express').Router();
const fs = require('fs')


router.get('/', (req, res) => {
    res.send('Landing Page')
});

router.get('/notes', (req, res) => {
    res.readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))('db.json')
    );
});


//router.post

router.post('/notes', (req, res) => {
    res.appendFile('db.json')
})

//router.delete

router.delete('/notes/:id', (req, res) => {
    res.send(`Delete User with ID ${req.params.id}`)
})

router.param("id", (req, res, next, id) => {
    console.log(id)
});


module.exports = router;