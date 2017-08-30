import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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

  sessionId: string;

  output: string = 'test';

  //public languages: string[] = ['Java', 'C++', 'Python'];

  public languages: string[] = ['Python'];

  language: string = 'Python'; //default

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

  constructor(@Inject('collaboration') private collaboration,
    private route: ActivatedRoute, @Inject('data') private data) {
  }


  ngOnInit() {
    //get url to send to server
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      });
  }

  initEditor(): void {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    //for code over one page, set scrolling to infinity
    this.editor.$blockScrolling = Infinity;
    //set focus to editor when open webpage
    document.getElementsByTagName('textarea')[0].focus();

    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    //add listener for changes
    this.editor.on('change', (e) => {
      console.log('editor changed: ' + JSON.stringify(e));
      //only send changes when change is not equal to lastAppliedChange to avoid sending duplicate changes, or send change to oneself
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });

    //add listener for cursor movement
    this.editor.getSession().getSelection().on("changeCursor", () => {
      let cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor moved: ' + JSON.stringify(cursor));
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    //after setup, restore changes from server
    this.collaboration.restoreBuffer();
  };

  setLanguage(language: string): void{
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.getSession().setMode('ace/mode/' + this.languageToMode[this.language.toLowerCase()]);
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  submit(): void {
    let userCode = this.editor.getValue();
    let data = {
      user_code: userCode,
      lang: this.language.toLowerCase()
    };
    this.data.buildAndRun(data)
      .then(res => this.output = res.text);
  }

}
