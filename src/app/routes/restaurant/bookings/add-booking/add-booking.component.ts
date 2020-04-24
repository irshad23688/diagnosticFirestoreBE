import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import {firebaseConfigTwo} from '../../../../firebase.config';
import { ToastrService } from 'ngx-toastr';
import {AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'app-add-lab',
  templateUrl: './add-lab.component.html',
  styleUrls: ['./add-lab.component.scss']
})
export class AddLabComponent {

labDetails:any={};
labDataRef: AngularFireList<any>;
public fireUid:any;
  constructor(private route: ActivatedRoute,  
              public router: Router, 
              public af: AngularFireDatabase,
              public authentication: AngularFireAuth,
              public toastr: ToastrService) {

                this.labDataRef=af.list('/labs');
  }
    onAddUsers(form: NgForm){
          console.log("Labs Data : "+JSON.stringify(this.labDetails));
          
          this.labDataRef.push(this.labDetails).then((res) => {
            this.toastr.success('User Added Successfully !', 'Success!');      
            this.router.navigate(['/labs/manageLabs'])
          })


}
  cancel(){
        this.router.navigate(['/users/manageLabs'])
    }

}
