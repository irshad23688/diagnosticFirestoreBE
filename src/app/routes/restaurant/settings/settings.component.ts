import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    settings: any = {};
    settingDataRef;
    settingObservable:Observable<any>;
    constructor(public af: AngularFirestore, public toastr: ToastrService) {
        this.settingDataRef= af.collection('settings').get().subscribe((res) => {
            res.docs.forEach(item=>{
                this.settings = Object.assign(item.data(),{key:item.id});
            })
            
        });
    }

    onSubmitSetting(form: NgForm) {
        this.settingDataRef.set({totalVat: this.settings.totalVat,totalTables: this.settings.totalTables}).then((res) => {
            this.toastr.success('Settings updated Successfully!', 'Success!');
        });
    }
}