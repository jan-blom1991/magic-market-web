import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss']
})
export class ContentBlockComponent {
  @Input() title: string;
  @Input() useProgressBar: boolean | string = true;
}
