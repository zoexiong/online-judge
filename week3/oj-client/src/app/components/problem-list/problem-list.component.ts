import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../models/problem.model";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})

export class ProblemListComponent implements OnInit {

  problems: Problem[] = [];
  subscriptionProblems: Subscription;
  birthday =  "1997-07-01";
  birthday2 = new Date();
  money = 2001;
  Apr = 0.18;


  //data become private variable
  constructor(@Inject("data") private data) { }

  ngOnInit() {
    this.getProblems();
  }

  //use observable
  getProblems(): void {
    this.subscriptionProblems = this.data.getProblems()
      .subscribe(problems => this.problems = problems);
  }
}
