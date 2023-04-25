import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.scss']
})
export class ContentSectionComponent {
  private _width: string | number = 100;

  set width(width: string | number) {
    if (typeof width === "string") {
      this._width = parseInt(width, 10);
    }
  }

  @Input() get width(): string | number {
    return this._width;
  }
}
