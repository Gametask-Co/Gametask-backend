export default interface CreateMilestoneDTO {
  name: string;
  description: string;
  subject_id: string;
  isVisible?: boolean;
  deadline?: Date;
}
