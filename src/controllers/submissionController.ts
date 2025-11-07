import { Request, Response } from "express";
import * as submissionService from "../service/submissionService";

export const createSubmission = async (req: Request, res: Response) => {
  const { title, code, project_id } = req.body;
  const submitter_id = req.user!.id;
  try {
    const submission = await submissionService.createSubmission(title, code, project_id, submitter_id);
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Error creating submission" });
  }
};

export const getSubmissionsByProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const submissions = await submissionService.findSubmissionsByProjectId(parseInt(id));
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving submissions" });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const submission = await submissionService.findSubmissionById(parseInt(id));
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving submission" });
  }
};

export const updateSubmissionStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedSubmission = await submissionService.updateSubmissionStatus(parseInt(id), status);
    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ message: "Error updating submission" });
  }
};

export const deleteSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await submissionService.deleteSubmission(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting submission" });
  }
};
