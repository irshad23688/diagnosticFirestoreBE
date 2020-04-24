import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CrudRepositoryService } from '../../../_service/crud-repository.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {
  addService : FormGroup;
  categoryService:any;
  categoryData;
  categories;
  userId: any;
  constructor(private formBuilder: FormBuilder, private crudRepo: CrudRepositoryService,public authF: AngularFireAuth,
              public dialogRef: MatDialogRef<AddServicesComponent>) { }

  ngOnInit() {
    // this.categoryService = this.af.list('/services');
    this.addService = this.formBuilder.group({
      serviceName: ['', Validators.required],
      // description: [''],
    });
    if (this.authF.auth.currentUser) {
      this.userId = this.authF.auth.currentUser.uid;
    }
  }
  logForm(){
    if(this.addService.invalid){
      return;
    }
    let dates= new Date();
    let serviceList={
      'createdDate': Date.now(),
      'createdId' : this.userId,
      'updatedDate': Date.now(),
      'updatedId' : this.userId,
      'isActive' :true,
      'name':this.addService.value.serviceName
    };
   
    this.crudRepo.create(serviceList,"services").then(res=>{
      this.categories= res;
      this.addService.reset();
      this.dialogRef.close();
    });
  }
  onNoClick(){
    this.dialogRef.close();
  }
 }
