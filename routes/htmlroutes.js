const path = require('path');
const router = require('express').Router();
const notes = require('../db/db.json')

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('/notes/:note_id', (req, res) => {
    if (req.params.note_id) {
      console.info(`${req.method} request received to get a single note`);
      const noteId = req.params.note_id;
      for (let i = 0; i < notes.length; i++) {
        const currentNote = notes[i];
        if (currentNote.note_id === noteId) {
          res.status(200).json(currentNote);
          return;
        }
      }
      res.status(404).send('Note not found');
    } else {
      res.status(400).send('Note ID not provided');
    }
  });

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;