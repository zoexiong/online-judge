import { Component, OnInit } from '@angular/core';
//import rxjs from angular library
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {};


  // getUser(username) {
  //   //return as a observable
  //   return this.http.get('https://api.github.com/users/' + username);
  // }

  ngOnInit(): void {

    //////############# Frequently Used Creation Operators ##############////////
    // const source$ = Observable.interval(1000).take(5);
    // source$.subscribe(
    //   (v) => console.log(v),
    //   err => console.error(err),
    //   () => console.log('completed')
    // );

    // return
    // 00:33:32.815 app.component.ts:26 0
    // 00:33:33.817 app.component.ts:26 1
    // 00:33:34.821 app.component.ts:26 2
    // 00:33:35.823 app.component.ts:26 3
    // 00:33:36.824 app.component.ts:26 4
    // 00:33:36.825 app.component.ts:28 completed
    //-------------------------------------------------------------------------

    //set time out for 5000ms and then set the interval to 2000ms
    // const source$ = Observable.timer(3000, 2000).take(5);
    // source$.subscribe(
    //   (v) => console.log(v),
    //   err => console.error(err),
    //   () => console.log('completed')
    // );

    //-------------------------------------------------------------------------
    //25 is the initial value and 5 is the number of items created
    // const source$ = Observable.range(25, 5).take(5);
    // source$.subscribe(
    //   (v) => console.log(v),
    //   err => console.error(err),
    //   () => console.log('completed')
    // );

    // 00:37:10.608 app.component.ts:52 26
    // 00:37:10.646 app.component.ts:52 27
    // 00:37:10.647 app.component.ts:52 28
    // 00:37:10.648 app.component.ts:52 29
    // 00:37:10.657 app.component.ts:54 completed

    //-------------------------------------------------------------------------
    // map could be used to manipulate numbers and strings, etc and return as a new observable
    // const source$ = Observable.from(['Adam', 'Bill', 'Cow'])
    //   .map(v => v.toUpperCase())
    //   .map(v => 'I am ' + v);
    // source$.subscribe(
    //   v => console.log(v),
    //   err => console.error(err),
    //   () => console.log('completed')
    // );

    // 00:43:06.103 app.component.ts:69 I am ADAM
    // 00:43:06.112 app.component.ts:69 I am BILL
    // 00:43:06.113 app.component.ts:69 I am COW
    // 00:43:06.114 app.component.ts:71 completed


    //////############# Create Observable from Http Request ##############////////

    // getUser(username) {
    //   //return as a observable
    //   return this.http.get('https://api.github.com/users/' + username);
    // }

    // this.getUser('zoexiong')
    //   .subscribe(
    //     res => console.log(res.json())
    //   );


    //////############# Create Observable from Array ##############////////
    // const numbers = [4,5,6,7];
    // const numbers$ = Observable.from(numbers);
    // numbers$.subscribe(
    //   (v) => console.log(v),
    //   err => console.error(err),
    //   //now we have complete!
    //   () => console.log('completed')
    // );

    //return
    // 00:10:46.493 app.component.ts:18 4
    // 00:10:46.494 app.component.ts:18 5
    // 00:10:46.495 app.component.ts:18 6
    // 00:10:46.496 app.component.ts:18 7


//////############# Create Observable from UI Events ##############////////
    // const btn = document.querySelector('#btn');
    // //each click will send a value to the observable
    // const btnStream$ = Observable.fromEvent(btn, 'click');
    //
    // btnStream$.subscribe(
    //   //need to declare e as any type to get e.target
    //   (e:any) => console.log(e.target.innerHTML),
    //   err => console.error(err),
    // //complete won't be triggered actually
    //   () => console.log('completed')
    // );
    //
    // const input = document.querySelector('#input');
    // //use keyup might cause duplicate printed value, cause that's possible. we can use keydown to prevent that
    // const inputStream$ = Observable.fromEvent(input, 'keydown');
    //
    // inputStream$.subscribe(
    //   //need to declare e as any type to get e.target
    //   (e:any) => console.log(e.target.value),
    //   err => console.error(err),
    //   () => console.log('completed')
    // );


  }

}

//////############# Callback way##############////////
//callback function can also be written as function(resolve, reject) => {};

// let promise = new Promise(resolve => {
//   console.log('promise execution');
//   setTimeout(() => {
//     resolve('promise resolved');
//   }, 1000);
// });
// promise.then(value => console.log(value));

////############# Simple Version of Observable##############////////
// let stream$ = new Observable(observer => {
//   console.log('observable execution');
//   let timeout = setTimeout(() => {
//     observer.next(1);
//     // call next method of observer argument
//     observer.next('observer next method executed');
//   }, 1000);
//   observer.next(2);
//   //observer.error(new Error('ummm'));
//   //observer.complete();
//   ////return function become a property of subscription
//   return () => {
//     clearTimeout(timeout);
//   }
// });

////Cancel Observable
// let subscription = stream$.subscribe(
//   value => console.log(value),
//   err => console.error(err),
//   () => console.log('completed')
// );
// setTimeout(() => {
//   subscription.unsubscribe();
// }, 500);

//////############# Complete Version of Observable##############////////

// let stream$ = new Observable(function subscribe(observer) {
//   console.log('observable execution');
//   let timeout = setTimeout(() => {
//     observer.next(1);
//     // call next method of observer argument
//     observer.next('observer next method executed');
//   }, 1000);
//   observer.next(2);
//
//   //return function become a property of subscription
//   return function unsubscribe() {
//     clearTimeout(timeout);
//   }
// });
//
// let observer = {
//   next: value => console.log(value),
//   error: err => console.error(err),
//   complete: () => console.log('completed')
// };
//
// let subscription = stream$.subscribe(observer);
// setTimeout(() => {
//   subscription.unsubscribe();
// }, 500);


//////############# Subject##############////////
// let subject = new Subject();
// //among next & err & complete, we can define 1, 12, 123, but not 13
// subject.subscribe(
//   v => console.log('observerA ' + v));
// subject.subscribe(
//   v => console.log('observerB ' + v));
// subject.next(1);
// subject.next(2);
//
// subject.subscribe(
//   v => console.log('observerC ' + v));
// subject.next(3);
//
// let observable = new Observable(observer => {
//   observer.next(1);
//   observer.next(2);
// });
//
// observable.subscribe(
//   v => console.log('observerAnew ' + v));
// observable.subscribe(
//   v => console.log('observerBnew ' + v));

// return
// 23:16:45.846 app.component.ts:88 observerB 1
// 23:16:45.847 app.component.ts:90 observerC 1
// 23:16:45.848 app.component.ts:86 observerA 2
// 23:16:45.849 app.component.ts:88 observerB 2
// 23:19:36.664 app.component.ts:86 observerA 3
// 23:19:36.668 app.component.ts:88 observerB 3
// 23:19:36.673 app.component.ts:93 observerC 3
// 23:31:31.792 app.component.ts:102 observerAnew 1
// 23:31:31.793 app.component.ts:102 observerAnew 2
// 23:31:31.793 app.component.ts:104 observerBnew 1
// 23:31:31.794 app.component.ts:104 observerBnew 2



