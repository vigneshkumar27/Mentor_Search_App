import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule,Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm = new FormGroup({
  username:new FormControl(null,[Validators.minLength(5),Validators.required]),
  email:new FormControl(null,[Validators.email,Validators.required]),
  password:new FormControl(null,[Validators.minLength(6),Validators.required]),
  copassword:new FormControl(null,[Validators.minLength(6),Validators.required])
})
passwordmatchs:boolean=true;

  constructor(private authService:AuthService,private router:Router) { }
  validmail:boolean=false;
  ngOnInit(): void {
  }
  register(){
  
   this.passwordmatchs = this.registerForm.controls['copassword'].value == this.registerForm.controls['password'].value;
  if(this.registerForm.valid && this.passwordmatchs){
      console.log("valid form")
       this.authService.register({
         username:this.registerForm.controls['username'].value,
         email:this.registerForm.controls['email'].value,
         password:this.registerForm.controls['password'].value
                  
      
      
      }).subscribe((res)=>{
      console.log(res)
      this.authService.afterregister()
    },(err)=>{
      if(err.status == 0){
        this.router.navigate(['/error']);
      }
      else{
        this.validmail=true;
      }

    })
  }

}

}
