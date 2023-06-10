import {Component, HostBinding, OnInit} from '@angular/core';
import {MessageService} from "../../../services/message.service";
import {MessageData} from "../../models/message-data";
import {ResponseSeverity} from "../../models/response-severity";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  public messageData: MessageData = {};
  private _active: boolean = false;
  private _color: string;
  private _icon: string;

  get active(): boolean {
    return this._active;
  }

  get icon(): string {
    return this._icon;
  }

  @HostBinding('class') get class(): string {
    return 'color-' + this._color;
  }

  constructor(private messageService: MessageService) {}

  openLightBox(): void {
    this._active = true;
    setTimeout(() => this.closeLightBox(), 7000);
  }

  closeLightBox(): void {
    if (this._active) {
      this._active = false;
    }
  }

  ngOnInit(): void {
    this.messageService.getMessageData().subscribe(messageData => {
      if (messageData && messageData.message) {
        this.messageData = messageData;
        this._color = ResponseSeverity[messageData.severity];
        this._icon = ResponseSeverity[messageData.severity] === ResponseSeverity.ERROR ? 'error' : 'check_circle'
        this.openLightBox()
      }
    });
  }
}
