import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { config } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: BehaviorSubject<User[]> = new BehaviorSubject([]);//למה זה לא תקין??
  // let localArray: Observable<MyObject>[] = [];
  constructor(private http: HttpClient) { }


  getUsers() {
    // return this.http.get<User[]>(config.usersUrl);
    // this.users =  this.http.get<User[]>(config.usersUrl);
    // return this.users;

    if(!this.users.value.length){
      this.http.get<User[]>(config.usersUrl).subscribe(users=>this.users.next(users));
    }

    return this.users;
  }

  getUserById(id: number){
    // let user: User | undefined;
    // // return this.users.pipe//איך מסננים רק את המשתמש של האידי מתוך הרשימה??
    // this.users.subscribe(users => user = users.find(u => u.id === id));

    // return user;
    // // this.users.subscribe(users => usersList = users);
    // //   usersList.find(u => u.id === userId));

    return this.users.pipe(map(users=> users.find(user => user.id == id)));


  }
}
