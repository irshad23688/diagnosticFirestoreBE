import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {Observable} from 'rxjs/Observable';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUserComponent {

userDetails:any={};
userRef;
userObservable:Observable<any>;
  constructor(private route: ActivatedRoute,  public router: Router, public af: AngularFirestore) {

  	 	this.route.params.map(params => params['id']).subscribe((Id) => {
  	 	  if(Id != null) {
		      this.userRef =  this.af.collection('users').doc(Id);
          this.userObservable = this.userRef.valueChanges();
          this.userObservable.subscribe((response) => { 
		        	this.userDetails = response;
		      })
        }
      });  	
  }

}
