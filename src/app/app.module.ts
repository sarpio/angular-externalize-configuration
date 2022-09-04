import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { AppRoutingModule } from './app-routing.module';
import { PostAddEditComponent } from './post-add-edit/post-add-edit.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { /*...,*/ APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './app-config.service';

export function setupAppConfigServiceFactory(
  service: AppConfigService
): Function {
  return () => service.load();
}

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    PostAddEditComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setupAppConfigServiceFactory,
      deps: [
        AppConfigService
      ],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
