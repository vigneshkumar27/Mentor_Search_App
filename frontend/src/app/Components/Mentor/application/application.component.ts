import { Component, OnInit } from '@angular/core';
import { MentorService } from 'src/app/Services/mentor.service';
import {AuthService} from 'src/app/Services/auth.service'
import { FormControl, FormsModule } from '@angular/forms';
import { FormGroup,Validators} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  id:any;
  isloggedin:boolean=false;
  flag:boolean=true;
  isChecked:any=false;
   applicantdata:any;
   issubscribed=false;
  constructor(private mentorService:MentorService,private router:ActivatedRoute,private auth:AuthService) { }
  applicationform = new FormGroup({
    firstname:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    lastname:new FormControl(null,[Validators.required,Validators.minLength(1)]),
     email:new FormControl(null,[Validators.required,Validators.email]),
   country:new FormControl(null,[Validators.required]),
   about:new FormControl(null,[Validators.required,Validators.minLength(10)])
  })
  ngOnInit(): void {
    this.router.params.subscribe((params: any) => {
      this.id = params.id
      console.log(this.id+"Id coreeesponds to the user")
      this.isloggedin = this.auth.getisauthenticated()
     })
    //   let subscriptionlist= this.auth.getuser()
    // console.log(subscriptionlist)
    // console.log(this.mentor._id + "This is the mentor id")
    // if(subscriptionlist.includes(this.mentor._id)){
    //   console.log("subscribed")
    //  this.issubscribed=true
    // }
    // else{
    //   console.log("Not subscribed")
    //  this.issubscribed=false
    // }
}

  isinvalid:boolean=false;
  addpplytomentor(){
     if(this.applicationform.valid){
    this.applicantdata={firstname:this.applicationform.controls["firstname"].value,
                        lastname:this.applicationform.controls['lastname'].value,
                        email:this.applicationform.controls["email"].value,
                        country:this.applicationform.controls["country"].value,
                        about:this.applicationform.controls["about"].value}
    console.log(this.applicantdata)
    this.mentorService.applytomentor(this.id,this.applicantdata).subscribe((res)=>{
      console.log("Subscribed",res)
    })
    console.log("Valid form")
  }
  else{
   
  }
  
  
}


  change(event:any){
console.log(event)
if(event=='A'){
  this.flag=false;
}if(event=='B'){
  this.flag=true;
}
  }

}
