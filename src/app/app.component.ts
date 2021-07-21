import { Component, OnInit } from '@angular/core';
import { FileTypeService } from './services/file-type.service';
import { FileTypeViewModel } from './view-models/file-type/file-type-view-model';
import { DocumentViewModel } from './view-models/document/document-view-model';
import { AuthService } from './services/auth/auth.service';
import { ModalService } from './services/modal.service';
import { DocumentService } from './services/document.service';

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

  constructor(private authservice: AuthService,
    private fileTypeService: FileTypeService,
    private documentService: DocumentService,
    private modalService: ModalService) {
  }
  ngOnInit(): void {
    this.login();
  }

  login() {
    this.inProgress = true;
    this.authservice.login().subscribe(
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
    this.inProgress = true;
    let data = new FormData();
    data.append("file", this.selectedFile);
    data.append("type", this.selectedFileTypeId.toString());

    this.documentService.addDocument(data).subscribe(
      res => {
        this.fileTypes = res;
        if (res.status == true) {
          this.loadDocuments();
          // this.modalService.info(res.message);
        } else {
          // this.modalService.error(res.message ? res.message : 'Failed');
        }
      }, err => {
        // this.modalService.error(err.message);
      }, () => {
        this.inProgress = false;
      }
    );
  }

  loadDocuments() {
    this.inProgress = true;
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

  onDelete(docId: number) {

    this.inProgress = true;
    this.documentService.deleteDocument(docId).subscribe(
      res => {
        this.inProgress = false;
        this.loadDocuments();
      }, err => {
        // this.modalService.error(err.message);
        this.inProgress = false;
      }, () => {
        this.inProgress = false;
      }
    );

  }
}