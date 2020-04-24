import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CrudRepositoryService } from '../../../_service/crud-repository.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-add-locations',
  templateUrl: './add-locations.component.html',
  styleUrls: ['./add-locations.component.css']
})
export class AddLocationsComponent implements OnInit {
  addLocations : FormGroup;
  categoryLocations:any;
  categoryData;
  categories;
  userId: any;
  constructor(private formBuilder: FormBuilder, private crudRepo: CrudRepositoryService,public authF: AngularFireAuth,
              public dialogRef: MatDialogRef<AddLocationsComponent>) { }

  ngOnInit() {
    this.addLocations = this.formBuilder.group({
      location: ['', Validators.required],
      // description: [''],
    });
    if (this.authF.auth.currentUser) {
      this.userId = this.authF.auth.currentUser.uid;
    }
  }
  logForm(){
    if(this.addLocations.invalid){
      return;
    }

    let dates= new Date();
    let locationList={
      'createdDate': Date.now(),
      'createdId' : this.userId,
      'updatedDate': Date.now(),
      'updatedId' : this.userId,
      'isActive' :true,
      'name':this.addLocations.value.location
    };
    console.log("ser", locationList)
    this.crudRepo.create(locationList,"locations").then((res)=>{
      this.addLocations.reset();
      this.dialogRef.close();
    },error=>{

    });
  }
  onNoClick(){
    this.dialogRef.close();
  }
}

