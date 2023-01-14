import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_Url = "http://localhost:3001/"
@Injectable({
  providedIn: 'root'
})
export class MentorService {
  constructor(public http: HttpClient) { }
  getallmentors() {
    return this.http.get(base_Url + "mentors")
  }

  getSinglementor(id: any) {
    return this.http.get(base_Url + "mentors/" + id)
  }

  applytomentor(id: any, applicantdata: any) {
    console.log(applicantdata)
    return this.http.post(base_Url + "assignMentorToUser/" + id, applicantdata)
  }
  subscription() {
    return this.http.get(base_Url + "subscriptions")
  }


}
