import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from '../../app.service';
import { FlashMessagesService } from 'ngx-flash-messages';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  id:string;

  constructor(private http:Http,
              private route:ActivatedRoute,
              private  router:Router,
              private appService:AppService,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
    });

    this.appService.getUser();
   
  }
  
  onPayment()
  {
    let headers=new Headers();
    headers.append('Authorization',this.appService.authToken);
     this.http.get("https://stormy-savannah-79310.herokuapp.com/payments/"+this.id,{headers:headers})
     .subscribe((response:Response)=>{

      let res=response.json();
      if(res.success)
      {
        this.flashMessage.show(res.msg,{classes:['ui','green','message'],timeout:2000});
        setTimeout(() => {
          this.router.navigate(['../'],{relativeTo:this.route});
        }, 200);
      }
      else{
        this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
        
      }

     });
  }

}
