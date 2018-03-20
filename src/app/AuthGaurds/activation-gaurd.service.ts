import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppService } from '../app.service';
import { FlashMessagesService } from 'ngx-flash-messages';
@Injectable()
export class ActivationGaurdService  implements CanActivate{

  constructor(private appService:AppService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }
 
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
  
  if(this.appService.user.activated||this.appService.user.isAdmin)
  {
    return true;
  }
  else{
    this.flashMessage.show("Your activation is Pending !",{classes:['ui','red','message'],timeout:3000});
            this.router.navigate(['../']);
            return false;
  }

 }
}
