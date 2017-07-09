import { Component, OnInit, Inject } from '@angular/core';

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

  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java'; //default
  languageToMode: Object = {
    'java': 'java',
    'python': 'python',
    'c++': 'c_cpp'
  };

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

  constructor(@Inject('collaboration') private collaboration) {

  }

  ngOnInit() {

    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    //for code over one page, set scrolling to infinity
    this.editor.$blockScrolling = Infinity;
    this.collaboration.init();
  }

  setLanguage(language: string): void{
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.getSession().setMode('ace/mode/' + this.languageToMode[this.language.toLowerCase()]);
    this.editor.setValue(this.defaultContent[this.language]);
  }

  submit(): void{
    let user_code = this.editor.getValue();
    console.log(user_code);
  }

}
