import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InterComponentService } from '../../_service/inter-component.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
declare var swal:any;
@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.css']
})
export class DailyReportsComponent implements OnInit, AfterViewInit {
  displayedColumns:string[] = ['position', 'bookingId','appointDate','paymentId', 'labName','pStatus','status', 'service', 'price']; 
  dataSource;
  product;
  loaderShow=true;
  @ViewChild(MatPaginator)paginator:MatPaginator; 
  @ViewChild(MatSort)sort:MatSort; 
  transactions=[];
  labsDataRef;
  labObservable;
  labsDataRef1;
  startDateValue;
  endDateValue;
  labKey;
  labusersDataRef;
  userObservable;
  labusers;
  role;
  pStatus;
  bStatus;
  pKey;
  bKey;
  constructor( private af: AngularFirestore, private afd: AngularFireAuth, private interComp: InterComponentService) { 
    // this.getProductDetail();
    
    // rootDbRef.on('value', snapshot => console.log(snapshot.val()));
  }
  ngAfterViewInit(){
    this.interComp.getMessage().subscribe(res=>{
      this.role=res;
    })
    console.log(this.role)
  }

  ngOnInit() {
    this.labusers=[]
    this.af.collection('labs').get().subscribe((res)=>{
      res.docs.forEach(item=>{
        this.labusers.push(Object.assign(item.data(),{key:item.id}));
      });
      this.labusers.push({labname:'All',key:'All'});
      console.log(this.labusers);
    },error=>{
      this.loaderShow=true;
      swal.fire('Something Went Wrong!')
    });
    this.pStatus=[{
      value: 'SUCCESS',
      name:'Success'
    },
    {
      value: 'FAILURE',
      name:'Failure'
    },
    {
      value: 'Pending',
      name:'Pending'
    },
    {
      value: 'All',
      name:'All'
    }
  ]
  this.bStatus=[{
    value: 'Completed',
    name:'Completed'
  },
  {
    value: 'Booked',
    name:'Booked'
  },
  {
    value: 'Cancelled',
    name:'Cancelled'
  },
  {
    value: 'All',
    name:'All'
  }
];
  }

 getProductDetail(key,pKey,bKey,sDate,eDate){
    let userLabKey;
    this.loaderShow=false;
    console.log('key',key)
    // this.labsDataRef = this.af.list('/bookings');
    if (this.afd.auth.currentUser) {
      const userId = this.afd.auth.currentUser.uid;
      this.af.collection('users').doc(userId).valueChanges().subscribe((res: any) => {
        console.log(res);
        userLabKey=res
        // this.role=res.role;
        console.log('106',userLabKey);
        if(res.role==='Admin'){  
          if(key==='All' && pKey==='All' && bKey==="All"){
            this.labsDataRef1 = this.af.collection('bookings',ref => ref.where("appointDate",">=",sDate).where("appointDate","<=",eDate)).get().subscribe(res=>{
              this.transactions=[];
              this.loaderShow=true;
              res.docs.forEach(element => {
                this.transactions.push(Object.assign(element.data(),{key:element.id}))
                console.log('outIf',this.transactions);
              });
            },error=>{
              this.loaderShow=true;
              swal.fire('Something Went Wrong!')
            });
          } else if(key==='All' && pKey==='SUCCESS' && bKey==="Completed"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
            
          } else if(key==='All' && pKey==='FAILURE' && bKey==="Completed"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);

          } else if(key==='All' && pKey==='Pending' && bKey==="Completed"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);

          } else if(key==='All' && pKey==='SUCCESS' && bKey==="Booked"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);

          } else if(key==='All' && pKey==='FAILURE' && bKey==="Booked"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);

          } else if(key==='All' && pKey==='Pending' && bKey==="Booked"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);

          } else if(key==='All' && pKey==='SUCCESS' && bKey==="Cancelled"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);

          } else if(key==='All' && pKey==='FAILURE' && bKey==="Cancelled"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);

          } else if(key==='All' && pKey==='Pending' && bKey==="Cancelled"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);

          }  
          else if( pKey==='Pending' && bKey==="Booked"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          } else if( pKey==='SUCCESS' && bKey==="Booked"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          } else if( pKey==='FAILURE' && bKey==="Booked"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          } else if( pKey==='Pending' && bKey==="Cancelled"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          } else if( pKey==='SUCCESS' && bKey==="Cancelled"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          } else if( pKey==='FAILURE' && bKey==="Cancelled"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          } else if( pKey==='Pending' && bKey==="Completed"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          } else if( pKey==='SUCCESS' && bKey==="Completed"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          } else if( pKey==='FAILURE' && bKey==="Completed"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          }
          else if( pKey==='All' && bKey==="Booked"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          }
          else if( pKey==='All' && bKey==="Cancelled"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          }
          else if( pKey==='All' && bKey==="Completed"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          }
          else if( pKey==='SUCCESS' && bKey==="All"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          }
          else if( pKey==='FAILURE' && bKey==="All"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          }
          else if( pKey==='FAILURE' && bKey==="All"){
            this.getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate);
          }
          
          
        } 
        else{
          this.labsDataRef1 = this.af.collection('bookings',ref => ref.where("appointDate",">=",sDate)
          .where("appointDate","<=",eDate).where("labKey","==",userLabKey.labKey)).get().subscribe(res=>{
            this.transactions=[];
            this.loaderShow=true;
            console.log('outIf',res);

            res.docs.forEach(element => {
              this.transactions.push(Object.assign(element.data(),{key:element.id}))
              console.log('outIf',this.transactions);
            });
          },error=>{
            this.loaderShow=true;
            swal.fire('Something Went Wrong!')
          });
        }
            },error=>{
              this.loaderShow=true;
              swal.fire('Something Went Wrong!')
            });
    
    }
  }
  getResBasedOnDropDwn(key,pKey,bKey,sDate,eDate){
    this.loaderShow=false;
    console.log(key,pKey,bKey,sDate,eDate);
    if(key==='All'){
      this.labsDataRef1 = this.af.collection('bookings',ref => ref.where("appointDate",">=",sDate)
      .where("appointDate","<=",eDate)
      .where("pStatus","==",pKey)
      .where("status","==",bKey)).get().subscribe(res=>{
        console.log(res);
        this.loaderShow=true;
        this.transactions=[];
        res.docs.forEach(element => {
          console.log('outIfss',element.data(),element.id);
          this.transactions.push(Object.assign(element.data(),{key:element.id}));
        });
      },error=>{
        this.loaderShow=true;
        swal.fire('Something Went Wrong!')
      });
    } else{
      this.labsDataRef1 = this.af.collection('bookings',ref => ref.where("appointDate",">=",sDate)
    .where("appointDate","<=",eDate).where("labKey","==",key)
    .where("pStatus","==",pKey)
    .where("status","==",bKey)).get().subscribe(res=>{
      console.log(res);
      this.loaderShow=true;
      this.transactions=[];
      res.docs.forEach(element => {
        console.log('outIfss',element.data(),element.id);
        this.transactions.push(Object.assign(element.data(),{key:element.id}));
      });
    },error=>{
      this.loaderShow=true;
      swal.fire('Something Went Wrong!')
    });
    }
    
  }

  getTotalCost() {
    return this.transactions.map(t => t.payableAmount).reduce((acc, value) => (parseInt(acc) + parseInt(value)));
  }
  submit(){
    if(this.role==='Admin'){
      if(this.labKey===undefined || this.startDateValue===undefined  || this.endDateValue===undefined){
        swal.fire('All fields are compulsory');
      } else{
        let sDate= this.formatDate(this.startDateValue);
        let eDate= this.formatDate(this.endDateValue);
        if(eDate< sDate){
          swal.fire('End Date Should be greater than Start Date');
        }
        else{
          this.getProductDetail(this.labKey,this.pKey,this.bKey,sDate,eDate);
  
        }
      }
    } else{
      console.log('Else mein gaya', this.startDateValue,this.endDateValue)
      if(this.startDateValue===undefined  || this.endDateValue===undefined){
        swal.fire('All fields are compulsory');
      } else{
        let sDate= this.formatDate(this.startDateValue);
        let eDate= this.formatDate(this.endDateValue);
        if(eDate< sDate){
          swal.fire('End Date Should be greater than Start Date');
        }
        else{
          this.getProductDetail(this.labKey,this.pKey,this.bKey,sDate,eDate);
  
        }
      }
    }
   
    if(this.labKey==='All'){
      let sDate= this.formatDate(this.startDateValue);
      let eDate= this.formatDate(this.endDateValue);
      if(eDate< sDate){
        swal.fire('End Date Should be greater than Start Date');
      }else{
        this.getProductDetail(this.labKey,this.pKey,this.bKey,sDate,eDate);
      }
    }else if(this.pKey==='All'){
      let sDate= this.formatDate(this.startDateValue);
      let eDate= this.formatDate(this.endDateValue);
      if(eDate< sDate){
        swal.fire('End Date Should be greater than Start Date');
      }else{
        this.getProductDetail(this.labKey,this.pKey,this.bKey,sDate,eDate);
      }
    }else if(this.bKey==='All'){
      let sDate= this.formatDate(this.startDateValue);
      let eDate= this.formatDate(this.endDateValue);
      if(eDate< sDate){
        swal.fire('End Date Should be greater than Start Date');
      }else{
        this.getProductDetail(this.labKey,this.pKey,this.bKey,sDate,eDate);
      }
    }
    
    console.log(this.labKey, this.formatDate(this.startDateValue), this.formatDate(this.endDateValue))
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
  }
}