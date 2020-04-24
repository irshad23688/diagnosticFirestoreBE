import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {AngularFireDatabase,AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-view-labs',
  templateUrl: './view-labs.component.html',
  styleUrls: ['./view-labs.component.scss']
})
export class ViewLabComponent {

labDetails:any={};
labRef:AngularFireObject<any>;
labObservable:Observable<any>;
  constructor(private route: ActivatedRoute,  public router: Router, public af: AngularFireDatabase) {

  	 	this.route.params.map(params => params['id']).subscribe((Id) => {
  	 	  if(Id != null) {
		      this.labRef =  this.af.object('/labs/' + Id);
          this.labObservable = this.labRef.valueChanges();
          this.labObservable.subscribe((response) => { 
		        	this.labDetails = response;
		      })
        }
      });  	
  }

}
