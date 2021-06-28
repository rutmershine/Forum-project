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

  selectedUser: User = {
    id: -1,
    displayName: ''
  };

  ngOnInit(): void {
    this.getUsers();
    this.initUser();//todo
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  initUser() {
    this.selectedUser = this.users[0];//todo-check it!
  }

}
