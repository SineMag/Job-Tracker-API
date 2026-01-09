import { Request, Response } from "express";
import * as applicationService from "../service/applicationService";
import { ApplicationStatus } from "../types/application.types";

export const addApplication = async (req: Request, res: Response) => {
  const { companyName, jobTitle, status } = req.body;
  if (!companyName || !jobTitle || !status) {
    return res
      .status(400)
      .json({ message: "companyName, jobTitle and status are required" });
  }
  const validStatuses: ApplicationStatus[] = [
    "Applied",
    "Pending",
    "Rejected",
    "Offer",
    
  ];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  try {
    const applicationData = { ...req.body, user_id: req.user!.id };
    const NewApplication = await applicationService.createApplication(applicationData); //application data which has been a type of new applications
    res.status(201).json(NewApplication);
  } catch (error) {
    res.status(500).json({ message: "Error in creating application" });
  }
};

// GET all applications
export const getApplications = async (req: Request, res: Response) => {
  try {
    const user_id = req.user!.id;
    const applications = await applicationService.findApplications(user_id);
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
    }
    return res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving application" });
  }
};

export const updateApplicationById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = req.user!.id;
    const updatedApplication = await applicationService.UpdateApplication(
      id,
      user_id,
      req.body
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error updating application" });
  }
};


//delete

export const deleteApplicationById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = req.user!.id;
    const deletedApplication = await applicationService.deleteApplication(id, user_id);
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting application" });
  }
}