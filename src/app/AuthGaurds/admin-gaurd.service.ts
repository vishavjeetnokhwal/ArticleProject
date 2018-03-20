import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AppService } from '../app.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Injectable()
export class AdminGaurdService implements CanActivate {

  constructor( private appService:AppService,
               private flashMessage:FlashMessagesService,
               private router:Router) { }




  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean
  {
     
          if(this.appService.user.isAdmin)
          {
            return true;
          }
          
          else{
            this.router.navigate(['user']);
            return false;
          }

  }

}

