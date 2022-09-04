import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentModel } from '../model/comment-model';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments: CommentModel[] = [];
  id!: string;

  constructor(
      private commentService: CommentService,
      private router: Router,
      private route: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      console.log(this.id)
      this.findCommentsByPostId(this.id);
      console.log(this.id)
  }

  findCommentsByPostId(id: string) {
      return this.commentService.findCommentByPostId(this.id).subscribe(res => this.comments = res)
  }
}
