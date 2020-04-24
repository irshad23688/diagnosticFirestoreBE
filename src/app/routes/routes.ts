import { NgModule } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from './home/home/home.component';
import { AuthService } from './pages/login/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './pages/login/login.service';
import { BookingsComponent } from './restaurant/bookings/bookings.component';
import { AddCouponsComponent } from './restaurant/coupons/add-coupons/add-coupons.component';
import { CouponsComponent } from './restaurant/coupons/coupons.component';
import { LabMasterComponent } from './restaurant/lab-master/lab-master.component';
import { LabsComponent } from './restaurant/labs/labs.component';
import { ProfileComponent } from './restaurant/profile/profile.component';
import { PushNotificationComponent } from './restaurant/push-notification/push-notification.component';
import { SettingsComponent } from './restaurant/settings/settings.component';
import { SubscribersComponent } from './restaurant/subscribers/subscribers.component';
import { AddUserComponent } from './restaurant/users/add-user/add-user.component';
import { UsersComponent } from './restaurant/users/users.component';
import { ViewUserComponent } from './restaurant/users/view-user/view-users.component';
import { DailyReportsComponent } from './restaurant/daily-reports/daily-reports.component';
import { LabUsersComponent } from './restaurant/lab-users/labusers.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoverComponent } from './pages/recover/recover.component';
import { Error404Component } from './pages/error404/error404.component';



export const routes = [ {path:'', component:LoginComponent, useAsDefault:true},  {path:'login', component:LoginComponent},  {
        path:'', 
        component:LayoutComponent, 
        children:[ {path:'home', component:HomeComponent, canActivate:[AuthService]},  {path:'pushNotification', component:PushNotificationComponent, canActivate:[AuthService]},  {
                path:'coupons', 
                children:[ {path:'all', component:CouponsComponent, canActivate:[AuthService]},  {path:'addCoupons', component:AddCouponsComponent, canActivate:[AuthService]}
                    
               ]
           },  {
                path:'labs', 
                children:[ {path:'manageLabs', component:LabsComponent, canActivate:[AuthService]}

                ]
            },
            {
                path:'labusers', 
                children:[ {path:'manageLabUsers', component:LabUsersComponent, canActivate:[AuthService]}

                ]
            },
            {
                path:'bookings',  component:BookingsComponent, canActivate:[AuthService]
            },  {
                path:'users', 
                children:[ {path:'manageUsers', component:UsersComponent, canActivate:[AuthService]},  {path:'addUser', component:AddUserComponent, canActivate:[AuthService]},  {path:'viewUser/:id', component:ViewUserComponent, canActivate:[AuthService]}

                ]
            },  
            // {path:'setting', component:SettingsComponent, canActivate:[AuthService]},  
            // {path:'UserProfile', component:ProfileComponent, canActivate:[AuthService]},  
            // {path:'subscribers', component:SubscribersComponent, canActivate:[AuthService]}, 
            {path:'lab-master', component:LabMasterComponent, canActivate:[AuthService]}, 
            {path:'dailyReport', component:DailyReportsComponent, canActivate:[AuthService]}, 


        ] // children End manageLabUsers
    }, 

    // Not lazy-loaded routes {path:'login', component:LoginComponent },  
    {path:'register', component:RegisterComponent },  
    {path:'recover', component:RecoverComponent },  
    {path:'404', component:Error404Component }, 

    // Not found {path:'**', redirectTo:'404'}

]; 

@NgModule( {
providers:[
        
        AuthService, 
        LoginService
    ]
})
class RestModule {
}
