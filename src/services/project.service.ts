import { ProjectStatusEnum } from '../interfaces/project';
import ApiError from '../utils/ApiError';

const status = require('http-status');
const { ProjectFrontend } = require('../models');
const projectValidation = require('../validations/project.validation');

// Projects Frontend
const getProjects = async (): Promise<Document | null> => {
  const projects = await ProjectFrontend.find();
  return projects;
};

const createProject = async (project: {
  name: string;
  description: string;
  slug: null;
}): Promise<Document | null> => {
  const slug = projectValidation.slugify(project.name);
  project.slug = slug;

  const projectCreated = await ProjectFrontend.create(project);
  return projectCreated;
};

const getProject = async (id: string): Promise<Document | null> => {
  const project = await ProjectFrontend.findById(id);
  return project;
};

const updateProject = async (
  id: string,
  project: { name?: string; description?: string },
): Promise<Document | null> => {
  const projectUpdated = await ProjectFrontend.findByIdAndUpdate(id, project, { new: true });

  if (!projectUpdated) {
    throw new ApiError(status.BAD_REQUEST, 'Projeto não encontrado.');
  }

  return projectUpdated;
};

const deleteProject = async (id: string): Promise<Document | null> => {
  const projectDeleted = await ProjectFrontend.findOneAndUpdate(
    { _id: id, status: { $nin: [ProjectStatusEnum.DELETED] } },
    {
      status: ProjectStatusEnum.DELETED,
      deletedAt: Date.now(),
    },
    { new: true },
  );

  if (!projectDeleted) {
    throw new ApiError(status.BAD_REQUEST, 'Projeto não encontrado.');
  }

  return projectDeleted;
};

// Get event by slug
const getProjectBySlug = async (slug: string): Promise<Document | null> => {
  const project = await ProjectFrontend.findOne({ slug });
  return project;
};

module.exports = {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjectBySlug,
};
