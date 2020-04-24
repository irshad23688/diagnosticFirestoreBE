import {Component, OnInit }from '@angular/core'; 
import {Observable}from 'rxjs/Observable'; 
import {map}from 'rxjs/Operator/map'; 
import {Router}from '@angular/router'; 
import {AngularFirestore }from '@angular/fire/firestore'; 
import {Item }from '@syncfusion/ej2-splitbuttons'; 
// const swal = require('sweetalert');
declare var swal:any; 

@Component( {
  selector:'app-labusers', 
  templateUrl:'./labusers.component.html', 
  styleUrls:['./labusers.component.scss']
})
export class LabUsersComponent {
loaderShow=false;

labusers; 
labs:Array < any > ; 
labusersDataRef; 
labsDataRef; 
userObservable:Observable < any > ; 
labObservable:Observable < any > ; 
  constructor(public af:AngularFirestore, public router:Router ) {
    this.labusers = []; 
    this.labs = []; 
  	this.labusersDataRef = af.collection('users', ref => ref.where("role", "==", "Vendor")).get().subscribe((res) =>  {
      console.log(res)
        res.docs.forEach(item =>  {
        this.labusers.push(Object.assign(item.data(),  {key:item.id}))
        console.log(this.labusers); 
      })
        
    }); 
    this.labsDataRef = af.collection('labs').get().subscribe((res) =>  {
      this.loaderShow=true;
        res.docs.forEach(item =>  {
            this.labs.push(Object.assign(item.data(),  {key:item.id}))
        })
  	}); 
   }

    labusersShow(key) {
     this.router.navigate(['/labusers/viewUser', key]); 
  }

   labusersDelete(key:any) {
    swal.fire( {
            title:'Are you sure?', 
            text:'Your will not be able to recover this data!', 
            type:'warning', 
            showCancelButton:true, 
            confirmButtonColor:'#DD6B55', 
            confirmButtonText:'Yes, delete it!', 
            cancelButtonText:'No, cancel!', 
            closeOnConfirm:false, 
            closeOnCancel:false
        }).then((result) =>  {
            if (result.value) {
              this.af.collection("users").doc(key).update({labKey:''}).then((res) =>  {
                   swal.fire('Deleted!', 'User Deleted Successfully!', 'success'); 
                 })
              }else {
                swal.fire('Cancelled', 'Your data is safe :)', 'error'); 
            }
        }); 
  }

  labusersUpdate(key:any, labkey:any) {

    swal.fire( {
            title:'Are you sure?', 
            text:'Your will not be able to recover this data!', 
            type:'warning', 
            showCancelButton:true, 
            confirmButtonColor:'#DD6B55', 
            confirmButtonText:'Yes, update it!', 
            cancelButtonText:'No, cancel!', 
            closeOnConfirm:false, 
            closeOnCancel:false
        }).then((result) =>  {
            if (result.value) {
                    console.log('labKey', key, labkey)
                   this.af.collection("users").doc(key).update( {labKey:labkey}).then((res) =>  {
                              swal.fire('Updated!', 'User Data Updated Successfully!', 'success'); 
                            }); 
                         }else {
                           swal.fire('Cancelled', 'Your data is safe :)', 'error'); 
                       }
            
          }); 
  }

}