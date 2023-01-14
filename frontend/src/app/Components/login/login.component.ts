import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../Services/auth.service"
import { FormControl, FormsModule } from '@angular/forms';
import { FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  loginform:FormGroup = new FormGroup({
       email:new FormControl(null,[Validators.email,Validators.required]),
       password:new FormControl(null,[Validators.minLength(6),Validators.required])
  })
  constructor(private authService:AuthService,private router:Router) { }
 isinvalid:boolean=false;
  ngOnInit(): void {
  }

  login(){

    if(this.loginform.valid){
      this.authService.login({email:this.loginform.controls['email'].value,password:this.loginform.controls['password'].value}).subscribe((res)=>{
    this.authService.afterlogin(res)},error=>{
      if(error.status==0){
        this.router.navigate(['/error']);
      }
      else{
        console.log(error,"Username or password incorrect")
        this.isinvalid=true;
      }
    });
    }

    
    
    
  }

}
