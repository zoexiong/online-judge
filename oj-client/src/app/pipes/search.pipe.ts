import { Pipe, PipeTransform } from '@angular/core';
import { Problem } from '../models/problem.model';

//declarator
@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(problems: Problem[], term: string): Problem[] {
    // add callback
    return problems.filter(
      //if true, return the value
      problem => problem.name.toLowerCase().includes(term)
    );
  }

}
