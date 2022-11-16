// boilerplate

const path = require('path');
const router = require('express').Router();

// get for /notes to route to notes.html

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// get for everything else to route to index.html

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;