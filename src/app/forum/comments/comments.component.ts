import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/Comment';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentsService.getComments().subscribe(comments => this.comments = comments);
  }

}
