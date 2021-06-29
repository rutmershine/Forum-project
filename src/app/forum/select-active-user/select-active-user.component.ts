import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-select-active-user',
  templateUrl: './select-active-user.component.html',
  styleUrls: ['./select-active-user.component.css']
})
export class SelectActiveUserComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  users: User[] = [];

  selectedUser: User;
  userId: number = -1;
  // selectedUser: User = {
  //   id: -1,
  //   displayName: ''
  // };

  ngOnInit(): void {
    this.getUsers();
    // this.initUser();//todo
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  initUser() {
    this.selectedUser = this.users[0];//todo-check it!
  }

  onChange(newValue) {//
    // console.log(newValue.id, newValue.displayName);
    // this.selectedUser = newValue;
    // // ... do other stuff here ...
    // console.log(this.selectedUser.id, this.selectedUser.displayName);


  }

  onOptionsSelected(value: string) {
    console.log("the selected value is " + value);
  }
}
