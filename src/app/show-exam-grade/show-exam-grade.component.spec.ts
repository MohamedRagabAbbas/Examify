import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowExamGradeComponent } from './show-exam-grade.component';

describe('ShowExamGradeComponent', () => {
  let component: ShowExamGradeComponent;
  let fixture: ComponentFixture<ShowExamGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowExamGradeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowExamGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
