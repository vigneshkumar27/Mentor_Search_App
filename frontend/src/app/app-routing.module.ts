import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MymentorsComponent } from './Components/mymentors/mymentors.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MentorContainerComponent } from './Components/Mentor/mentor-container/mentor-container.component';
import { MentorDetailComponent } from './Components/Mentor/mentor-detail/mentor-detail.component';
import {MentorsComponent} from './Components/Mentor/mentors/mentors.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './Services/auth.guard';
import {ApplicationComponent} from "./Components/Mentor/application/application.component"
import { ErrorComponent } from './Components/error/error.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  }
,

{
  path:"register",
  component:RegisterComponent
},
{
  path:"login",
  component:LoginComponent
},
{
  path:"mentors",
  component:MentorContainerComponent,
               children:[{
                       path:"",
                        component:MentorsComponent
                          },
                         {
                        path:"detail/:id",
                        component:MentorDetailComponent
                          },{
                            path:"detail/:id/application",
                            component:ApplicationComponent
                          }
                        

                          ]

},{
  path:"mymentors",
  component:MymentorsComponent,
  canActivate:[AuthGuard]
}
,{
  path:"error",
  component:ErrorComponent
}
,  {
  path:"**",
  component:HomeComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
