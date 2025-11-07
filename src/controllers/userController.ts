import { Request, Response } from "express";
import * as userService from "../service/userServices";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.findUserById(parseInt(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, display_picture } = req.body;
  try {
    const updatedUser = await userService.updateUser(parseInt(id), username, display_picture);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
