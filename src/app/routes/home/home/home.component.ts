import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ColorsService } from '../../../shared/colors/colors.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudRepositoryService } from '../../_service/crud-repository.service';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    
 // Bar chart
    // -----------------------------------
  newData=[];
   barData = {
       labels: [],
       datasets:[{
           data:[]
       }]
       
   };

    barColors = [
        {
            backgroundColor: this.colors.byName('info'),
            borderColor: this.colors.byName('info'),
            pointHoverBackgroundColor: this.colors.byName('info'),
            pointHoverBorderColor: this.colors.byName('info')
        }];

    barOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };

  // Pie chart
    // -----------------------------------

    pieData = {
        labels: [],
        datasets: [{
            data: []
        }]
    };

    pieColors = [{
        borderColor: [
            this.colors.byName('info'),
            this.colors.byName('yellow'),
            this.colors.byName('purple'),
            this.colors.byName('warning'),
            this.colors.byName('danger'),
            this.colors.byName('inverse'),
            this.colors.byName('pink'),
            this.colors.byName('green'),
            this.colors.byName('gray-darker'),
            this.colors.byName('primary')
        ],
        backgroundColor: [
            this.colors.byName('info'),
            this.colors.byName('yellow'),
            this.colors.byName('purple'),
            this.colors.byName('warning'),
            this.colors.byName('danger'),
            this.colors.byName('inverse'),
            this.colors.byName('gray-darker'),
            this.colors.byName('green'),
            this.colors.byName('pink'),
            this.colors.byName('primary')
        ],
    }];

    pieOptions = {
        responsive: true
    };
     menuItems:any;
     categories:any;
     orders:Array<any>;
     order:any;
     ordersDataRef;
     orderDataRefObservable:Observable<any>;
     ordersRef;
     orderObservable:Observable<any>;

     datePipeEn: DatePipe = new DatePipe('en-US')
    constructor(private colors: ColorsService, private http: Http, public af:AngularFirestore,private crudRep: CrudRepositoryService, @Inject(LOCALE_ID) private _locale: string) {
     
     crudRep.getData('menuItems').subscribe((res)=>{
         this.menuItems = res.length;
     });
     crudRep.getData('categories').subscribe((res)=>{
         this.categories = res.length;
     });
    //   this.ordersDataRef = af.list('/orders');
     
    }
   
    

    ngOnInit() {
     let lastOrder:any[]=[];     
      /*this.ordersRef =   this.af.list('/orders/'   , {
              query: {
                limitToLast: 1
              }
            });*/
      this.orderObservable = this.af.collection('order/',ref => ref.limit(1)).valueChanges();

      this.orderObservable.subscribe((res)=>{             
               lastOrder = res;               
               
              if(lastOrder.length>0){
               var lastDate:any = lastOrder[0].createdAt;
             
               this.barData.labels=[];
              
               var x;
              var dayDuration = 86400000;
                x = 7;
                lastDate -= 6*dayDuration;
         
              
              for(var i = 0; i < x; i++) {
               
               this.barData.labels.push(this.datePipeEn.transform(lastDate, 'dd MMMM'));
                lastDate += dayDuration;               
              }
              this.orderDataRefObservable = this.ordersDataRef.valueChanges();
              this.orderDataRefObservable.subscribe((res)=>{
             
              this.orders = res;
              this.order = res.length;
               this.barData.datasets[0].data=[];
              for (var i = 0; i  <= this.barData.labels.length- 1; i++) {
                    var dayValue = 0;
                 for (var j = 0; j  <= this.orders.length- 1; j++) {       
                   var orderDate = this.datePipeEn.transform(this.orders[j].createdAt, 'dd MMMM');
                    if (orderDate === this.barData.labels[i]) {
                      dayValue += this.orders[j].grandTotal;
                    }
                      }
                  this.barData.datasets[0].data.push(dayValue);
              }
           })
            }
             
              

            
        })

            //Pie Chart
            let category=[]
               this.af.collection('categories').get().subscribe((cat)=>{
                    cat.docs.forEach(item=>{
                        category.push(Object.assign(item.data(),{key:item.id}));
                        this.crudRep.getData('menuItems').subscribe((menuitem:any)=>{
                            for (var i = 0; i  <= category.length- 1; i++) {
                                  var x = 0;
                                  var quantity = 0;
                                   for (var j = 0; j  <= menuitem.length- 1; j++) { 
                                   if (menuitem[j].category === category[i].key) {
                                      x++;
                                      quantity++;
                                   }
                                }
                                this.pieData.labels.push(category[i].title);
                                this.pieData.datasets[0].data.push(quantity);
                              }
                           });
                    })
                  
            });
     }

     
    

    colorByName(name) {
        return this.colors.byName(name);
    }

}
