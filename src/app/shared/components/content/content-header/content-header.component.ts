import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessageData} from '../../../../domain/message-data';
import {MessageService} from '../../../../services/message.service';
import {trigger, transition, style, animate, state} from '@angular/animations';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss'],
  animations: [
    trigger('toggleVisibility', [
      state('hidden', style({
        height: '0',
        opacity: 0
      })),
      state('visible', style({
        height: '3rem',
        opacity: 1
      })),
      transition('* => *', animate('0.5s'))
    ]),
  ]
})

export class ContentHeaderComponent implements OnInit {
  @Output() menuToggle: EventEmitter<any> = new EventEmitter();
  messageData: MessageData;
  messageState = 'hidden';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getMessageData().subscribe(data => {
      this.messageData = data;
      this.showMessage();
    });
  }

  showMessage(): void {
    if (this.messageData) {
      this.messageState = 'visible';
      setTimeout(() => this.messageState = 'hidden', 20000);
    }
  }

  determineMessageSeverity(): string {
    return this.messageData.severity.toLowerCase();
  }
}
