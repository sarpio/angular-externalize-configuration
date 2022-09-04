import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
import { CommentsComponent } from "./comments/comments.component";
import { PostAddEditComponent } from "./post-add-edit/post-add-edit.component";


const routes: Routes = [
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: 'posts', component: PostsComponent },
    { path: 'edit/:id', component: PostAddEditComponent },
    { path: 'add', component: PostAddEditComponent},
    { path: 'comments/:id', component: CommentsComponent }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
