import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, retry, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentUrl: string = 'https://jsonplaceholder.typicode.com/posts';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  constructor(private http: HttpClient) {
  }

  findCommentByPostId(id: string): Observable<any> {
      return this.http.get(this.commentUrl + '/' + id + '/comments', this.httpOptions)
          .pipe(retry(1), catchError(this.errorHandler))
  }

  errorHandler(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
      } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return errorMessage;
  }
}
