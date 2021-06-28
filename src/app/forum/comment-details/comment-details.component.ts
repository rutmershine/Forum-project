import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/Comment';

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
    txt:'',
    createdAt: Date.UTC,
    deletedAt: Date.now
  };

  constructor() { }

  ngOnInit(): void {
  }

}
