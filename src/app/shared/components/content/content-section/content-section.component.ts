import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.scss']
})
export class ContentSectionComponent implements OnInit {
  _columns = 1;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set columns(columns: number) {
    this._columns = columns;
  }
}
