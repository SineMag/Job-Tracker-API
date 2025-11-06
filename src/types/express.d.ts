import { User } from "./user.types";

//file to add user property to the global space
// the plan is to identify the user and attach their profile to their request

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
