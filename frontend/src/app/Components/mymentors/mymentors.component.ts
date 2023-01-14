import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorService } from 'src/app/Services/mentor.service';

@Component({
  selector: 'app-mymentors',
  templateUrl: './mymentors.component.html',
  styleUrls: ['./mymentors.component.css']
})
export class MymentorsComponent implements OnInit {
   mentors:any=[]


  constructor(private mentorService:MentorService,private router:Router) { }

  ngOnInit(): void {
    this.mentorService. subscription().subscribe((res:any)=>{
      this.mentors=res
      console.log(this.mentors)
    },error=>{
      if(error.status==0){
        this.router.navigate(['/error']);
      }}
      )


}
}