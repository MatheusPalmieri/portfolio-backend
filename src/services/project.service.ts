import { ProjectStatusEnum } from '../interfaces/project';
import ApiError from '../utils/ApiError';
import { generateRandomString } from '../utils/generateRandomString';

const status = require('http-status');
const { Project } = require('../models');
const projectValidation = require('../validations/project.validation');

const getProjects = async (): Promise<Document | null> => {
  const projects = await Project.find(
    {},
    {
      description: 0,
      status: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    },
  );
  return projects;
};

const createProject = async (project: {
  name: string;
  description: string;
  slug?: string;
}): Promise<Document | null> => {
  const slug = projectValidation.slugify(project.name);
  project.slug = slug;

  let uniqueSlugFound = false;

  while (!uniqueSlugFound) {
    const slugExist = await Project.findOne({ slug: project.slug });

    if (slugExist) {
      project.slug = `mp${generateRandomString(2)}-${project.slug}`;
    } else {
      uniqueSlugFound = true;
    }
  }

  const projectCreated = await Project.create(project);
  return projectCreated;
};

const getProject = async (id: string): Promise<Document | null> => {
  const project = await Project.findById(id);
  return project;
};

const updateProject = async (
  id: string,
  project: { name?: string; description?: string },
): Promise<Document | null> => {
  const projectUpdated = await Project.findByIdAndUpdate(id, project, { new: true });

  if (!projectUpdated) {
    throw new ApiError(status.BAD_REQUEST, 'Projeto não encontrado.');
  }

  return projectUpdated;
};

const deleteProject = async (id: string): Promise<Document | null> => {
  const projectDeleted = await Project.findOneAndUpdate(
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

const getProjectBySlug = async (slug: string): Promise<Document | null> => {
  const project = await Project.findOne({ slug });
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
