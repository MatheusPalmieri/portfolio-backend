import { Router } from 'express';
import { validate } from '../middleware/handleValidation';
const projectValidation = require('../validations/project.validation');

// Controllers
const projectController = require('../controllers/project.controller');

const router = Router();

router
  .route('/')
  .get(projectController.getProjects)
  .post(validate, projectValidation.createProject, projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(validate, projectValidation.updateProject, projectController.updateProject)
  .delete(projectController.deleteProject);

router.route('/slug/:slug').get(projectController.getProjectBySlug);

module.exports = router;
