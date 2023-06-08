import {Component, Input} from '@angular/core';
import {TableData} from "../../models/table-data";

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.scss']
})
export class TableSearchComponent<T> {
  @Input() table: TableData<T>;

  search : String = '';
  columns: string[] = [];
  flip: number = 1;

  ngOnInit(): void {
    this.columns = this.table.columns
      .filter((column) => column.isSortable)
      .map((column) => column.header);
  }

  toggleSortDirection() {
    this.flip = this.flip * -1;
    return { transform: 'scaleY(' + this.flip + ')' };
  }

  sort() {

  }

  toggleFilter() {

  }
}
