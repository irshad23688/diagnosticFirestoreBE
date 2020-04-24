import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterComponentService {
  private message = new BehaviorSubject<any>('');
  constructor() { }
  sendMessage(msg){
    console.log("msh",msg)
    this.message.next(msg);
  }
  getMessage(){
    return this.message.asObservable();
  }
}
