import { Request, Response } from "express";
import * as applicationService from "../service/applicationService";

export const addApplication = async (req: Request, res: Response) => {
  console.log("Request Body:", req.body);
  try {
    const NewApplication = await applicationService.createApplication(req.body); //application data which has been a type of new applications
    res.status(201).json(NewApplication);
  } catch (error) {
    console.error("Error in creating application:", error);
    res.status(500).json({ message: "Error in creating application" });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await applicationService.findApplications();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving applications" });
  }
};
export const getApplicationById = async (req: Request, res: Response) => {
  try {

    const id = parseInt(req.params.id);
    const application = await applicationService.findApplicationById(id);
    if (!application) {
      res.status(404).json({ message: "Application not found" });
    } else {
      return res.status(200).json(application);
    }
    
  } catch (error) {
    res.status(500).json({ message: "Error retrieving application" });
  }
};
