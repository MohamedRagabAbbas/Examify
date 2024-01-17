import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenExamComponent } from './open-exam.component';

describe('OpenExamComponent', () => {
  let component: OpenExamComponent;
  let fixture: ComponentFixture<OpenExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenExamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
