import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
declare var swal : any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  loaderShow=false;
  users;
  usersDataRef;
  userObservable:Observable<any>;
  constructor(public af: AngularFirestore, public router: Router ) {
    this.users=[];
  	this.usersDataRef = af.collection('users').get().subscribe((res)=>{
      this.loaderShow=true;
      res.docs.forEach(item=>{
        this.users.push(Object.assign(item.data(),{key:item.id}));
      });
    },error=>{
      this.loaderShow=true;
      swal.fire('Something Went Wrong!')
    });
   }
    usersShow(key){
     this.router.navigate(['/users/viewUser', key]);
  }

   usersDelete(key:any){
    swal.fire({
            title: 'Are you sure?',
            text: 'Your will not be able to recover this data!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((result) =>  {
          if (result.value) {
               this.af.collection('users').doc(key).update({labKey:''}).then((res)=>{
                   swal.fire('User Access Removed!', 'success');
                 },error=>{
                  this.loaderShow=true;
                  swal.fire('Something Went Wrong!')
                })
              } else {
                swal.fire('Cancelled', 'Your data is safe :)', 'error');
            }
        });
  }

}