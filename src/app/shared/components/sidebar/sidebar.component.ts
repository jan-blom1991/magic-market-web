import {Component, OnInit} from '@angular/core';
import {Path} from '../../models/path';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  public get path(): typeof Path {
    return Path;
  }
}
