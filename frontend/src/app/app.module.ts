import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './Services/auth.service'; 
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { MentorContainerComponent } from './Components/Mentor/mentor-container/mentor-container.component';
import { MentorDetailComponent } from './Components/Mentor/mentor-detail/mentor-detail.component';
import { MentorsComponent } from './Components/Mentor/mentors/mentors.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MymentorsComponent } from './Components/mymentors/mymentors.component';

import { AuthInterceptor } from './Services/auth.interceptor';
import { AuthGuard } from './Services/auth.guard';
import { ApplicationComponent } from './Components/Mentor/application/application.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ErrorComponent } from './Components/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MentorContainerComponent,
    MentorDetailComponent,
    MentorsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    MymentorsComponent,
    ApplicationComponent,
    FooterComponent,
    ErrorComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule

  ],
  providers: [AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
