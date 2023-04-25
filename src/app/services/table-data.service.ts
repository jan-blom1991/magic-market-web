import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {TableDataRequest} from "../shared/components/table/table.component";

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  data$ = new BehaviorSubject<any>(undefined);
  request$ = new BehaviorSubject<TableDataRequest>(undefined);

  sendRequest(tableDataRequest: TableDataRequest) {
    this.request$.next(tableDataRequest);
  }

  updateData(data: any) {
    this.data$.next(data);
  }
}
