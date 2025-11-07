import { Request, Response } from "express";
import * as reviewService from "../service/reviewService";

export const approveSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviewer_id = req.user!.id;
  try {
// import { broadcast } from "../sockets/notificationSocket";

    const review = await reviewService.createReview(parseInt(id), reviewer_id, "approved");
    // broadcast(JSON.stringify({ type: "SUBMISSION_APPROVED", data: review }));
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error approving submission" });
  }
};

export const requestChanges = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviewer_id = req.user!.id;
  try {
    const review = await reviewService.createReview(parseInt(id), reviewer_id, "changes_requested");
    // broadcast(JSON.stringify({ type: "CHANGES_REQUESTED", data: review }));
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error requesting changes" });
  }
};

export const getReviewHistory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reviews = await reviewService.getReviewHistoryBySubmissionId(parseInt(id));
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving review history" });
  }
};
