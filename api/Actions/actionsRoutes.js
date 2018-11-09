const express = require('express');
const actionsDB = require('../../data/helpers/actionModel.js')

const router = express.Router();

const getAllActions = (req, res) => {
  actionsDB.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: `Internal server error. Could not get actions`, error });
    });
}

const getAction = (req, res) => {
  actinosDB.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not get actions`, error });
    });
}

const addAction = (req, res) => {
  process.stdout.write(req.body.name + '\n');
  const { name } = req.body;
  actionsDB.insert({ name })
    .then(id => {
      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not add action`, error });
    });
}

const deleteAction = (req, res) => {
  actionsDB.remove(req.params.id)
    .then(actionsDeleted => {
      if (actionsDeleted > 0) {
        res.status(200).json(actionsDeleted);
      } else {
        res.status(400).json({ message: `action not deleted because they do not exist`, actionsDeleted});
      }
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not delete action`, error });
    });

}

const updateAction = (req, res) => {
  if (req.body.name === undefined) {
    res.status(400).json({ errorMessage: "Please provide a name for an action." });
    return;
  }
  actionsDB.update(req.params.id, req.body)
    .then(actionsUpdated => {
      if (actionsUpdated > 0) {
        res.status(200).json({ message: `${actionsUpdated} actions updated`});
      } else {
        res.status(404).json({ message: 'error updating action', error})
      } 
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not update action`, error });
    });

}

const echo = (req, res) => {
  res.status(201).json({
    message: 'hey this endpoint work!',
    params: req.params,
    query: (req.query ? req.query : ''),
    body: req.body
  });
}

// endpoints

// bind action endpoints
router.get('/', getAllActions);
router.get('/:id', getAction);
router.post('/', addAction);
router.delete('/:id', deleteAction);
router.put('/:id', updateAction);






module.exports = router;
