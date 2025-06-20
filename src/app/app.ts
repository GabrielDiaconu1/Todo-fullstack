import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { remult, UserInfo } from 'remult';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from './todo/todo';
import { retry } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, FormsModule, Todo],
  standalone: true
})
export class AppComponent {
  constructor(private http:HttpClient) {}

  SignOut(){
    this.http.post("/api/signOut", {})
    .subscribe(()=>(this.remult.user =undefined ));
  }

  signIn(){
    this.http
    .post<UserInfo>('/api/signIn', {
      username: this.username,
    })
    .subscribe({
      next:user=>{
        this.remult.user = user;
        this.username = '';
      },
      error:(error)=>alert(error.error),
    });
  }

  username = '';
  remult = remult;

  ngOnInit() {
    this.http
      .get<UserInfo>('/api/currentUser')
      .pipe(retry(50))
      .subscribe((user)  => (this.remult.user = user));
  }
}
