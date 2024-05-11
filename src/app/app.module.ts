import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MyServiceService } from './my-service.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserProfileRoutingModule } from './user-profile/user-profile-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { RegisterRoutingModule } from './register/register-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserProfileModule,
    UserProfileRoutingModule, 
    RegisterModule,
    RegisterRoutingModule
  ],
  providers: [MyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
