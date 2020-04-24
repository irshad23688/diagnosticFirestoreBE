import { InterComponentService } from "./_service/inter-component.service";
import { RouteConfigLoadEnd } from "@angular/router";

const Home =  {
    text:'Home', 
    link:'/home', 
    icon:'icon-home',
    role: 'Both'
}; 

const Labs =  {
    text:'Labs', 
    link:'/labs/manageLabs', 
    icon:'fa fa-th-list',
    role:'Admin'
}; 

const Bookings =  {
    text:'Bookings', 
    link:'/bookings', 
    icon:'fa fa-th-list',
    role:'Both'
}; 
const DailyReport =  {
    text:'Daily Report', 
    link:'/dailyReport', 
    icon:'fa fa-th-list',
    role:'Both'
}; 

const Users =  {
    text:'Users', 
    link:'/users/manageUsers', 
    icon:'fa fa-users',
    role:'Admin'
}; 

const Setting =  {
    text:'Setting', 
    link:'/setting', 
    icon:'fa fa-cog',
    role:'Admin'
}; 

const Business =  {
    text:'Business Info', 
    link:'/businessInfo', 
    icon:'fa fa-briefcase'
}; 
const Coupons =  {
    text:'Coupons', 
    link:'/coupons/all', 
    icon:'fa fa-minus-square',
    role:'Admin'
}; 

const pushNotification =  {
    text:'Push Notification', 
    link:'/pushNotification', 
    icon:'fa fa-briefcase',
    role:'Admin'
}; 
const Subscribers =  {
    text:'Subscribers', 
    link:'/subscribers', 
    icon:'fa fa-rss'
}; 
const Tables =  {
    text:'Table Booking', 
    link:'/tables/booking', 
    icon:'fa fa-calendar'
}; 

const LabUsers =  {
    text:'Lab Users', 
    link:'/labusers/manageLabUsers', 
    icon:'fa fa-th-list',
    role:'Admin'
 
 }; 
// const Pages = {  
//     text: 'Pages',
//     link: '/pages',
//     icon: 'icon-doc',
//     submenu: [
//         {
//             text: 'Login',
//             link: '/login'
//         },
//         {
//             text: 'Register',
//             link: '/register'
//         },
//         {
//             text: 'Recover',
//             link: '/recover'
//         },
//         {
//             text: '404',
//             link: '/404'
//         }
//     ]
// };

// const Ecommerce = {
//     text: 'Ecommerce',
//     link: '/ecommerce',
//     icon: 'icon-basket-loaded',
//     submenu: [
//         {
//             text: 'Orders',
//             lin k: '/ecommerce/orders'
//         },
//         {
//             text: 'Order View',
//             link: '/ecommerce/orderview'
//         },
//         {
//             text: 'Products',
//             link: '/ecommerce/products'
//         },
//         {
//             text: 'Product View',
//             link: '/ecommerce/productview'
//         },
//         {
//             text: 'Checkout',
//             link: '/ecommerce/checkout'
//         }
//     ]
// }


        export const menu = [
                Home, 
                Labs, 
                LabUsers, 
                Bookings,
                DailyReport,
                Coupons, 
                Users, 
                // pushNotification, 
                // Setting, 
                // Subscribers
                //Pages
            ]; 
        
    
    



