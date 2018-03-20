import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../app.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Injectable()
export class UserGaurdService  implements CanActivate {

  constructor(private appService:AppService,
              private router:Router,
              private flashMessage:FlashMessagesService
              ){}



  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean
  {
     
          if(this.appService.user.isAdmin==false)
          {
            return true;
          }
       
          else{
            this.router.navigate(['admin']);
            return false;
          }

  }

  
}