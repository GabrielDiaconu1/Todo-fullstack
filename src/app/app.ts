import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { remult, UserInfo } from 'remult';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { retry } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true
})
export class AppComponent {
  constructor(private http:HttpClient, private router: Router) {}

  SignOut(){
    this.http.post("/api/signOut", {})
    .subscribe(()=>(this.remult.user =undefined ));
  }

  goHome() {
    this.router.navigate(['']);
  }

  signIn(){
    this.http
    .post<UserInfo>('/api/signIn', {
      username: this.username,
      password: this.password,
    })
    .subscribe({
      next:user=>{
        this.remult.user = user;
        this.username = '';
        this.password = '';
      },
      error:(error)=>alert(error.error),
    });
  }

  username = '';
  password = '';
  remult = remult;

  ngOnInit() {
    this.http
      .get<UserInfo>('/api/currentUser')
      .pipe(retry(50))
      .subscribe((user)  => (this.remult.user = user));
  }
}
