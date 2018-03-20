import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(public appService:AppService ,private router:Router) { }
   
  ngOnInit() {
    this.appService.getUser();
  }

  onLogout()
  {
    this.appService.onLogOut();
    this.router.navigate(['/']);
  }

 

}
