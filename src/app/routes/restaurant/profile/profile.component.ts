import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  userData:any={}
  constructor(public af: AngularFirestore, public router:Router,public toastr: ToastrService, public authentication: AngularFireAuth) {
    this.af.collection('users').doc(this.authentication.auth.currentUser.uid).valueChanges().subscribe(res=>{
                        console.log("Firebase res: " + JSON.stringify(res));
                        this.userData = res;
                    })
                         }

  onUpadteUser(form: NgForm){
          console.log("Users Data : "+JSON.stringify(this.userData));
  	      this.af.collection('users').doc(this.authentication.auth.currentUser.uid).update({
             	email:this.userData.email,
      	        name:this.userData.name,
      	        street:this.userData.street,
      	        city:this.userData.city,
      	        zip:this.userData.zip,
      	        country:this.userData.country,
      	        mobileNo:this.userData.mobileNo
        }).then((res)=>{
      	console.log("Success");
      	 this.toastr.success('Successfully!', ' Updated!');
      })
  }

}
