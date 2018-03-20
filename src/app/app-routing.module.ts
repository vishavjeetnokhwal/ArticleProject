import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { ArtListComponent } from './article/art-list/art-list.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ArtDetailsComponent } from './article/art-details/art-details.component';
import { AdminComponent } from './profiles/admin/admin.component';
import { UserComponent } from './profiles/user/user.component';
import { ArtEditComponent } from './article/art-edit/art-edit.component';
import { PaymentComponent } from './auth/payment/payment.component';
import { UsersComponent } from './profiles/admin/user/user.component';
import { AuthService } from './AuthGaurds/auth.service';
import { AdminGaurdService } from './AuthGaurds/admin-gaurd.service';
import { UserGaurdService } from './AuthGaurds/user-gaurd.service';
import { ActivationGaurdService } from './AuthGaurds/activation-gaurd.service';
import { OnErrorComponent } from './on-error/on-error.component';

const appRoutes:Routes=[

{path:'',redirectTo:'/articles',pathMatch:'full'},

{path:'articles',                                         component:ArtListComponent},
{path:'articles/new',         canActivate:[AuthService,ActivationGaurdService],  component:ArtEditComponent,pathMatch:'full'},
{path:'articles/:id',         canActivate:[AuthService],  component:ArtDetailsComponent},
{path:'articles/:id/edit',    canActivate:[AuthService],  component:ArtEditComponent},
{path:'articles/:id/payment', canActivate:[AuthService],  component:PaymentComponent,pathMatch:'full'},

{path:'admin',                canActivate:[AuthService,AdminGaurdService],  component:AdminComponent},
{path:'user',                 canActivate:[AuthService,UserGaurdService],  component:UserComponent},
{path:'login',                                            component:SigninComponent},
{path:'register',                                         component:SignupComponent},
{path:'**',component:OnErrorComponent}



];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
  
})
export class AppRoutingModule { }
