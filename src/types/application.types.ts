export type ApplicationStatus = "Applied" | "Pending" | "Rejected" | "Offer";

export interface Application {
  id: number;
  companyName: string;
  jobTitle: string;
  status: ApplicationStatus;
  appliedAt: Date;
  user_id: number;
}
export type NewApplication = Omit<Application, "id" | "appliedAt">;

//updating t status of an application
export type UpdateApplication = Pick<Application, "status">;
