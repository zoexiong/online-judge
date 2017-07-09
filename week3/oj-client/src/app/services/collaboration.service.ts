import { Injectable } from '@angular/core';
//import { COLORS } from '../../assets/colors';

declare var io: any;
declare var ace: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(): void {
    this.collaborationSocket = io(window.location.origin, { query: 'message=' + '123' });
    //what to do when receive message
    this.collaborationSocket.on("message", (message) => {
      console.log("received: " + message);
    })
  }
}
