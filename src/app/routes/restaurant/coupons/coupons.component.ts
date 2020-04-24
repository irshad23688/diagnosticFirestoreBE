import {Component }from '@angular/core'; 
import {Router, ActivatedRoute }from "@angular/router"; 

import {Observable}from 'rxjs/Observable'; 
import {ToastrService }from 'ngx-toastr'; 
import {AngularFirestore }from '@angular/fire/firestore'; 
declare var swal:any; 
@Component( {
  selector:'app-coupons', 
  templateUrl:'./coupons.component.html', 
  styleUrls:['./coupons.component.scss']
})
export class CouponsComponent {

     coupons; 
     couponsDataRef; 
     couponObservable:Observable < any > ; 
    constructor(public af:AngularFirestore, public router:Router, public toastr:ToastrService) {
    //  this.couponsDataRef = af.list('/coupons');
      this.coupons = []; 
      af.collection("coupons").get().subscribe((res) =>  {
      res.docs.forEach(item =>  {
        this.coupons.push(Object.assign(item.data(),  {key:item.id}))
      })
     }); 
       
    }
  
  
  couponDelete(key:any) {
    swal( {
            title:'Are you sure?', 
            text:'Your will not be able to recover this data!', 
            type:'warning', 
            showCancelButton:true, 
            confirmButtonColor:'#DD6B55', 
            confirmButtonText:'Yes, delete it!', 
            cancelButtonText:'No, cancel!', 
            closeOnConfirm:false, 
            closeOnCancel:false
        }, (isConfirm) =>  {
            if (isConfirm) {
               this.couponsDataRef.remove(key).then((res) =>  {
                   swal('Deleted!', 'Coupons Deleted Successfully!', 'success'); 
                 })
              }else {
                swal('Cancelled', 'Your data is safe :)', 'error'); 
            }
        }); 
  }

}
