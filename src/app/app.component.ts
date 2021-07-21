import { Component, OnInit } from '@angular/core';
import { FileTypeService } from './services/file-type.service';
import { FileTypeViewModel } from './view-models/file-type/file-type-view-model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SignInService } from './services/sign-in.service';
import { DocumentService } from './services/document.service';
import { DocumentModel } from './models/document/document-model';
import { DocumentViewModel } from './view-models/document/document-view-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  token: string;
  inProgress: boolean = false;
  fileTypes: FileTypeViewModel[] = [];
  selectedFileTypeId: number = 0;
  selectedFile: File;
  documentList: DocumentViewModel[];

  constructor(private loginService: SignInService,
    private fileTypeService: FileTypeService,
    private documentService: DocumentService) {
  }
  ngOnInit(): void {
    this.login();
  }

  login() {
    this.inProgress = true;
    this.loginService.login().subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.loadFileTypes();
        this.loadDocuments();
      }, err => {
        // this.modalService.error(err.message);
      }, () => {
        this.inProgress = false;
      }
    );
  }

  loadFileTypes() {
    this.inProgress = true;
    this.fileTypeService.getFileTypes().subscribe(
      res => {
        this.fileTypes = res;
      }, err => {
        // this.modalService.error(err.message);
      }, () => {
        this.inProgress = false;
      }
    );
  }

  onPickImage($event) {
    this.selectedFile = $event.target.files[0];
  }
  onUploadImage() {
    //No method yet
  }
  onCleanForNewRecord() {
    this.selectedFile = null;
    this.selectedFileTypeId = 0;
  }
  onAddDocument() {
    let data = new FormData();
    data.append("file", this.selectedFile);
    data.append("type", this.selectedFileTypeId.toString());

    this.documentService.addDocument(data).subscribe(
      res => {
        this.fileTypes = res;
        if (res.status == true)
          this.loadDocuments();
      }, err => {
        // this.modalService.error(err.message);
      }, () => {
        this.inProgress = false;
      }
    );
  }
  loadDocuments() {
    this.documentService.getAllDocuments().subscribe(
      res => {
        this.documentList = res;
      }, err => {
        // this.modalService.error(err.message);
      }, () => {
        this.inProgress = false;
      }
    );
  }
}
