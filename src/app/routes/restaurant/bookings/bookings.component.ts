import {Component }from '@angular/core'; 
import {AngularFireAuth }from '@angular/fire/auth'; 
import {AngularFirestore }from '@angular/fire/firestore'; 
import {Router }from '@angular/router'; 
import {ToastrService }from 'ngx-toastr'; 
// import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable }from 'rxjs/Observable'; 
// import { AngularFireAuth } from 'angularfire2/auth';
declare var swal:any; 
@Component( {
  selector:'app-bookings', 
  templateUrl:'./bookings.component.html', 
  styleUrls:['./bookings.component.scss']
})
export class BookingsComponent {
  loaderShow = false; 
  roleKey; 
  userId; 
  bookings; 
  bookingsDataRef; 
  usersDataRef; 
  bookingObservable:Observable < any > ; 
  constructor(public af:AngularFirestore, public router:Router, public toastr:ToastrService, 
    private afd:AngularFireAuth) {
   }

    bookingsShow(key) {
     this.router.navigate(['/bookings/viewbooking', key]); 
  }

   bookingsDelete(key:any) {
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
               this.af.collection('bookings').doc(key).update( {labKey:''}).then((res) =>  {
                   swal.fire('User Access Removed!', 'success'); 
                 }, error =>  {
                  this.loaderShow = true; 
                  swal.fire('Something Went Wrong!')
                })
              }else {
                swal.fire('Cancelled', 'Your data is safe :)', 'error'); 
            }
        }); 
  }

  OnChangeStatus(key, event) {
      console.log(key, event.target.value)
    this.af.collection('bookings').doc(key).update( {status:event.target.value}).then((res) =>  {
        this.toastr.success('Booking status updated!', 'Success!'); 
        this.getTableData();
    }, error =>  {
      this.loaderShow = true; 
      swal.fire('Something Went Wrong!')
    }); 
  }
  OnChangePaymentStatus(key, event) {
    this.af.collection('bookings').doc(key).update( {pStatus:event.target.value}).then((res) =>  {
      this.toastr.success('Payment status updated!', 'Success!'); 
      this.getTableData();
  }, error =>  {
    this.loaderShow = true; 
    swal.fire('Something Went Wrong!')
  }); 
  }

  getTableData(){
    this.bookings = []; 
    if (this.afd.auth.currentUser) {
      console.log(this.afd.auth.currentUser)

      var ref = this.af.collection('users').doc(this.afd.auth.currentUser.uid); 
      let getDoc = ref.get().subscribe(doc =>  {
        console.log(getDoc)

    if ( ! doc.exists) {
      console.log('No such document!'); 
    }else {
      let res = doc.data(); 
      let roleLabkey = doc.data(); 
      console.log(roleLabkey)
      if (res.role === 'Admin') {
        this.roleKey = res.role; 
      this.af.collection("bookings", ref => ref.orderBy("createdDate")).get().subscribe(res =>  {
          this.bookings = []; 
          this.loaderShow = true; 
          res.docs.forEach(item =>  {
            this.bookings.push(Object.assign(item.data(),  {key:item.id})); 
            console.log(this.bookings); 
          }); 
          }, error =>  {
            this.loaderShow = true; 
            swal.fire('Something Went Wrong!')
          }); 
        }else {
          this.af.collection("bookings", ref => ref.where("labKey", "==", roleLabkey.labKey)).get().subscribe(res =>  {
            this.bookings = []; 
            this.loaderShow = true; 
            res.docs.forEach(item =>  {
              this.bookings.push(Object.assign(item.data(),{key:item.id})); 
              console.log(this.bookings); 
            }); 
          }, error =>  {
            this.loaderShow = true; 
            swal.fire('Something Went Wrong!')
          }); 
        }
      }
    }, error =>  {
      this.loaderShow = true; 
      swal.fire('Something Went Wrong!')
    }); 
  }
  }

  ngOnInit() {
    this.getTableData();
    }
}