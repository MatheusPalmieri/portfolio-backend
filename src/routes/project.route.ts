import { Router } from 'express';
import { validate } from '../middleware/handleValidation';
const projectValidation = require('../validations/project.validation');

// Controllers
const projectController = require('../controllers/project.controller');

const router = Router();

// Projects Frontend
router
  .route('/frontend')
  .get(projectController.getProjects)
  .post(validate, projectValidation.createProject, projectController.createProject);

router
  .route('/frontend/:id')
  .get(projectController.getProject)
  .patch(validate, projectValidation.updateProject, projectController.updateProject)
  .delete(projectController.deleteProject);

// Get event by slug
router.route('/frontend/slug/:slug').get(projectController.getProjectBySlug);

// router.route('/').get(eventController.getEvents);

// Projects Backend
router.route('/backend').get((req, res) => {
  res.status(200).send('Hello from backend!');
});

module.exports = router;
