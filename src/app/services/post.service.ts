import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { AppConfigService } from '../app-config.service';
import { PostModel } from '../model/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // public apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  public apiUrl = '';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private config: AppConfigService) {
    this.apiUrl = config.data.apiUrl!;
  }

  getAll(): Observable<any> {
    const result = this.http.get(this.apiUrl)
      .pipe(catchError(this.errorHandler));
    console.log('Api Url is: ' + this.apiUrl);
    return result;
  }

  create(post: PostModel): Observable<any> {
    return this.http.post(this.apiUrl, JSON.stringify(post), this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  findById(id: string): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  //
  updatePost(id: number, data: PostModel): Observable<any> {
    return this.http.put(this.apiUrl + '/' + data.id, JSON.stringify(data), this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
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
