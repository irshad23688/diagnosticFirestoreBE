import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {

    subscribersData;
    subscribeDataRef;
    subscribeObservable:Observable<any>;

    constructor(public af:AngularFirestore) {
      this.subscribersData=[];
      this.subscribeDataRef= af.collection('subscribe').get().subscribe((res)=>{
         res.docs.forEach(item=>{
           this.subscribersData.push(Object.assign(item.data(),{key:item.id}));
         })
         this.subscribersData = res;
     }); 
    }
    
    // getnews(ev: any) {
    //     let val = ev;
    //     this.subscribeObservable = this.af.list('/subscribe', ref => ref.orderByChild('email').startAt(val.charAt(0).toUpperCase() + val.slice(1))
    //        .endAt(val.charAt(0).toUpperCase() + val.slice(1) + '\uf8ff')).valueChanges();
    //     this.subscribeObservable.subscribe((data) => {
    //             this.subscribersData = data;
    //         });
    // }

  ngOnInit() {
  }

}
