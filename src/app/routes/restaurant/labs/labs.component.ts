import {Component, OnInit, ViewChild }from '@angular/core'; 
import {Observable}from 'rxjs/Observable'; 
import {Router}from '@angular/router'; 
import {MatTableDataSource }from '@angular/material/table'; 
import {MatSort }from '@angular/material/sort'; 
import {MatPaginator }from '@angular/material/paginator'; 
import {ToastrService }from 'ngx-toastr'; 
import { AngularFirestore } from '@angular/fire/firestore';
declare var swal:any; 
@Component( {
  selector:'app-labs', 
  templateUrl:'./labs.component.html', 
  styleUrls:['./labs.component.scss']
})
export class LabsComponent {
  displayedColumns:string[] = ['position', 'labName', 'address', 'area', 'personName', 'email', 'mnumber', 'service', 'price', 'active']; 
  dataSource; 
  loaderShow=false;
  @ViewChild(MatPaginator)paginator:MatPaginator; 
  @ViewChild(MatSort)sort:MatSort; 
  labs; 
  labObservable:Observable < any > ; 
  constructor(public af:AngularFirestore, public router:Router, public toastr:ToastrService) {
  	// this.labsDataRef = af.list('/labs'); 
    this.generateTableData(); 
   }

   generateTableData() {
    this.labs=[];
    this.labObservable=  this.af.collection("labs").get();
    this.labObservable.subscribe((res) =>  {
      this.loaderShow=true;
      res.docs.forEach(item=>{
      this.labs.push(Object.assign(item.data(),{key:item.id}));
    });
    this.dataSource = new MatTableDataSource(this.labs); 
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort; 
  },error=>{
    this.loaderShow=true;
    swal.fire('Something Went Wrong!')
  }); 
   }

   applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filterValue.trim().toLowerCase(); 

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); 
    }
  }
  
  onChange(event, key) {
    this.af.collection("labs").doc(key).update({isActive:event.checked}).then((res) =>  {
       this.toastr.success('Booking status updated!', 'Success!'); 
  },error=>{
    this.loaderShow=true;
    swal.fire('Something Went Wrong!')
  }); 
  }
}