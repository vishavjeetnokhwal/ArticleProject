import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import {FlashMessage} from 'angular-flash-message';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http:Http,
              private router:Router,
              public appService:AppService,
              private flashMessage:FlashMessagesService
            ) { }

  ngOnInit() {
    this.appService.getUser();
  }


  onSubmit(form:NgForm)
  {

    let header=new Headers();
     header.append('Content-Type','application/json');
    
    
     this.http.post("https://stormy-savannah-79310.herokuapp.com/register",form.value,{headers:header})
     .subscribe((response:Response)=>{
      
       form.reset();
       if(response.json().success)
       {
        
this.flashMessage.show(response.json().msg,{classes:['ui','green','message'],timeout:2000});       this.router.navigate(['login']);
        
       }
       else
       {
        this.flashMessage.show(response.json().msg,{classes:['ui','red','message'],timeout:3000});       this.router.navigate(['login']);

       }
      });

     

    
  }

}
