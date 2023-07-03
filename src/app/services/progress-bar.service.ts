import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ColorType} from "../shared/models/types";

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  active$ = new BehaviorSubject<boolean>(false);
  color$ = new BehaviorSubject<ColorType>('primary');

  activate(color?: ColorType) {
    if (color) {
      this.color$.next(color);
    } else {
      this.color$.next('primary');
    }
    this.active$.next(true);
  }

  terminate(color: ColorType) {
    setTimeout(() => this.color$.next(color), 200);
    setTimeout(() => this.active$.next(false), 1000);
  }
}
