import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



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
  studentId: number = 0;
  student: Student = new Student();
  questionId: number = 0;
  question: Question = new Question();
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
  grades: Grade[] = [];
  answers: Answer[] = [];
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
  grades?: Grade[] = [];
  answers?: Answer[] = [];
}

// TypeScript equivalent for Grade class
export class Grade {
  id: number = 0;
  examId: number = 0;
  exam: Exam = new Exam();
  studentId: number = 0;
  student: Student = new Student();
  totalGrade: number = 0;
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
  exam: Exam = new Exam();
  answers?: Answer[] = [];
}

// TypeScript equivalent for Student class
export class Student {
  id: number = 0;
  name: string = "";
  grade: string = "";
  email: string = "";
  password: string = "";
  courses?: Course[] = [];
  answers?: Answer[] = [];
  grades?: Grade[] = [];
}

// TypeScript equivalent for Teacher class
export class Teacher {
  id: number = 0;
  name: string = "";
  email: string = "";
  password: string = "";
  courseId: number = 0;
  courses?: Course[] = [];
}

