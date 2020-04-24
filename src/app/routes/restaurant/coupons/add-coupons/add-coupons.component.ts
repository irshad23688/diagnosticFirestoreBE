import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudRepositoryService } from '../../../_service/crud-repository.service';
@Component({
    selector: 'app-add-coupons',
    templateUrl: './add-coupons.component.html',
    styleUrls: ['./add-coupons.component.scss']
})
export class AddCouponsComponent {

    coupon: any = {
        name: '',
        value:'',
        date:'',
        role:''
    };
    couponDataRef;


    constructor(public af: AngularFirestore, public router: Router, public toastr: ToastrService, private crudRepo: CrudRepositoryService) {
        // this.couponDataRef = af.list('/coupons');
    }

    onSubmitTag(form: NgForm) {
        this.coupon.date =  Date.now();
        this.crudRepo.create(this.coupon,"coupons").then((res) => {
            this.router.navigate(['/coupons/all']);
            this.toastr.success('Coupon Added Successfully!', 'Success!');
        })
    }
     cancel(){
       this.router.navigate(['/coupons/all']);
    }
}

