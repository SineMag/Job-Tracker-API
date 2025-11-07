import { Request, Response } from "express";
import * as projectService from "../service/projectService";

export const createProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const owner_id = req.user!.id;
  try {
    const project = await projectService.createProject(name, description, owner_id);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.findAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects" });
  }
};

export const assignUserToProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const assignment = await projectService.assignUserToProject(parseInt(id), userId);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error assigning user to project" });
  }
};

export const removeUserFromProject = async (req: Request, res: Response) => {
  const { id, userId } = req.params;
  try {
    await projectService.removeUserFromProject(parseInt(id), parseInt(userId));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error removing user from project" });
  }
};
