import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-group',
  templateUrl: './content-group.component.html',
  styleUrls: ['./content-group.component.scss']
})
export class ContentGroupComponent implements OnInit {
  @Input() title: string;
  @Input() contentWidth: number;

  constructor() { }

  ngOnInit(): void {
  }
}
