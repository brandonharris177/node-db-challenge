const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.get('/resources', (req, res) => {
  Projects.findResources()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resources' });
  });
});

// router.get('/:id/resources', (req, res) => {
//   const { id } = req.params;

//   Projects.findResources(id)
//   .then(resources => {
//     console.log(resources)
//     if (resources.length) {
//       res.json(resources);
//     } else {
//       res.status(404).json({ message: 'Could not find resources for given recipe' })
//     }
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Failed to get resources' });
//   });
// });

// router.get('/:id/instructions', (req, res) => {
//   const { id } = req.params;

//   Projects.findInstructions(id)
//   .then(instructions => {
//     console.log(instructions)
//     if (instructions.length) {
//       res.json(instructions);
//     } else {
//       res.status(404).json({ message: 'Could not find instructions for given recipe' })
//     }
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Failed to get instructions' });
//   });
// });


module.exports = router;