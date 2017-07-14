import { Component, OnInit } from '@angular/core';
//import rxjs from angular library
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  ngOnInit(): void {

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
    let subject = new Subject();
    //among next & err & complete, we can define 1, 12, 123, but not 13
    subject.subscribe(
      v => console.log('observerA ' + v));
    subject.subscribe(
      v => console.log('observerB ' + v));
    subject.next(1);
    subject.next(2);

    subject.subscribe(
      v => console.log('observerC ' + v));
    subject.next(3);

    let observable = new Observable(observer => {
      observer.next(1);
      observer.next(2);
    });

    observable.subscribe(
      v => console.log('observerAnew ' + v));
    observable.subscribe(
      v => console.log('observerBnew ' + v));

    //return
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


    //////############# Complete Version of Observable##############////////

    // ngOnInit() :void {
    //   const source$ = Observable.from(['Adam', 'Bill', 'Cow'])
    //     .map(v => v.toUpperCase())
    //     .map(v => 'I am' + v);
    // source$.subscribe(
    //   v => console.log(v),
    //   err => console.error(err),
    //   () => console.log('completed')
    // );

  }

  // getUser(username) {
  //   return this.http.get('https://api.github.com/users/' + username);
  // }

}
