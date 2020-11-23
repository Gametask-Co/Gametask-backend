export default interface CreateTaskDTO {
  name: string;
  description?: string;
  due?: Date;
  attachment_url?: string;
  total_score?: number;
  block_id: string;
  subject_id: string;
}
