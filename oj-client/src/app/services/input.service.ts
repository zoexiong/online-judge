import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class InputService {
// Behavior subject will use <init value type>('initial value').  if no value provided, empty string will be used
  private inputSubject$ = new BehaviorSubject<string>('');


  constructor() { }

  //instead of passing observable, we pass event by subscribe
  changeInput(term) {
    this.inputSubject$.next(term);
  }

  getInput() : Observable<string>{
    //return a observable instead of a reference of the subject
    return this.inputSubject$.asObservable();
  }

}
