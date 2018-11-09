const express = require('express');
const projectDB = require('../../data/helpers/projectModel.js')

const router = express.Router();



/*
 * getAllProjects
 * GET - /api/projects 	
 * Returns an array of all the project objects contained in the database.
 * 
  * */
 const getAllProjects = (req, res, next) => {
  projectDB.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ 
          message: "The projects could not be retrieved." 
        });
    })
}

/* 
 * getProjectById 
 *
 * GET - /api/projects/:id
 * Returns the project object with the specified id.
 * 
  * */
const getProjectById = (req, res, next) => {
  projectDB.get(req.params.id)
    .then(project => {
      console.log(project)
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ 
          message: `The project with id: ${req.params.id} does not exist`
        });      
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ 
          message: `The project with id: ${req.params.id} could not be retrieved.`
        });
    })
}

/*
 * deleteProject
 * DELETE - /api/projects/:id
 * Removes the project with the specified id and returns the deleted project. 
 *
  * */
const deleteProject =  async (req, res, next) => {
  const { id } = req.params;
  try {
    const recordsDeleted = await projectDB.remove(id);
    if (recordsDeleted > 0) {
      res.status(200).json(recordsDeleted);
    } else {
      res.status(404).json({ 
        message: `Could not delete record because it does not exist`
      })
    }
  } catch (error) {
    res.status(500).json({ message: "The project could not be removed", error })
  }
}

/*
 * addNewProject 
 *
 * POST - /api/projects  
 * Creates a project using the information sent inside the request body. 
 *
  * */
const addNewProject = (req, res, next) => {
  if (req.body.name === undefined || req.body.description === undefined) {
    res.status(400).json({ errorMessage: "Please provide title and description for the project." });
    return;
  }

  projectDB.insert(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "There was an error while saving the project to the database" });
    })
}

/*
 * updateProject
 *
 * Updates the project with the specified id using data from the request body. 
 * Returns the modified document, NOT the original.
 *
  * */
const updateProject = (req, res) => {
  if (req.params.id === undefined) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the project." });
    return;
  }

  projectDB.update(req.params.id, req.body)
    .then(count => {
      console.log(count)
      res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json({ error: "The project information could not be modified." })
  })
}

const getProjectActions = (req, res, next) => {
  const { id } = req.params;
  projectDB.getProjectActions(id)
    .then(actions => {
      res.status(201).json(actions);
    })
    .catch(error => {
      res.status(500).json({ message: `Could not find projects actions with ${id}`, error });
    });
}

// bind project endpoints
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', addNewProject);
router.delete('/:id', deleteProject);
router.put('/:id', updateProject);

router.get('/:id/actions', getProjectActions);

module.exports = router;
