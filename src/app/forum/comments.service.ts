import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../config';
import { Comment } from '../interfaces/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }


  getComments() {
    return this.http.get<Comment[]>(config.commentsUrl);
  }
}
