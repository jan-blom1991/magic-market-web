import {SafeHtml} from '@angular/platform-browser';

export class UploadData {
  public id: number;
  public name: string;
  public size: number;
  public url: SafeHtml;
  public progress = 0;
  public failed: boolean;
  public done: boolean;
}
