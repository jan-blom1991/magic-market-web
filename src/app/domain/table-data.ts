import {ColumnType} from "./column-type";
import {Path} from "./path";
import {Icon} from "./icon";

export class TableData<T> {
  columns: Column<T>[] = [];
  rows: Row<T>[];
  total: number;

  public constructor(init?: Partial<Column<T>>) {
    Object.assign(this, init);
  }

  public fillRows(data: any): void {
    this.rows = [];

    data.items.forEach(element => {
      const row = new Row<T>();
      row.index = data.items.indexOf(element);
      row.values = element;
      this.rows.push(row);
    });

    this.total = data.total;
  }
}

export class Column<T> {
  key?: keyof T;
  name: string;
  header?: string;
  type: ColumnType;
  path?: Path;
  icon?: Icon;
  action?: (index: number) => void;
  isSortable: boolean;

  public constructor(init?: Partial<Column<T>>) {
    Object.assign(this, init);
  }
}

export class Row<T> {
  index: number
  values: T;
}
