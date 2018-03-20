import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Article } from '../../models/article.model';
import { Subject } from 'rxjs/Rx';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';
@Injectable()
export class DetailsService {

  public artChange =new Subject<Article>();

  public article:Article;
  constructor(private http:Http,
              private appService:AppService,
              private router:Router,
              private flashMessage:FlashMessagesService,
              private route:ActivatedRoute
            ) { }

  //===================================================================================
  //    GETTING AN ARTICLE FROM SERVER AND AT THE SAME TIME  ASSIGNING TO LOCAL ARTICLE
  //====================================================================================

  getArticle(id:string)
   {
    let headers=new Headers();
    headers.append('Authorization', this.appService.authToken);
    
     return this.http.get("https://stormy-savannah-79310.herokuapp.com/articles/"+id,{headers:headers}).map((response:Response)=>{
     let res=response.json();
     
     if(res.success)
     {
      this.article=res.article;    
      return res.article;
     }
     else if(!res.success && res.opt==1 ) 
     {
       this.router.navigate(['articles/'+id+'/payment']);
       this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
    }
    else {

      this.router.navigate(['/']);   
      this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});
   

      
    }
     
    
         });

   }
//=====================================================================================
//          UPDATING AN ARTICLE FROM BOTH DATABASE AND LOCALLY
//===================================================================================== 

   updateArticle(id:string,article:any)
   {
 
    //LOCALLY UPDATING
      // if(this.article)
      // Object.assign(this.article, article);
 
   
     //UPDATING FROM DATABASE 
     let  header = new Headers();
     header.append('Content-Type','application/json'); 
     header.append('Authorization', this.appService.authToken);

      this.http.put("https://stormy-savannah-79310.herokuapp.com/articles/"+id,article,{headers:header})
     .subscribe((response:Response)=>{
      let res= response.json();
     
      if(res.success)
      {
        this.flashMessage.show(res.msg,{classes:['ui','green','message'],timeout:2000});
       this.article=res.article;
     
      }
     
      else{
        this.flashMessage.show(res.msg,{classes:['ui','red','message'],timeout:3000});

        
         }
      
      });
 
      setTimeout(() => {
        this.router.navigate(['/articles/'+ id]);
      }, 100);   
 
   }
//=================================
//UPDATE COMMENT
//=================================
onEdit(cmtId:string,cmt:any)
{
let comtIndex=this.article.comments.findIndex(cmt=>cmt._id==cmtId);
this.article.comments[comtIndex]=cmt;
this.artChanged();

}

//EVENT TRIGGRING ON ARTICLE 
   artChanged()
   {
     this.artChange.next(this.article);
   }


}
