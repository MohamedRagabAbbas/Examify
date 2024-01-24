import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Call } from '@angular/compiler';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ModelsModule { }

// TypeScript equivalent for Answer class
export class Answer {
  id: number = 0;
  questionId: number = 0;
  question: Question = new Question();
  attemptId: number = 0;
  attempt: Attempt = new Attempt();
  answerOption: string = "";
  isCorrect: boolean = false;
  grade: number = 0;
}

// TypeScript equivalent for Course class
export class Course {
  id: number = 0;
  code: string = "";
  subject: string = "";
  grade: string = "";
  students?: Student[] = [];
  teacherId: number = 0;
  teacher: Teacher = new Teacher();
  exams: Exam[] = [];
}

// TypeScript equivalent for Exam class
export class Exam {
  id: number = 0;
  name: string = "";
  description: string = "";
  createdOn: Date = new Date();
  updatedOn: Date = new Date();
  startTime: Date = new Date();
  endTime: Date = new Date();
  questions?: Question[] = [];
  courseId: number = 0;
  course: Course = new Course();
  studentAttempts?: StudentAttempts[] = [];
  attemptsNumber: number = 0;
}

// TypeScript equivalent for Grade class
export class Grade {
  id: number = 0;
  attemptId: number = 0;
  attempt: Attempt[] = [];
  totalGrade: number = 0;
  outOf: number = 0;
}

// TypeScript equivalent for Question class
export class Question {
  id: number = 0;
  questionNumber:string = "";
  questionText: string = "";
  option1: string = "";
  option2: string = "";
  option3: string = "";
  option4: string = "";
  correctAnswer: string = "";
  weight: number = 0;
  examId: number = 0;
  exam: Exam[] = [];
  answers?: Answer[] = [];
}

// TypeScript equivalent for Student class
export class Student {
  id: number = 0;
  applicationUserId:string = "";
  applicationUser:any = {};
  grade: string = "";
  courses?: Course[] = [];
  studentAttempts?: StudentAttempts[] = [];
}

// TypeScript equivalent for Teacher class
export class Teacher {
  id: number = 0;
  applicationUserId:string = "";
  applicationUser:any = {};
  courseId: number = 0;
  courses?: Course[] = [];
}

export class Attempt
{
  id: number = 0;
  answers?: Answer[] = [];
  grade?: Grade = new Grade();
  studentAttemptsId: number = 0;
  studentAttempts: StudentAttempts[] = [];
}
export class StudentAttempts
{
  id: number = 0;
  attempts?: Attempt[] = [];
  examId: number = 0;
  exam: Exam = new Exam();
  studentId: number = 0;
  student: Student = new Student();
}

export class AuthSignUp
{
  name:string = "";
  password:string = "";
  email:string = "";
  role:string = "";
  grade:string = "";
}
export class AuthLogIn
{
  email:string = "";
  password:string = "";
}


