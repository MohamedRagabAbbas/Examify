import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExamComponent } from './exam/exam.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesDashboardComponent } from './courses-dashboard/courses-dashboard.component';
import { ExamDashboardComponent } from './exam-dashboard/exam-dashboard.component';
import { UpdateExamComponent } from './update-exam/update-exam.component';
import { OpenExamComponent } from './open-exam/open-exam.component';
import { ShowExamGradeComponent } from './show-exam-grade/show-exam-grade.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'GenerateExam/:id', component: ExamComponent },
    { path: 'addCourse', component: AddCourseComponent },
    { path: 'courseDashboard', component: CoursesDashboardComponent },
    { path: `examDashboard/:id`, component: ExamDashboardComponent, },
    { path: 'updateExam/:id', component: UpdateExamComponent },
    { path: 'openExam/:id', component: OpenExamComponent },
    { path: 'showExamGrade/:id', component: ShowExamGradeComponent },
    { path: 'text', component:TestComponent },
    { path: '**', component: LoginComponent },
];


