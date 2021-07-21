import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileTypeViewModel } from '../view-models/file-type/file-type-view-model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {
  apiUrl: string = "https://api.applychance.com/api/FileType";
  headers: any;

  constructor(private http: HttpClient, private _errorService: ErrorService) {
    
  }

  getFileTypes(): Observable<FileTypeViewModel[]> {
    var token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
   });
   let options = {
      headers: headers
   }
    return this.http.get<FileTypeViewModel[]>(`${this.apiUrl}`, options)
      .pipe(catchError(this._errorService.handleError));
  }
}
