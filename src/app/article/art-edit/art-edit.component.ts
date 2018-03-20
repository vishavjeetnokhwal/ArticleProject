import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../../app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from '../../models/article.model';
import { DetailsService } from '../art-details/details.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-art-edit',
  templateUrl: './art-edit.component.html',
  styleUrls: ['./art-edit.component.css']
})
export class ArtEditComponent implements OnInit,OnDestroy {

  subScription=new Subscription;
  artForm: NgForm;
  editMode: boolean = false;
  article: any = null;
  title: string = null;
  image: string = null;
  desc: string = null;
  id: string;
  loading:boolean;

  constructor(private route: ActivatedRoute,private detailsService:DetailsService, private appService: AppService, private router: Router) { }

 
 
  ngOnInit() {
    this.loading=false;
    this.appService.getUser();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      
      this.subScription=this.detailsService.artChange.subscribe((article:Article)=>{

        this.article=article;
      });

      if (this.editMode) {

        if(this.detailsService.article)
        {
        this.article = this.detailsService.article;
        this.initForm();  
      }
        else{
          this.detailsService.getArticle(this.id).subscribe((article:Article)=>
          {
            this.article=article;
            this.initForm();
          });
        }
        
      }
      

    });



  }
 
  //===================================================
  //FORM INITIALISATION
  //===================================================

  initForm() {

    this.title = this.article.title;
    this.image = this.article.image;
    this.desc = this.article.desc;
  }

  //===================================================
  /// ON FORM SUBMITION
  //===================================================

  onSubmit(form: NgForm) {

    this.loading=true;
    if (this.editMode) {
      
      this.detailsService.updateArticle(this.id,{
               'title' : this.title,
                'image' : this.image,
                'desc' :this.desc
      });
    }

    else {

      this.appService.addArticle({
         // 'id': Math.random(),
          'likes':0,
          'title': form.value.title,
          'image': form.value.image,
          'desc': form.value.desc,
          'author': "Vishavjeet"
         
          //'author': this.appService.user.name,
    
      }).subscribe((data)=>{
        this.loading=false;
      });

    }

this.title ="";
this.image="";
this.desc="";

  
    
    

  }
 
  //===================================================
  //ON CANCEL
  //===================================================
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy()
  {
    this.subScription.unsubscribe();
  }

}
