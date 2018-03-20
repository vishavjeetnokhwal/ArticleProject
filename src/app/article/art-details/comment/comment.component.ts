import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { DetailsService } from '../details.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment;
 checUser:boolean;
 editedComment:string;
 editCmtMode:boolean=false;
  constructor(private http:Http,
              private detailsService:DetailsService,
              private flashMessage:FlashMessagesService,
              private appService:AppService
            ) { }

  ngOnInit() {

     if(this.appService.user.isAdmin||(this.comment.author.id==this.appService.user.id))
     this.checUser=true;
     else
     this.checUser=false;

  }



  onDelete()
  {
  
  
    
    
  let headers=new Headers();
    headers.append('Authorization',this.appService.authToken);

    //DELETING FROM SERVER
    this.http.delete("https://stormy-savannah-79310.herokuapp.com/comment/"+this.comment._id,{headers:headers}).subscribe((response:Response)=>{
    let res=response.json(); 
    if(res.success)
    {
      
      this.comment=null;
      this.flashMessage.show(res.msg,{classes:['ui','green','message'],timeout:2000});
    }
     else
     this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
      
      this.detailsService.artChanged();
         
    });
  
    
  }

  onEdit()
  {
    this.editCmtMode=true;
    this.editedComment=this.comment.content;
    this.comment.content=null;
  }


///===================================================
///             UPDATING COMMENT
//====================================================

  onUpdateCmt()
  {
    this.editCmtMode=false;

    let headers=new Headers();

    headers.append('Content-Type','application/json');
    headers.append('Authorization', this.appService.authToken);
    
    let newComment={

      'content':this.editedComment
    }

    this.http.put("https://stormy-savannah-79310.herokuapp.com/comment/"+this.comment._id,JSON.stringify(newComment),{headers:headers})
    .subscribe((response:Response)=>{
      let res=response.json();
      if(res.success)
      {

      this.comment=res.cmt;
      this.flashMessage.show(res.msg,{classes:['ui','green','message'],timeout:2000});
        
      }
    });

  }

 

}
