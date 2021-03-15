import StudentActivity from '@modules/students/infra/typeorm/entities/StudentActivity';
import CreateStudentActivityDTO from '@modules/students/dtos/CreateStudentActivityDTO';
import Student from '../infra/typeorm/entities/Student';
import FindStudentActivityDTO from '../dtos/FindStudentActivityDTO';

interface SubjectActivities {
  data: [{ student: Student; activies: [StudentActivity] }];
}
export default interface IStudentsActivityRepository {
  findAllStudentActivity(student_id: string): Promise<StudentActivity[] | []>;
  // findAllSubjectStudentsActivity(subjectId: string): Promise<SubjectActivities>;
  // findAllMilestoneStudentsActivity(
  //   milestoneId: string,
  // ): Promise<SubjectActivities>;
  // findAllBlockStudentsActivity(blockId: string): Promise<SubjectActivities>;
  // findSubjectStudentActivity(
  //   subjectId: string,
  //   studentId: string,
  // ): Promise<StudentActivity[]>;
  // findMilestonesStudentAcitivty(
  //   milestoneId: string,
  //   studentId: string,
  // ): Promise<StudentActivity[]>;
  find(data: FindStudentActivityDTO): Promise<StudentActivity | undefined>;
  create(data: CreateStudentActivityDTO): Promise<StudentActivity>;
  save(studentActivity: StudentActivity): Promise<StudentActivity>;
}
