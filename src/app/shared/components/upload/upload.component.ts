import {Component, HostListener, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {FileService} from '../../../services/file.service';
import {HttpEvent, HttpEventType, HttpResponse, HttpUploadProgressEvent} from '@angular/common/http';
import {UploadData} from '../../../domain/upload-data';
import {from, Observable, Subject} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public uploads: UploadData[] = [];
  public fileGroupCode: number = null;
  @Output() fileGroupCodeEvent = new EventEmitter<number>();
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.resetFormSubject.subscribe(response => {
      if (response) {
        this.uploads = [];
        this.fileGroupCode = null;
      }
    });
  }

  @HostListener('drop', ['$event']) public onDrop(event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  selectFiles(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let selectedFiles: FileList | null = element.files;
    from(selectedFiles).pipe(
      concatMap(file => {
        const upload = new UploadData();
        upload.name = file.name;
        upload.size = file.size;
        this.uploads.push(upload);

        return this.uploadFile(file).pipe(
          tap((event: HttpEvent<any>) => {
            if (this.isHttpProgressEvent(event)) {
              const loaded = event.loaded ?? 0;
              const total = event.total ?? 1;
              upload.progress = Math.round(loaded / total * 100);

            } else if (event instanceof HttpResponse) {
              upload.id = event.body.body.item.id;
              upload.url = 'data:' + event.body.body.item.contentType + ';base64,' + event.body.body.item.bytes;
              upload.done = true;

              this.fileGroupCode = event.body.body.item.fileGroupCode;
            }
          })
        );
      })
    ).subscribe(() => {
      this.fileGroupCodeEvent.emit(this.fileGroupCode);
    });
  }

  uploadFile(file: File): Observable<HttpEvent<unknown>> {
    return this.fileService.upload(file, this.fileGroupCode);
  }

  deleteFile(index: number): void {
    const fileData = this.uploads[index];

    if (fileData.id) {
      this.fileService.delete(fileData.id);
    }

    this.uploads.splice(index, 1);
  }

  isHttpProgressEvent(input: HttpEvent<unknown>): input is HttpUploadProgressEvent {
    return input.type === HttpEventType.UploadProgress;
  }
}
