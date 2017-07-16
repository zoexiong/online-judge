import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import { Http, Response, Headers } from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }

  //get a observable (promise will only be triggered once,
  //but observable could be triggered everytime its value changed)
  getProblems(): Observable<Problem[]> {
    //get a observable
    this.http.get("/api/v1/problems")
      .toPromise()
      .then((res:Response) => {
        //add to another observable
        this.problemsSource.next(res.json());
      })
      .catch(this.handleError);

    return this.problemsSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    //这本身就是一个observable，会一直盯着这个api，它的值变化之后就会触发一些操作
    return this.http.get(`/api/v1/problems/${id}`)
      .toPromise()
      .then((res:Response) => res.json())
      .catch(this.handleError);
  }

  addProblem(problem: Problem): Promise<Problem>{
    let headers = new Headers({'content-type': 'application/json' });
    return this.http.post('/api/v1/problems', problem, headers)
      .toPromise()
      .then((res: Response) => {
        //get newest list when added a new problem (take advantage of observable)
        this.getProblems();
        return res.json();
      })
      .catch(this.handleError);
  }

  buildAndRun(data): Promise<Object> {
    let headers = new Headers({'content-type': 'application/json'});
    return this.http.post('/api/v1/build_and_run', data, headers)
      .toPromise()
      .then((res: Response) => {
        console.log(res);
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('An error occured', error); //for demo purposes only
    return Promise.reject(error.body || error);
  }
}
