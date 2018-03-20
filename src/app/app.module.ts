import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule }  from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PaymentComponent } from './auth/payment/payment.component';
import { ArticleComponent } from './article/art-list/article/article.component';
import { ArtListComponent } from './article/art-list/art-list.component';
import { ArtDetailsComponent } from './article/art-details/art-details.component';
import { ArtEditComponent } from './article/art-edit/art-edit.component';
import { AdminComponent } from './profiles/admin/admin.component';
import { AppService } from './app.service';
import { CommentComponent } from './article/art-details/comment/comment.component';
import { ShortPipe } from './short.pipe';
import {FlashMessagesModule} from 'ngx-flash-messages';

import { UserComponent } from './profiles/user/user.component';
import { UsersComponent } from './profiles/admin/user/user.component';


import { AuthService } from './AuthGaurds/auth.service';
import {AdminGaurdService} from './AuthGaurds/admin-gaurd.service';
import {UserGaurdService} from './AuthGaurds/user-gaurd.service';
import { ActivationGaurdService } from './AuthGaurds/activation-gaurd.service';
import { OnErrorComponent } from './on-error/on-error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    PaymentComponent,
    ArticleComponent,
    ArtListComponent,
    ArtDetailsComponent,
    ArtEditComponent,
    UserComponent,
    UsersComponent,
    AdminComponent,
    CommentComponent,
    ShortPipe,
    OnErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule
    
  ],
  providers: [AppService,AuthService,AdminGaurdService,UserGaurdService,ActivationGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
