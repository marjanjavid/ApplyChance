import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { DocumentViewModel } from '../view-models/document/document-view-model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  apiUrl: string = "https://api.applychance.com/api/Documents";
  constructor(private http: HttpClient, private _errorService: ErrorService) { }

  getAllDocuments(): Observable<DocumentViewModel[]> {
    return this.http.get<DocumentViewModel[]>(`${this.apiUrl}`)
      .pipe(catchError(this._errorService.handleError));
  }

  addDocument(model: FormData) {
    return this.http.post<any>(`${this.apiUrl}`, model)
      .pipe(catchError(this._errorService.handleError));
  }
  deleteDocument(documentId: number) {
    return this.http.delete<any>(`${this.apiUrl}/${documentId}`)
      .pipe(catchError(this._errorService.handleError));
  }
}
