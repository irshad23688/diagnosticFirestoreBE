import {NgModule}from '@angular/core'; 
import {Routes, RouterModule}from '@angular/router'; 
//import {ColorPickerModule, ColorPickerService} from 'angular2-color-picker/lib';
import {CustomFormsModule}from 'ng2-validation'; 
import {SharedModule}from '../../shared/shared.module'; 
 import {UsersComponent}from './users/users.component'; 
 import {AddUserComponent}from './users/add-user/add-user.component'; 
 import {ViewUserComponent}from './users/view-user/view-users.component'; 
import {SettingsComponent}from './settings/settings.component'; 
import {ProfileComponent}from './profile/profile.component'; 
import {CouponsComponent}from './coupons/coupons.component'; 
import {AddCouponsComponent}from './coupons/add-coupons/add-coupons.component'; 
import {PushNotificationComponent }from './push-notification/push-notification.component'; 
import {AuthService}from '../pages/login/auth.service'; 
import {LoginService}from '../pages/login/login.service'; 
import {Ng2PaginationModule}from 'ng2-pagination'; 
import {SubscribersComponent }from './subscribers/subscribers.component'; 
import {LabsComponent}from './labs/labs.component'; 
import {BookingsComponent}from './bookings/bookings.component'; 
import {LabMasterComponent }from './lab-master/lab-master.component'; 
import {AddServicesComponent }from './lab-master/add-services/add-services.component'; 
import {AddLocationsComponent }from './lab-master/add-locations/add-locations.component'; 
import {MatExpansionModule}from '@angular/material/expansion'; 
import {MatFormFieldModule}from '@angular/material/form-field'; 
import {MatInputModule}from '@angular/material/input'; 
import {MatSelectModule}from '@angular/material/select'; 
import {MatCardModule}from '@angular/material/card'; 
import {FormsModule, ReactiveFormsModule }from '@angular/forms'; 
import {MatButtonModule}from '@angular/material/button'; 
import {MatDialogModule}from '@angular/material/dialog'; 
import {MatTableModule}from '@angular/material/table'; 
import {MatPaginatorModule }from '@angular/material/paginator'; 
import {MatSortModule }from '@angular/material/sort'; 
import {MatSlideToggleModule}from '@angular/material/slide-toggle'; 
import {LabUsersComponent }from './lab-users/labusers.component'; 
import {DailyReportsComponent }from './daily-reports/daily-reports.component'; 
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AngularFirestore } from '@angular/fire/firestore';



@NgModule( {
    imports:[
        SharedModule, 
        CustomFormsModule, 
        Ng2PaginationModule, 
        MatInputModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MatCardModule, 
        MatSelectModule, 
        MatFormFieldModule, 
        MatExpansionModule, 
        MatButtonModule, 
        MatDialogModule, 
        MatTableModule, 
        MatPaginatorModule, 
        MatSortModule, 
        MatSlideToggleModule,
        DatePickerModule,
        
    ], 

    declarations:[   
        SettingsComponent, 
        ProfileComponent, 
        AddCouponsComponent, 
        CouponsComponent, 
        PushNotificationComponent, 
        UsersComponent, 
        ViewUserComponent, 
        AddUserComponent, 
        SubscribersComponent, 
        LabsComponent, 
        BookingsComponent, 
        LabMasterComponent, 
        AddServicesComponent, 
        AddLocationsComponent, 
        LabUsersComponent, 
        DailyReportsComponent
    ], 
    providers:[
        AuthService, 
        LoginService,
        AngularFirestore
        
    ], 
    entryComponents:[AddServicesComponent, 
        AddLocationsComponent, 
        ], 


    exports:[RouterModule, 
        Ng2PaginationModule
    ]
})



export class RestaurantModule {
}
