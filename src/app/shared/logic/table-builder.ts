import {Column, TableData} from "../../domain/table-data";
import {ColumnType} from "../../domain/column-type";
import {Path} from "../../domain/path";
import {Icon} from "../../domain/icon";

export class TableBuilder<T extends object> {
  data: TableData<T> = new TableData();

  public build(): TableData<T> {
    return this.data;
  }

  public addTextColumn(key: keyof T, header: string, sortable: boolean): TableBuilder<T> {
    this.data.columns.push(
      new Column({
        key: key,
        name: key as string,
        header: header,
        type: ColumnType.TEXT,
        isSortable: sortable
      })
    );
    return this;
  }

  public addHyperLinkColumn(key: keyof T, header: string, path: Path, sortable: boolean): TableBuilder<T> {
    this.data.columns.push(
      new Column({
        key: key,
        name: key as string,
        header: header,
        type: ColumnType.HYPERLINK,
        path: path,
        isSortable: sortable
      })
    );
    return this;
  }

  public addImageColumn(key: keyof T): TableBuilder<T> {
    this.data.columns.push(
      new Column({
        key: key,
        name: key as string,
        type: ColumnType.IMAGE,
        isSortable: false
      })
    );
    return this;
  }

  public addCheckboxColumn(): TableBuilder<T> {
    this.data.columns.push(
      new Column({
        name: 'checkbox',
        type: ColumnType.CHECKBOX,
        isSortable: false
      })
    );
    return this;
  }

  public addButtonColumn(name: string, icon: Icon, action: (index: number) => void): TableBuilder<T> {
    this.data.columns.push(
      new Column({
        name: name,
        type: ColumnType.BUTTON,
        isSortable: false,
        icon: icon,
        action: action
      })
    );
    return this;
  }
}
