import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080/files';

  constructor(private http: HttpClient) {}

  addFilesToProduct(productId: number, files: number[]): Observable<void> {
    return this.http.post<void>(this.baseUrl + `?productId=${productId}`, files);
  }

  upload(file: File, fileGroupCode: number): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileGroupCode', fileGroupCode === null ? '' : fileGroupCode.toString());

    return this.http
      .post(this.baseUrl, formData, {
        reportProgress: true,
        observe: 'events',
      });
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.baseUrl + `?fileId=${id}`);
  }
}
