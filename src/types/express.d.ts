import { User } from "./user.types";

// the plan is to identify the user and attach their profile to their request

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
