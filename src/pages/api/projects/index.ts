import type { NextApiRequest, NextApiResponse } from "next";
import { createProject, getAllProjects } from "@/services/projectService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const project = await createProject(req.body);
      return res.status(201).json({ message: "Project created", project });
    } catch (err: any) {
      return res.status(500).json({ message: "Failed to create project", error: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
  
      const data = await getAllProjects(page, limit);
      return res.status(200).json(data);
    } catch (err: any) {
      return res.status(500).json({ message: "Failed to fetch projects", error: err.message });
    }
  }
  

  return res.status(405).json({ message: "Method Not Allowed" });
}
