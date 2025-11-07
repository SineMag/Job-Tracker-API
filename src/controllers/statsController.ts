import { Request, Response } from "express";
import * as statsService from "../service/statsService";

export const getProjectStats = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const stats = await statsService.getProjectStats(parseInt(id));
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving project stats" });
  }
};
