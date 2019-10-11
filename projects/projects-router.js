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

router.post('/', (req, res) => {
  const projectData = req.body;

  Projects.addProject(projectData)
  .then(newProject => {
    res.status(201).json(newProject);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new project' });
  });
});

router.post('/resources', (req, res) => {
  const resourceData = req.body;

  Projects.addResources(resourceData)
  .then(newResource => {
    res.status(201).json(newResource);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new resource' });
  });
});

router.post('/tasks', (req, res) => {
  const taskData = req.body;

  Projects.addTask(taskData)
  .then(newTask => {
    res.status(201).json(newTask);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new task' });
  });
});

router.get('/tasks', (req, res) => {
  Projects.findTasks()
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

module.exports = router;