const path = require('path');
const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('Landing Page')
});

router.get('/api/notes', (req, res) => {
    res.ReadFile('db.json')
});


//router.post

router.post('/api/notes', (req, res) => {
    res.appendFile('db.json')
})

//router.delete

router.delete('/api/notes/:id', (req, res) => {
    res.send(`Delete User with ID ${req.params.id}`)
})

router.param("id", (req, res, next, id) => {
    console.log(id)
});


module.exports = router;