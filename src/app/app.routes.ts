import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExamComponent } from './exam/exam.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesDashboardComponent } from './courses-dashboard/courses-dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'GenerateExam', component: ExamComponent },
    { path: 'addCourse', component: AddCourseComponent },
    { path: 'courseDashboard', component: CoursesDashboardComponent },
];


