import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
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

  getHierarchicalComments() {
    let comments: any[] = [];//todo: אולי זה צריך להיות אובזרוובל
    // זה בעיה כי יתכן שהנתונים יגיעו אחרי שכבר מיפיתי את המערך למערך אחר.
    this.getComments().subscribe(commentsData => comments = commentsData);
    this.sortDescCommentsById(comments);
    comments.map(c => {
      return {//אפשר להגדיר לזה אינטרפייס
        id: c.id, parentCommentId: c.parentCommentId, ownerId: c.ownerId, txt: c.txt, createdAt: c.createdAt, deletedAt: c.deletedAt, sons: []
      }
    });
    // let parentComment = comments[this.findParentIndex()];
    for (let index = 0; index < comments.length; index++) {
      const son = comments[index];
      let parent = comments.find(c => c.id == son.parentCommentId);
      parent.sons.push(son);
      comments[index] = undefined;//סתם שיהיה ברור
    }

    return comments;

  }

  sortDescCommentsById(comments: Comment[]) {
    comments.sort((a: Comment, b: Comment) => (a.id < b.id) ? 1 : -1);// desc sort...
  }

  findParentIndex(sonIndex: number, comments: Comment[]) {
    for (let index = sonIndex; index < comments.length; index++) {//efficient or js driven??
      if (comments[index].id == comments[sonIndex].parentCommentId) {
        // parentComment = comments[index];
        // parentComment[sons]
        return index;
      }

    }
  }
}
