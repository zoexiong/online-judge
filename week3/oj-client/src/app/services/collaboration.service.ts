import { Injectable } from '@angular/core';
//import { COLORS } from '../../assets/colors';

declare var io: any;
declare var ace: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId });

    //listening on changes send from server
    this.collaborationSocket.on("change", (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      //apply changes to editor
      editor.lastAppliedChange = delta;
      //if there are lots of changes, we can get a delta array from server and apply it to editor
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    //what to do when receive message
    this.collaborationSocket.on("message", (message) => {
      console.log("received: " + message);
    })
  }

  //listening on changes from client
  change(delta: string): void{
    //send change to server
    this.collaborationSocket.emit("change", delta);
  }
}
