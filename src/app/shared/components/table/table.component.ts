import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {FileData} from "../../../domain/file-data";
import {ColumnType} from "../../../domain/column-type";
import {Column, Row, TableData} from "../../../domain/table-data";
import {MatTableDataSource} from "@angular/material/table";
import {merge} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  public columns: Column<T>[] = [];
  public dataSource = new MatTableDataSource<Row<T>>([])
  public selection = new SelectionModel<Row<T>>(true, []);
  public displayedColumns: string[];
  public columnType = ColumnType;
  public isLoading = false;
  public total = 0;

  @Input() isEditable = false;
  @Input() isPageable = false;
  @Input() pageSizeOptions: number[] = [5, 10, 15];
  @Input() pageSize = this.pageSizeOptions[1];
  @Input() tableData: TableData<T>;
  // @Input() set tableData(tableData: TableData<T>) {
  //   this.dataSource = new MatTableDataSource<any>(tableData.rows);
  //   this.columns = tableData.columns;
  //   this.total = tableData.total;
  //   this.isLoading = false;
  // }

  @Output() request: EventEmitter<TableDataRequest> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.columns = this.tableData.columns;
    this.displayedColumns = this.columns.map(column => column.name);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .subscribe(() => {
        this.isLoading = true;
        this.request.emit({
          sortColumn: this.sort.active,
          sortOrder: this.sort.direction,
          pageIndex: this.paginator.pageIndex,
          pageSize: this.pageSize
        });
      });
  }

  removeData() {
  }

  createFileUrl(fileData: FileData): string {
    return 'data:' + fileData.contentType + ';base64,' + fileData.bytes;
  }

  determineHasColumnHeader(type: ColumnType): boolean {
    return type === ColumnType.TEXT
      || type === ColumnType.HYPERLINK
      || type === ColumnType.IMAGE;
  }

  determineClass(type: ColumnType): string {
    if (type === ColumnType.BUTTON) {
      return 'table-column-button';
    }
    if (type === ColumnType.CHECKBOX) {
      return 'table-column-checkbox';
    }
    if (type === ColumnType.IMAGE) {
      return 'table-column-image';
    }
    else {
      return 'table-column-text';
    }
  }

  addData() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['tableData'].currentValue);
  }
}

export interface TableDataRequest {
  sortColumn: string;
  sortOrder: SortDirection;
  pageIndex: number;
  pageSize: number;
}
