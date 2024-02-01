import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attempt } from '../BackEndModels/models/models.module';
import { ActivatedRoute } from '@angular/router';
import { ServerSideService } from '../server-side.service';
import { ResponseClass } from '../models/response-class/response-class.module';

@Component({
  selector: 'app-show-exam-grade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-exam-grade.component.html',
  styleUrl: './show-exam-grade.component.css',
  providers: [ServerSideService]
})
export class ShowExamGradeComponent {
  attempt:Attempt = new Attempt();

  constructor(private routes:ActivatedRoute, private server:ServerSideService) 
  {
    this.server.getAttemptById(this.routes.snapshot.params['id']).subscribe((data)=>{
      let result = new ResponseClass<Attempt>();
      result = data as ResponseClass<Attempt>;
      this.attempt = result.data as Attempt;
      console.log(this.attempt);
    });
  }

  percentage(grade: number | undefined, outOf: number | undefined): number | undefined {
    if (grade === undefined || outOf === undefined) {
      return undefined; 
    }
    if(outOf === 0)
    {
      return 0;
    }
    return (grade / outOf) * 100;
  }
}
