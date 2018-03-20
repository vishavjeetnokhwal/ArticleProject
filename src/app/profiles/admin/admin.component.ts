import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Http, Headers, Response } from '@angular/http';
import { FlashMessagesService } from 'ngx-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users:any[];
  public admin:any;
  
  
  constructor(public appService:AppService,
               private http:Http,
                private flashMessage:FlashMessagesService,
                private router:Router) { }

  ngOnInit() {
    this.appService.adminCount=0;
    this.appService.activatedCount=0;
    this.appService.userCount=0;
    
    this.appService.getUser();
    this.admin=this.appService.user;
    let headers=new Headers();
    headers.append('Authorization',this.appService.authToken);
    this.http.get("https://stormy-savannah-79310.herokuapp.com/admin",{headers:headers}).subscribe((response:Response)=>{
      let res=response.json();
      if(res.success)
      {

        this.users=res.users;
        res.users.forEach((user) => {
          this.appService.userCount++;
          if(user.activated)
          this.appService.activatedCount++;
          if(user.isAdmin)
          this.appService.adminCount++;
          
        });
      }
      else{
        this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
        this.router.navigate(['/']);
          
      }
    });

  
  }

}
