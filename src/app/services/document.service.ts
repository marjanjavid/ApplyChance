import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { DocumentModel } from '../models/document/document-model';
import { DocumentViewModel } from '../view-models/document/document-view-model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  apiUrl: string = "https://api.applychance.com/api/Documents";
  constructor(private http: HttpClient, private _errorService: ErrorService) { }

  getAllDocuments(): Observable<DocumentViewModel[]> {
    var token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    }

    return this.http.get<DocumentViewModel[]>(`${this.apiUrl}`,options)
      .pipe(catchError(this._errorService.handleError));
  }

  addDocument(model: FormData) {
    var token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    }

    return this.http.post<any>(`${this.apiUrl}`, model, options)
      .pipe(catchError(this._errorService.handleError));
  }
  deleteDocument(documentId: number) {
    var token = localStorage.getItem('token') ?? '';
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    }

    return this.http.delete<any>(`${this.apiUrl}/${documentId}`,options)
      .pipe(catchError(this._errorService.handleError));
  }
}
