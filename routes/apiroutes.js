const path = require('path');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const router = require('express').Router();
const fs = require('fs')
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
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully!`);
    } else {
      res.error('Error');
    }
  });


router.get('/notes/:note_id', (req, res) => {
    const result = req.params.note_id;
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.delete('/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id !== noteId);
        writeToFile('./db/db.json', result);
        res.json(`Item ${noteId} has been deleted`);
      });
  });


module.exports = router;