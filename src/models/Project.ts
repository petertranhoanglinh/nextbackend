import mongoose, { Schema, Document, models, model } from "mongoose";
export interface ProjectType extends Document {
  id: string;
  name: string;
  description?: string;
  createdBy: string; 
  members: string[]; 
  deadline?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
const ProjectSchema = new Schema<ProjectType>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: String, required: true },
    members: [{ type: String }], 
    deadline: Date,
  },
  {
    collection: "project",
    timestamps: true, 
  }
);
const Project = models.Project || model<ProjectType>("Project", ProjectSchema);
export default Project;
