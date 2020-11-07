// import { getCustomRepository } from 'typeorm';

// import SubjectRepository from '../repositories/SubjectRepository';
// import StudentRepository from '../repositories/StudentRepository';

// import Subject from '../models/Subject';
// import TeacherRepository from '../repositories/TeacherRepository';

// interface RequestDTO {
//   user_id: string;
//   student_id: string;
//   subject_id: string;
// }

// class AddStudentToSubjectService {
//   public async execute({
//     user_id,
//     student_id,
//     subject_id,
//   }: RequestDTO): Promise<Subject> {
//     // CHECK IF TEACHER EXISTS
//     const teacherRepository = getCustomRepository(TeacherRepository);
//     const teacher = await teacherRepository.findOne({
//       where: { user_id },
//     });

//     if (!teacher) {
//       throw new Error('Not enough permission!');
//     }

//     const studentRepository = getCustomRepository(StudentRepository);
//     const student = await studentRepository.findOne({
//       where: {
//         id: student_id,
//       },
//     });

//     if (!student) {
//       throw new Error('Student not found!');
//     }

//     const subjectRepository = getCustomRepository(SubjectRepository);
//     const subject = await subjectRepository.findOne({
//       relations: ['students'],
//       where: {
//         id: subject_id,
//       },
//     });

//     if (!subject) {
//       throw new Error('Subject not found!');
//     }

//     if (subject.teacher_id !== teacher.id) {
//       throw new Error('Not enough permission!');
//     }

//     const students = subject.students.filter(st => {
//       return st.id !== student.id;
//     });

//     students.push(student);

//     subject.students = students;
//     await subjectRepository.save(subject);

//     return subject;
//   }
// }

// export default AddStudentToSubjectService;
