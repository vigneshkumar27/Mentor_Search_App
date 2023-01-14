import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorService } from 'src/app/Services/mentor.service';
 const srck="../../../../assets/k.jpg"
@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
 
})
export class MentorsComponent implements OnInit {
  srck="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU2idTyJve5rn0IZCUuu-cEcz8kpa47wI0Kg&usqp=CAU"
  mentors:any=[]
  constructor(public mentorService:MentorService,private router:Router) { }

  ngOnInit(): void {
    this.mentorService.getallmentors().subscribe((res:any)=>{
      this.mentors=res.mentors
      console.log(this.mentors)
    },error=>{
      if(error.status ==0){
        this.router.navigate(['/error']);
      }
    })
  }

}
