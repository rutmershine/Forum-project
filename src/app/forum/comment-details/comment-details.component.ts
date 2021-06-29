import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/interfaces/Comment';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {

  @Input() comment: Comment = {
    id: -1,
    parentCommentId: -1,
    ownerId: -1,
    txt: '',
    createdAt: Date.now,
    deletedAt: Date.now
  };
  @Output() commentDeleted: EventEmitter<number> = new EventEmitter<number>();


  displayUserName: string | undefined = '';
  displayDate: string ='';
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUserNameById();
    // this.displayDate = this.comment.createdAt.getDate();
  }

  getUserNameById() {
    // this.displayUserName = this.usersService.getUserById(this.comment.id)?.displayName;
    this.usersService.getUserById(this.comment.ownerId).subscribe(user => this.displayUserName = user?.displayName);
  }

  delete(){
    this.commentDeleted.emit(this.comment.id);
    // this.newTopic = '';
  }
  

}
