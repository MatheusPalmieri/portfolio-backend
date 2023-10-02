import { Request, Response } from 'express';
import Logger from '../../config/logger';

const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

// Projects Frontend
const getProjects = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await projectService.getProjects();
    res.status(200).json(result);
  } catch (error) {
    Logger.error('Erro ao buscar projetos:', error);
    res.status(500).json({ error, message: 'Erro ao buscar projetos.' });
  }
});

const createProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await projectService.createProject(req.body);
    res.status(201).json(result);
  } catch (error) {
    Logger.error('Erro ao criar projeto:', error);
    res.status(500).json({ error, message: 'Erro ao criar projeto.' });
  }
});

const getProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await projectService.getProject(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    Logger.error('Erro ao buscar projeto desejado:', error);
    res.status(500).json({ error, message: 'Erro ao buscar projeto.' });
  }
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await projectService.updateProject(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    Logger.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ error, message: 'Erro ao atualizar projeto.' });
  }
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await projectService.deleteProject(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    Logger.error('Erro ao deletar projeto:', error);
    res.status(500).json({ error, message: 'Erro ao deletar projeto.' });
  }
});

// Get event by slug
const getProjectBySlug = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await projectService.getProjectBySlug(req.params.slug);
    res.status(200).json(result);
  } catch (error) {
    Logger.error('Erro ao buscar projeto desejado por:', error);
    res.status(500).json({ error, message: 'Erro ao buscar projeto.' });
  }
});

module.exports = {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjectBySlug,
};
