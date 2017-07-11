import { Injectable } from '@angular/core';
//import colors to avoid random ugly colors
import { COLORS } from '../../assets/colors';

declare var io: any;
declare var ace: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;
  //store cursor position, color and socketId, etc
  clientsInfo: Object = {};
  clientNum: number = 0;

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

    //listening on cursor moves send from server
    this.collaborationSocket.on("cursorMove", (cursor) => {
      console.log("cursor move: " + cursor);
      let session = editor.getSession();
      cursor = JSON.parse(cursor);
      let x = cursor['row'];
      let y = cursor['column'];
      //get the socketId of the user that the cursor presents
      let changeClientId = cursor['socketId'];
      console.log(x + ' ' + y + ' ' + changeClientId);

      if (changeClientId in this.clientsInfo) {
        //we use marker to mock a cursor since ace doesn't support multiple cursor
        session.removeMarker(this.clientsInfo[changeClientId]['marker']);
      } else {
        //add info for new user
        this.clientsInfo[changeClientId] = {};
        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".editor_cursor_" + changeClientId + " { position: absolute; background:" + COLORS[this.clientNum] + ";"
        + " z-index: 100; width:3px !important; }";

        document.body.appendChild(css);
        this.clientNum++;
      }

      let Range = ace.require('ace/range').Range;
      //(0,0) is in upper left corner, x and y is row and column
      //add class name to the marker
      let newMarker = session.addMarker(new Range(x, y, x, y + 1), 'editor_cursor_' + changeClientId, true);
      this.clientsInfo[changeClientId]['marker'] = newMarker;
      console.log('new marker: ',newMarker);
    });

    //Test: what to do when receive message
    // this.collaborationSocket.on("message", (message) => {
    //   console.log("received: " + message);
    // })
  }

  //listening on changes from client
  change(delta: string): void{
    //send change to server
    this.collaborationSocket.emit("change", delta);
  }

  cursorMove(cursor: string): void {
    this.collaborationSocket.emit("cursorMove", cursor);
  }
}
