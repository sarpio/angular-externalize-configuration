import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { PostModel } from '../model/post-model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-add-edit',
  templateUrl: './post-add-edit.component.html',
  styleUrls: ['./post-add-edit.component.scss']
})
export class PostAddEditComponent implements OnInit {

  form!: FormGroup;
  isAddMode!: boolean;
  id!: string;
  post!: PostModel;
  loading = false;
  submitted = false;

  constructor(
      public postService: PostService,
      private router: Router,
      private route: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
      this.form = new FormGroup({
          id: new FormControl(this.id),
          title: new FormControl('', [Validators.required]),
          body: new FormControl('', [Validators.required])
      });
      if (!this.isAddMode) {
          this.postService.findById(this.id)
              .pipe(first())
              .subscribe(x => this.form.patchValue(x));
      }
  }

  get f() {
      return this.form.controls;
  }

  submit() {
      this.post = this.form.value;
      this.postService.updatePost(parseInt(this.id), this.post)
          .pipe()
          .subscribe();
      console.log(this.post);
  }

}
