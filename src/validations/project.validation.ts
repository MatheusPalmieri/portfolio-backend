import { ValidationChain, body } from 'express-validator';

const createProject: ValidationChain[] = [
  body('name')
    .isString()
    .withMessage('Nome é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('Nome deve ter no mínimo 3 caracteres.'),
  body('description').isString().withMessage('Descrição é obrigatória.'),
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
