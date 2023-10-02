import { model, Schema } from 'mongoose';
import { ProjectStatusEnum } from '../interfaces/project';

const projectSchema = new Schema(
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

export const Project = model('Project', projectSchema);

module.exports = Project;
