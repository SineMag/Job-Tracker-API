import { Request, Response } from "express";
import * as notificationService from "../service/notificationService";

export const getUserActivity = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const activity = await notificationService.getUserActivity(parseInt(id));
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user activity" });
  }
};
