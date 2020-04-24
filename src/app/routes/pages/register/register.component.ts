import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    valForm: FormGroup;

    constructor(public af: AngularFireAuth,
                public settings: SettingsService, 
                fb: FormBuilder, public router:Router,
                public toastr: ToastrService,
                 public db: AngularFirestore) {

       this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'name':[null],
            'mobileNo':[null],
            'password': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')])]
        });
    }

    submitForm($ev, value: any) {
        alert('hit')
        let successResp;
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log(this.valForm.valid)

             this.af.auth.createUserWithEmailAndPassword(value.email,value.password).then(success => {
                successResp=success;
                console.log(success)
                this.db.collection('users').doc(successResp.user.uid).set({
                    email:value.email,
                    name:value.name,
                    mobileNo:value.mobileNo,
                    role:'Vendor'
        },{merge:true}).then((res)=>{
           this.toastr.success('Register Successfully!', 'Success!');
            this.router.navigate(['login']);
      })
      });
        }
    }

    ngOnInit() {
    }

}