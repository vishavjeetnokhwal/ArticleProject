import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../app.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Injectable()
export class AuthService implements CanActivate {

  constructor(private appService:AppService,
              private router:Router,
              private flashMessage:FlashMessagesService
              ){}



  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean
  {
     
          if(this.appService.user)
          {
            return true;
          }
          else{
            this.flashMessage.show("You need to Login first !",{classes:['ui','red','message'],timeout:3000});
            this.router.navigate(['login']);
            return false;
          }

  }

  
}
