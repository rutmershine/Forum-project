import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectActiveUserComponent } from './forum/select-active-user/select-active-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './forum/comments/comments.component';
import { CommentDetailsComponent } from './forum/comment-details/comment-details.component';
import { CommentDatePipe } from './forum/comment-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SelectActiveUserComponent,
    CommentsComponent,
    CommentDetailsComponent,
    CommentDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
