import { model, Schema } from 'mongoose';
import { ProjectStatusEnum } from '../interfaces/project';

const projectFrontendSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      default: ProjectStatusEnum.ACTIVE,
      enum: ProjectStatusEnum,
    },
    slug: { type: String, required: true, trim: true, unique: true },
    deletedAt: { type: Date, required: false },
  },
  {
    timestamps: true,
  },
);

export const ProjectFrontend = model('ProjectFrontend', projectFrontendSchema);

module.exports = ProjectFrontend;
