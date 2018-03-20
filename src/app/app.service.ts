import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import {Article} from './models/article.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Injectable()
export class AppService {
  
  public articles:Article[]=[];

  public editMode:boolean;

  public user:any;
  public authToken:any;

  public userCount:number=0;
  public activatedCount:number=0;
  public adminCount:number=0;
   
   





  constructor(private http:Http,
              private router:Router,
              private flashMessage:FlashMessagesService,
              private route:ActivatedRoute) { 
  
      
   }

   //========================================================================================================
   //                                 OPERATIONS ON ARTICLE
   //========================================================================================================

   //==========================
   //FETCHING ALL ARTICLES
   //==========================

   getArticles()
   {

   return this.http.get("https://stormy-savannah-79310.herokuapp.com/articles").map((response:Response)=>{
    //WRITING RESPONSE TO LOCAL ARRAY AND RETURNING OBSERVABLE
   this.articles=response.json();
      
   return response.json();

    })

   }

  
   //=========================
   //ADDING AN ARTICLE
   //=========================
   addArticle(article:any)
   {

    let  header = new Headers();
    header.append('Content-Type','application/json');
    header.append('Authorization', this.authToken);
    
     
      //ADDING AT SERVER
    return this.http.post("https://stormy-savannah-79310.herokuapp.com/articles",JSON.stringify(article),{headers:header})
    .map((response:Response)=>{
      //ADDING RESPONSE TO LOCAL STORAGE
      let res = response.json();
      if(res.success)
      {
        this.articles.push(res.article);
        this.flashMessage.show(res.msg,{classes:['ui','green','message'],timeout:2000});
       setTimeout(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      }, 100);
      }


     else{
      this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
      
      
       }

      
    

    });

    

   }


  onLogin(user:any)
  {

    let header=new Headers();
    header.append('Content-Type','application/json');
    
    return this.http.post("https://stormy-savannah-79310.herokuapp.com/login",JSON.stringify(user),{headers:header})
    .map((response:Response)=>{
      let res=response.json();
     localStorage.setItem('user',JSON.stringify(res.user));
     localStorage.setItem('id_token',res.token);
    // localStorage.setItem('user',JSON.stringify(response.json().user));     
      this.user=res.user;
      this.authToken=res.token;
      return res;
      
    });

  }
  
  
  onLogOut()
  {
    if(this.user)
    {
    this.http.get("https://stormy-savannah-79310.herokuapp.com/logout").subscribe((response:Response)=>{
    this.flashMessage.show(response.json().msg,{classes:['ui','green','message'],timeout:2000});
    this.user=undefined;
    this.authToken=undefined;
    localStorage.clear();
    });
   
  }
  
  
  }

getUser()
{
   if(!this.user)
   {
     
     if(localStorage.getItem('user')!=null)
     {
       this.authToken=localStorage.getItem('id_token');
       this.user=JSON.parse(localStorage.getItem('user'));

    }
  }

}                                    






}



