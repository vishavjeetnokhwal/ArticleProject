import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppService } from '../../../app.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UsersComponent implements OnInit {
@Input() user;
  constructor(private http:Http,
              private appservice:AppService,
              private flashMessage:FlashMessagesService

              ) { }

  ngOnInit() {
  }

  onActivate()
  {
    let headers=new Headers();
    headers.append('Authorization',this.appservice.authToken);
    this.http.get("https://stormy-savannah-79310.herokuapp.com/admin/"+this.user._id,{headers:headers})
    .subscribe((response:Response)=>{

      let res=response.json();
      if(res.success)
      {
        if(this.user.isAdmin)
        this.appservice.adminCount--;
        
        this.user=res.user;
        if(this.user.activated)
        this.appservice.activatedCount++;
        if(!this.user.activated)
        this.appservice.activatedCount--;
        
      }
      else{
        this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});

        
      }

    });
  }

  onDelete()
  {
    let headers=new Headers();
    headers.append('Authorization',this.appservice.authToken);
    this.http.delete("https://stormy-savannah-79310.herokuapp.com/admin/"+this.user._id,{headers:headers})
    .subscribe((response:Response)=>{
     
      let res=response.json();
      if(res.success)
      {
        if(this.user.activated)
        this.appservice.activatedCount--;
        if(this.user.isAdmin)
        this.appservice.adminCount--;

        this.appservice.userCount--;
        this.flashMessage.show(res.msg,{classes:['ui','green','message'],timeout:2000});
        this.user=undefined;

      }
      else{
        this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
      }

    });
  }


  onAdmin()
  {
    let headers=new Headers();
    headers.append('Authorization',this.appservice.authToken);

    this.http.get("https://stormy-savannah-79310.herokuapp.com/admin/"+this.user._id+"/isAdmin",{headers:headers})
    .subscribe((response:Response)=>{

      let res=response.json();
      if(res.success)
      {
        this.flashMessage.show(res.msg,{classes:['ui','green','message'],timeout:2000});
        this.user=res.user;
        this.appservice.adminCount++;
      }
      else{
        this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
      }

    });
  }



}
