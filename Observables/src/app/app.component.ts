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
    //callback function can also be written as function(resolve, reject) => {};
    let promise = new Promise(resolve => {
      console.log('promise execution');
      setTimeout(() => {
        resolve('promise resolved');
      }, 1000);
    });

    promise.then(value => console.log(value));
  }

}
