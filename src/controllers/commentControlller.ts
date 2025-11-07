import { Request, Response } from "express";
import * as commentService from "../service/commentService";

export const createComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;
  const user_id = req.user!.id;
  try {
    const newComment = await commentService.createComment(comment, parseInt(id), user_id);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment" });
  }
};

export const getCommentsBySubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comments = await commentService.findCommentsBySubmissionId(parseInt(id));
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving comments" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const updatedComment = await commentService.updateComment(parseInt(id), comment);
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await commentService.deleteComment(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};
