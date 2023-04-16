import {SafeHtml} from '@angular/platform-browser';

export class FileData {
  public id: number;
  public fileName: string;
  public contentType: string;
  public size: number;
  public order: number;
  public bytes: any[];
  public url: SafeHtml;
}
