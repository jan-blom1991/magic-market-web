import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  private paramsSubscription$: Subscription;
  public statusCode: string;
  public statusPhrase: string;
  public message: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSubscription$ = this.route.queryParams.subscribe(
      (params: Params) => {
        this.statusCode = params['code'];
        this.statusPhrase = params['phrase'];
        this.message = params['message'];
      });
  }

  ngOnDestroy() {
    if (this.paramsSubscription$) this.paramsSubscription$.unsubscribe();
  }
}
