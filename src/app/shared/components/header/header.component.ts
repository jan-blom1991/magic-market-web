import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Path} from '../../models/path';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  public get path(): typeof Path {
    return Path;
  }
}
