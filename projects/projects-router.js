const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find()
  .then(projects => {
    // console.log(projects.completed)
    projects.forEach(project => {
      // console.log(project)
      if (project.completed === 1) {
        project.completed = true
        // console.log(project.completed)
      } else {
        project.completed = false
      }
    })
    res.status(200).json(projects)
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.get('/resources', (req, res) => {
  Projects.findResources()
  .then(resources => {
    res.json(resources);
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
    // console.log(projects.completed)
    tasks.forEach(task => {
      if (task.completed === 1) {
        task.completed = true
      } else {
        task.completed = false
      }
    })
    res.status(200).json(tasks)
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project' });
  });
});

router.delete('/resources/:id', (req, res) => {
  const { id } = req.params;

  Projects.removeResource(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find resource with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete resource' });
  });
});

router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  Projects.removeTask(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find resource with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete resource' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.findProjectById(id)
  .then(project => {
    if (project) {
      Projects.update(changes, id)
      .then(updatedProject => {
        res.json(updatedProject);
      });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update project' });
  });
});

router.put('resources/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.findResourceById(id)
  .then(resource => {
    if (resource) {
      Projects.updateResource(changes, id)
      .then(updatedResource => {
        res.json(updatedResource);
      });
    } else {
      res.status(404).json({ message: 'Could not find resource with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update resource' });
  });
});

router.put('tasks/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.findTaskById(id)
  .then(task => {
    if (task) {
      Projects.updateTask(changes, id)
      .then(updatedTask => {
        res.json(updatedTask);
      });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update task' });
  });
});

module.exports = router;