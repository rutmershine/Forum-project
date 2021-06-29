import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/interfaces/Comment';
import { CommentsService } from '../comments.service';
import { map } from 'rxjs/operators';
// import { SortPipe } from "./shared/pipes/sort.pipe";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input() userId: number;

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    if (changes.userId) {
      console.log('userId: ', this.userId)
    }

  }


  // comments: Comment[] = [];
  comments: any[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    console.log('id: ', this.userId)
    this.getComments();
    this.sortCommentsByDate();
  }

  getComments() {
    // this.commentsService.getComments().subscribe(comments => this.comments = comments);
    // this.commentsService.getComments().subscribe(comments => {this.comments = comments; this.sortCommentsByDate()});
    // this.comments = this.commentsService.getHierarchicalComments();
    this.commentsService.getComments().subscribe(comments => { this.comments = comments; this.getHierarchicalComments() });

  }

  sortCommentsByDate() {
    this.comments.sort((a: Comment, b: Comment) => (a.createdAt > b.createdAt) ? 1 : -1);
  }






  hierComments: any[] = [];
  getHierarchicalComments() {
    // let comments: any[] = [];//todo: אולי זה צריך להיות אובזרוובל
    // זה בעיה כי יתכן שהנתונים יגיעו אחרי שכבר מיפיתי את המערך למערך אחר.
    // this.getComments().subscribe(commentsData => comments = commentsData);
    this.sortDescCommentsById(this.comments);
    console.log('before map: ', this.comments)
    this.hierComments = this.comments.map(c => {
      return {//אפשר להגדיר לזה אינטרפייס
        id: c.id, parentCommentId: c.parentCommentId, ownerId: c.ownerId, txt: c.txt, createdAt: c.createdAt, deletedAt: c.deletedAt, sons: []
      }
    });
    console.log('after map: ', this.hierComments)
    // let parentComment = comments[this.findParentIndex()];
    for (let index = 0; index < this.hierComments.length; index++) {
      let son = this.hierComments[index]; console.log('son: ', son); console.log('index: ', index)
      if (son.parentCommentId) {
        let parent = this.hierComments.find(c => c && c.id == son.parentCommentId);
        // let parent = this.comments[son.parentCommentId-1];
        console.log('parent: ', parent);
        parent.sons.push(son);
        // this.comments[son.parentCommentId-1].sons.push(son);
        // this.comments[son.parentCommentId-1].sons.push(son);
        this.hierComments[index] = undefined;//סתם שיהיה ברור
        son = undefined;
      }

    }

    this.hierComments = this.hierComments.filter(c => c);

    // return this.comments;
    console.log('after all: ', this.hierComments);


    this.recursion();
    console.log('flatArray: ', this.flatArray);
  }
  index: number = 0;
  flatArray: any = [];

  recursion() {
    this.hierComments.forEach(com => {
      this.flatArray.push(com);
      this.recursion2(com);
    });
  }
  recursion2(currentCom: any) {
    if (currentCom.sons !== []) {
      currentCom.sons.forEach(com => {
        this.flatArray.push(com);
        this.recursion2(com);
      });
    }
    // currentCom..forEach(com => {
    //   this.flatArray.push(com);
    //   this.recursion()
    // });
  }

  deleteComment(id: number){
    //call recursive again after this.
    this.hierComments.forEach(com => {
      if(com.id===id){
        com = undefined;
      }
      else{
        this.deleteRecursive(id,com);
      }
    });

    this.recursion();
  }

  deleteRecursive(id: number, currentCom: any){
    // if (currentCom.id !== []) {
      currentCom.sons.forEach(com => {
        if(com.id === id){
          com = undefined;
        }
        else{
          this.deleteRecursive(id,com);
        }
      });
    // }
  }
  sortDescCommentsById(comments: Comment[]) {
    // comments.sort((a: Comment, b: Comment) => (a.id < b.id) ? 1 : -1);// desc sort...
    this.comments.sort((a: Comment, b: Comment) => (a.id < b.id) ? 1 : -1);// desc sort...
  }

  getContent() {
    return `<h1>hello h1
    <h2>hello h2</h2>
</h1>`
  }

}


// this.comments = this.comments.map(c => {
//   return {//אפשר להגדיר לזה אינטרפייס
//     id: c.id, parentCommentId: c.parentCommentId, ownerId: c.ownerId, txt: c.txt, createdAt: c.createdAt, deletedAt: c.deletedAt, sons: []
//   }
// });
// console.log('after map: ',this.comments)
// // let parentComment = comments[this.findParentIndex()];
// for (let index = 0; index < this.comments.length; index++) {
//   let son = this.comments[index];console.log('son: ',son);console.log('index: ',index )
//   let parent = this.comments.find(c => c && c.id == son.parentCommentId);
//   // let parent = this.comments[son.parentCommentId-1];
//   console.log('parent: ',parent);
//   parent.sons.push(son);
//   // this.comments[son.parentCommentId-1].sons.push(son);
//   // this.comments[son.parentCommentId-1].sons.push(son);
//   this.comments[index] = undefined;//סתם שיהיה ברור
//   son = undefined;
// }

// // return this.comments;
// console.log( 'after all: ',this.comments);