import { Component, OnInit } from '@angular/core';

//need to declare as a global variable to use ace-builds
declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  //editor is inside the editor component wrapper and need to be private inside the component
  editor: any;

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
          // Type your Java code here
      }
}`,
    'C++': `#include <iostream>
    using namespace std;
    ​
    int main() {
       // Type your C++ code here
       return 0;
}`,
    'Python': `class Solution:
        def example():
            # Write your Python code here`
  };

  constructor() {

  }

  ngOnInit() {
    
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.getSession().setMode("ace/mode/java");
    this.editor.setValue(this.defaultContent['Java']);

    //for code over one page, set scrolling to infinity
    this.editor.$blockScrolling = Infinity;
  }
}
