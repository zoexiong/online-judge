import { Component, OnInit } from '@angular/core';
//import rxjs from angular library
import { Observable } from 'rxjs/Rx';

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
    let stream$ = new Observable(observer => {
      console.log('observable execution');
      let timeout = setTimeout(() => {
        observer.next(1);
        // call next method of observer argument
        observer.next('observer next method executed');
      }, 1000);
      observer.next(2);
      //observer.error(new Error('ummm'));
      //observer.complete();
      ////return function become a property of subscription
      return () => {
        clearTimeout(timeout);
      }
    });

    ////############# Cancel Observable##############////////
    let subscription = stream$.subscribe(
      value => console.log(value),
      err => console.error(err),
      () => console.log('completed')
    );
    setTimeout(() => {
      subscription.unsubscribe();
    }, 500);



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
