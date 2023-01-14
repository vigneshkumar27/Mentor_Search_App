import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from 'src/app/Services/mentor.service';
import { AuthService } from 'src/app/Services/auth.service'

@Component({
  selector: 'app-mentor-detail',
  templateUrl: './mentor-detail.component.html',
  styleUrls: ['./mentor-detail.component.css']
})
export class MentorDetailComponent implements OnInit {
  id: any;
  dummyId: number = 1;
  isloggedin: boolean = false;
  issubscribed: boolean = false;
  subscriptionlist: any;
  displayStyle = "none";
  mentor: any = { name: "", specialization: "", description: "" }
  constructor(private mentorService: MentorService, private router: ActivatedRoute, private auth: AuthService, private r: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: any) => {
      this.id = params.id
      this.isloggedin = this.auth.getisauthenticated()
      this.mentorService.getSinglementor(params.id).subscribe(
        (res: any) => { this.mentor = res.mentor; console.log(this.mentor) }, error => { this.r.navigate(['error']) })
    })

    if (this.isloggedin) {
      this.subscriptionlist = this.auth.getuser()
      console.log(this.subscriptionlist.subscriptions)
      console.log(this.id)
      if (this.subscriptionlist.subscriptions.includes(this.id)) {
        console.log("subscribed")
        this.issubscribed = true
      }
      else {
        console.log("Not subscribed")
        this.issubscribed = false
      }
    }




  }
  closePopup() {
    this.displayStyle = "none";
  }
  check() {
    if (!this.isloggedin) {
      this.displayStyle = "block";
    }
    else {
      this.displayStyle = "none";
      let link = "/mentors/detail/" + this.id + "/application"
      this.r.navigateByUrl(link)
    }
  }
}