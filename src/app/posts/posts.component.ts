import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { PostModel } from '../model/post-model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: PostModel[] = [];
  apiUrl:string;

  constructor(private postService: PostService, appConfig: AppConfigService) {
    this.apiUrl = appConfig.data.apiUrl!;
  }

  ngOnInit() {
      this.findAllPosts();
  }

  findAllPosts() {
      this.postService.getAll().subscribe((data: PostModel[]) => {
          this.posts = data;
      })
  }

  deletePost(id: number) {
      this.postService.deletePost(id).subscribe(res => {
          this.posts = this.posts.filter(item => item.id != id);
      })
  }

}
