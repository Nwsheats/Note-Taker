// boilerplate that grabs functions from fsUtils, uuid and db.json

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const router = require('express').Router();
const uuid = require('../helpers/uuid');
const notes = require('../db/db.json')


// get for /notes

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    });


// post for /notes (assigns the uuid)

router.post('/notes', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
            readAndAppend(newNote, './db/db.json');
            res.json(`Note added successfully!`);
        } else {
            res.error('Error');
    }
});

// get for /notes/:id, so you can search for specific id numbers

router.get('/notes/:id', (req, res) => {
    if (req.params.id) {
        console.info(`${req.method} request received to get a single note`);
        const noteId = req.params.id;
        for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.id === noteId) {
                res.status(200).json(currentNote);
            return;
        }
        }
            res.status(404).send('Note not found');
        } else {
            res.status(400).send('Note ID not provided');
        }
});

// delete for /notes:/id, it finds the data that needs to be deleted, then creates a new
// array without that item and uses the writeToFile function.

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
    const result = json.filter((note) => note.id !== noteId);
    writeToFile('./db/db.json', result);
    res.json(`Item ${noteId} has been deleted`);
    });
});


module.exports = router;