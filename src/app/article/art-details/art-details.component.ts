import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Http, Response, Headers } from '@angular/http';
import { DetailsService } from './details.service';
import { Subscription } from 'rxjs/Subscription';
import { Article } from '../../models/article.model';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-art-details',
  templateUrl: './art-details.component.html',
  styleUrls: ['./art-details.component.css'],

})
export class ArtDetailsComponent implements OnInit,OnDestroy {

  
  subScription=new Subscription;
  id:string=null;
  article:any=null;
  deleteButton:boolean=false;
  comment:string;

  checkUser:boolean;

  constructor(private http:Http,
              public appService:AppService,
              private route:ActivatedRoute,
              private router:Router,
              private detailsService:DetailsService,
              private flashMessage:FlashMessagesService
             ) { }

  ngOnInit() {



    this.appService.getUser();
    
    this.deleteButton=false;
   this.route.params.subscribe((params:Params)=>{
     this.id=params['id'];
   });
  
 
    this.subScription=this.detailsService.artChange.subscribe((article:Article)=>{
      this.article=article;
    });

    this.detailsService.getArticle(this.id).subscribe((article:any)=>{
  
            //ASSIGNING RESPONSE ARTICLE TO LOCAL ARTICLE
               this.article=article;

             //SETTING CHECKUSER VARIABLE FOR EDIT AND DELETE ARTICLE BUTTON
               if(this.appService.user.isAdmin||(article.author.id==this.appService.user.id))
               this.checkUser=true;
               else
               this.checkUser=false;
              
             });

  
     
  
  }

//============================
//ON DELETE ARTICLE
//============================

 onDelete()
  {

    this.deleteButton=true;
    let headers=new Headers();
    headers.append('Authorization',this.appService.authToken);
  this.http.delete("https://stormy-savannah-79310.herokuapp.com/articles/"+this.id,{headers:headers})
  .subscribe((response:Response)=>{
  let res=response.json();
  
  if(res.success)
  {
    this.flashMessage.show(res.msg,{classes:['ui','green','message'],timeout:2000});
    
  }
  else{
    this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
  }

  
  



    });

  setTimeout(() => {
    this.router.navigate(['../'],{relativeTo:this.route});
  }, 400);
  
    
  }


  

  //===============================
  //LIKE ROUTE
  //===============================

  onLike()
  {
    let  header = new Headers();
    header.append('Authorization',this.appService.authToken);

    this.http.get("https://stormy-savannah-79310.herokuapp.com/articles/"+this.id+"/like",{headers:header})
    .subscribe((response:Response)=>{
      
        let res=response.json();
        if(res.success)
        {
              this.article.likes++;
              // this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'});
              
        }
        else{
          this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
        }
             });

  }

//=================================
//POST COMMENT
//=================================
onComment()
{

    let  header = new Headers();
    
    header.append('Content-Type','application/json');
    header.append('Authorization', this.appService.authToken);

    let comment={
      
      'content': this.comment
    }

    
    this.http.post("https://stormy-savannah-79310.herokuapp.com/articles/"+this.id+"/comment/",JSON.stringify(comment),{headers:header})
    .subscribe((response:Response)=>{
      //PUSHING ADDED COMMENT TO LOCAL ARRAY
      this.article.comments.push(response.json());
    });
    
    this.comment="";
}


ngOnDestroy()
{
  this.subScription.unsubscribe();
}




}
