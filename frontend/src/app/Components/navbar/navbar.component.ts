import { Component, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isloggedin: boolean = false;
  currentuser: any;
  private isloggedinsubscription?: Subscription;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.isloggedin = this.authService.getisauthenticated()
    this.isloggedinsubscription = this.authService.getauthstatuslistener().subscribe((isauthenticated) => {
      this.isloggedin = isauthenticated
      this.currentuser = this.authService.getuser()
    })
  }
  onlogout() {
    this.authService.logout()
  }
  ngOnDestroy() {
    this.isloggedinsubscription?.unsubscribe()
  }
  toservice() {
    document.getElementById("service")?.scrollIntoView({ behavior: "smooth" })
  }
  tocarouselExampleCaptions() {
    document.getElementById("carouselExampleCaptions")?.scrollIntoView({ behavior: "smooth" })
  }


}
