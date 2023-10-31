import { model, Schema } from 'mongoose';
import { ProjectCategoryEnum, ProjectStatusEnum } from '../interfaces/project';

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    about: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    resources: {
      banner: { type: String, required: true, trim: true },
      logo: { type: String, required: true, trim: true },
      video: { type: String, required: false, trim: true },
    },
    category: { type: String, required: true, enum: ProjectCategoryEnum },
    technologies: { type: [String], required: true, trim: true },
    links: {
      repository: { type: String, required: true, trim: true },
      website: { type: String, required: false, trim: true },
    },
    isHighlighted: { type: Boolean, required: true, default: false },
    status: {
      type: String,
      required: true,
      default: ProjectStatusEnum.ACTIVE,
      enum: ProjectStatusEnum,
    },
    deletedAt: { type: Date, required: false },
  },
  {
    timestamps: true,
  },
);

export const Project = model('Project', projectSchema);

module.exports = Project;
