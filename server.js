const express = require('express');

const ProjectsRouter = require('./projects/projects-router');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectsRouter);

server.get('/', (req, res) => {
    res.json(`index is working`);
});

module.exports = server;