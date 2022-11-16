const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const router = require('express').Router();
const uuid = require('../helpers/uuid');
const notes = require('../db/db.json')


router.get('/notes', (req, res) => {
     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    });


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