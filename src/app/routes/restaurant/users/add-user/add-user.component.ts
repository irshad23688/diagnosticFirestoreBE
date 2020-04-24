import {Component, OnInit }from '@angular/core'; 
import {Router, ActivatedRoute }from "@angular/router"; 
import {NgForm }from '@angular/forms'; 
import {ToastrService }from 'ngx-toastr'; 
import {AngularFirestore }from '@angular/fire/firestore'; 
import {AngularFireAuth }from '@angular/fire/auth'; 
import {CrudRepositoryService }from '../../../_service/crud-repository.service'; 
declare var swal:any;
@Component( {
  selector:'app-add-user', 
  templateUrl:'./add-user.component.html', 
  styleUrls:['./add-user.component.scss']
})
export class AddUserComponent {

userDetails:any =  {}; 
public fireUid:any; 
  constructor(private route:ActivatedRoute, 
              public router:Router, 
              public af:AngularFirestore, 
              public authentication:AngularFireAuth, 
              private crudRep:CrudRepositoryService, 
              public toastr:ToastrService) {

      //  this.af.object('/users');
  }
  onAddUsers(form:NgForm) {
    let uidRes; 
    this.authentication.auth.createUserWithEmailAndPassword(this.userDetails.email, this.userDetails.password).then(res =>  {
         uidRes = res; 
         this.af.collection('users').doc(uidRes.user.uid).set( {
          email:this.userDetails.email, 
          name:this.userDetails.name, 
          mobileNo:this.userDetails.mobileNo, 
          role:this.userDetails.role
         },{merge:true})
    // this.crudRep.create( {
    //   email:this.userDetails.email, 
    //            name:this.userDetails.name, 
    //            mobileNo:this.userDetails.mobileNo, 
    //            role:this.userDetails.role
    // }, "users").then(res =>  {
    //   console.log(res)
    // }); 
    //  this.af.collection('users').doc(uidRes.user.uid).update({
    //    email:this.userDetails.email,
    //             name:this.userDetails.name,
    //             mobileNo:this.userDetails.mobileNo,
    //             role:this.userDetails.role
    //  }).then(response=>{
    //     // secondaryApp.auth().signOut();  
    //        this.toastr.success('User Added Successfully !', 'Success!');      
    //      this.router.navigate(['/users/manageUsers'])
    //  }).catch(error=>{
    //    this.toastr.error('User Not Added!', 'Error!');
    //  });
    this.router.navigate(['/users/manageUsers'])

},error =>  {
  swal.fire('Something went Wrong')
}); 



}
  cancel() {
        this.router.navigate(['/users/manageUsers'])
    }

}
