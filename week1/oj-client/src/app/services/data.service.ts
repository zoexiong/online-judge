import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import { PROBLEMS } from "../mock-problems";

@Injectable()
export class DataService {

  constructor() { }

  getProblems(): Problem[] {
    return PROBLEMS;
  }

  getProblem(id: number): Problem {
    //array.find((item) => item.id === id)
    return PROBLEMS.find((problem) => problem.id === id);
  }
}
