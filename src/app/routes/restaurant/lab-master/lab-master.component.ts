import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddLocationsComponent } from './add-locations/add-locations.component';
import { AddServicesComponent } from './add-services/add-services.component';
import { CrudRepositoryService } from '../../_service/crud-repository.service';
import { AngularFireAuth } from '@angular/fire/auth';
declare var swal:any;
declare var $:any;
@Component({
  selector: 'app-lab-master',
  templateUrl: './lab-master.component.html',
  styleUrls: ['./lab-master.component.css']
})
export class LabMasterComponent implements OnInit {
  services: FormArray;
  serviceList;
  labsignup: FormGroup;
  showPricing= true;
  locationList;
  pushFormData;
  userId;
  panelOpenState=false;
  responseInterComp;
  loaderShow=true;

  constructor(private crudRepo: CrudRepositoryService, public formBuilder: FormBuilder, private dialog: MatDialog,
    private router: Router, public authaf: AngularFireAuth) { }

  ngOnInit() {
    if (this.authaf.auth.currentUser) {
      this.userId = this.authaf.auth.currentUser.uid;
    }
    // this.pushFormData= this.afd.list('/labs');
    this.crudRepo.getData('services').subscribe(res=>{
      this.serviceList=res;
    },error=>{
      swal.fire('Something went wrong!');
    })
    this.crudRepo.getData('locations').subscribe(res=>{
      this.locationList=res;
    },error=>{
        swal.fire('Something went wrong!');
      })

    //console.log(this.serviceList);
    this.labsignup=this.formBuilder.group({
      labname:['',Validators.required],
      email:['',[Validators.required, Validators.email, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]],
      address:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pincode:['',Validators.required],
      personname:['',Validators.required],
      mobilenumber:['',Validators.required],
      // price:['',Validators.required],
      // service:['',Validators.required],
      area:['',Validators.required],
      services: this.formBuilder.array([ this.createItem() ])

    })
  }
  reset(){
    this.labsignup.reset();
    this.showPricing=true;
  }
  openPrice(e){
    console.log(e);
    this.showPricing=false;
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      service:['', Validators.required],
      price:['',Validators.required],
      
    });
  }
  addItem(){
    this.services = this.labsignup.get('services') as FormArray;
    this.services.push(this.createItem());
  }
  removeItem (index){
    (this.labsignup.get('services') as FormArray).removeAt(index);

  }
  onSubmit(){
    this.loaderShow=false;
    if(this.labsignup.invalid){
      return;
    }
    this.responseInterComp=Object.assign(this.labsignup.value,{'createdDate': Date.now(),
    'createdId' : this.userId,
    'updatedDate': Date.now(),
    'updatedId' : this.userId,
    'isActive' :true
  })
    this.crudRepo.create( this.responseInterComp,"labs").then(res=>{ 
      this.loaderShow=true;
      swal.fire('Saved successfully!');
      this.router.navigate(['/home']);
      this.labsignup.reset();
    },error=>{
      this.loaderShow=true;
      swal.fire('Something Went Wrong!');
    });
  }
  
  addService(){
    let dialogRef = this.dialog.open(AddServicesComponent,{
      width: '250px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
  addLocation(){
    let dialogRef = this.dialog.open(AddLocationsComponent,{
      width: '250px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}

