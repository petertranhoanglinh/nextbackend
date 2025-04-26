import { ProjectType } from "@/models/Project";
import Project from "@/models/Project";
import dbConnect from "@/lib/mongodb";

export const createProject = async (data: Omit<ProjectType, "_id" | "createdAt" | "updatedAt">) => {
  await dbConnect();
  const newProject = new Project(data);
  return await newProject.save();
};

export const getAllProjects = async (page: number = 1, limit: number = 10) => {
    await dbConnect();
    const skip = (page - 1) * limit;
    const [projects, total] = await Promise.all([
      Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments()
    ]);
    return {
      projects,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  };
  
