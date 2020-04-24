import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie';
import { Http } from '@angular/http';
import { InterComponentService } from '../../_service/inter-component.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
declare var swal:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;
  rememberMe: boolean = false;
  loginBtn=false;
  constructor(private _http: Http,private _cookieService: CookieService, public af: AngularFireAuth, public settings: SettingsService, fb: FormBuilder, public router: Router, 
    
    public db: AngularFirestore, public toastr: ToastrService, private interComp: InterComponentService)
  {
    this.valForm = fb.group({
      'email': ['admin@gmail.com', Validators.compose([Validators.required, CustomValidators.email])],
      'password': ['admin123', Validators.required]
    });

    this.getCookie();
  }

  getCookie() {
    let rememberMeData: any = {};
    rememberMeData = this._cookieService.getObject('rememberMe');
    if (rememberMeData != undefined) {
      this.valForm.get('email').setValue(rememberMeData.email);
      this.valForm.get('password').setValue(rememberMeData.password);
    }
    else {
      ////console.log("No data inside cookies");
    }
  }


  submitForm($ev, value: any) {
    this.loginBtn=true;
    let successResp;
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      if (this.rememberMe) {
        this._cookieService.putObject('rememberMe', this.valForm.value)
      }

      this.af.auth.signInWithEmailAndPassword(value.email, value.password).then((success) => {
        successResp=success;
        console.log(success);
        this.db.collection('users').doc(successResp.user.uid).valueChanges().subscribe((res: any) => {
          console.log(res);
          if (res.role === "Admin" || res.role === "Vendor") {
              this.interComp.sendMessage(res.role);

            this.router.navigate(['home']);
            localStorage.setItem('uid', successResp.uid)
            this.toastr.success('Login Successfully!', 'Success!');

          } else {
            this.toastr.error('Login Failed!', 'You are not an ADMIN!');
            this.loginBtn=false;

          }
        })
      },error=>{
        swal.fire('Invalid username or password!');
        this.loginBtn=false;
      })
    }
  }
 

  checkMe(){
    
  }

  ngOnInit() {

  }

}
