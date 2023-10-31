import { ValidationChain, body } from 'express-validator';
import { ProjectCategoryEnum } from '../interfaces/project';

const createProject: ValidationChain[] = [
  body('name')
    .isString()
    .withMessage('Nome é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('Nome deve ter no mínimo 3 caracteres.'),

  body('about')
    .isString()
    .withMessage('Sobre é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('Sobre deve ter no mínimo 3 caracteres.'),

  body('description')
    .isString()
    .withMessage('Descrição é obrigatória.')
    .isLength({ min: 3 })
    .withMessage('Descrição deve ter no mínimo 3 caracteres.'),

  body('resources.banner').isURL().withMessage('Banner é obrigatório.'),
  body('resources.logo').isURL().withMessage('Logo é obrigatório.'),
  body('resources.video').isURL().withMessage('Video é obrigatório.'),

  body('category')
    .custom((value) => {
      if (!(value in ProjectCategoryEnum)) {
        throw new Error('Categoria inválida.');
      }
      return true;
    })
    .withMessage('Categoria é inválida.'),

  body('technologies').isArray({ min: 1, max: 10 }).withMessage('Tecnologias é obrigatório.'),

  body('links.repository').isURL().withMessage('Repositório é obrigatório.'),
  body('links.website').isURL().withMessage('Repositório é obrigatório.'),

  body('isHighlighted').isBoolean().withMessage('Destaque é obrigatório.'),
];

const getProjectById: ValidationChain[] = [body('id').isObject().withMessage('Id é obrigatório.')];

const getProjectBySlug: ValidationChain[] = [
  body('slug').isString().withMessage('Slug é obrigatório.'),
];

const updateProject: ValidationChain[] = [
  body('name')
    .optional()
    .isString()
    .withMessage('Nome é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('Nome deve ter no mínimo 3 caracteres.'),
  body('description').optional().isString().withMessage('Descrição é obrigatória.'),
];

const deleteProject: ValidationChain[] = [body('id').isObject().withMessage('Id é obrigatório.')];

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '');
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  getProjectBySlug,
  slugify,
};
