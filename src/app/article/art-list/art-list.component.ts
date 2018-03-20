import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Response } from '@angular/http';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit {

  public articles:Article[];


  constructor(private appService:AppService) { }

  ngOnInit() {
    this.appService.getUser();
    this.appService.getArticles().subscribe((response:any[])=>{
      this.articles=response;
    });
    
    
  }

}
