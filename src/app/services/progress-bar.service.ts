import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ProgressBarColor} from "../shared/components/progress-bar/progress-bar.component";

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  active$ = new BehaviorSubject<boolean>(false);
  color$ = new BehaviorSubject<ProgressBarColor>('primary');

  activate(color?: ProgressBarColor) {
    if (color) {
      this.color$.next(color);
    } else {
      this.color$.next('primary');
    }
    this.active$.next(true);
  }

  terminate(color: ProgressBarColor) {
    setTimeout(() => this.color$.next(color), 200);
    setTimeout(() => this.active$.next(false), 1000);
  }
}
