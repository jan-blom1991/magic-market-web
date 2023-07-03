import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {FileData} from "../../models/file-data";
import {ColumnType} from "../../models/column-type";
import {Row, TableData} from "../../models/table-data";
import {merge} from "rxjs";
import {TableDataService} from "../../../services/table-data.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Row<T>>([])
  public selection = new SelectionModel<Row<T>>(true, []);
  public displayedColumns: string[];
  public columnType = ColumnType;
  public isLoading = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() tableData: TableData<T>;
  @Input() isEditable = false;
  @Input() isPageable = false;
  @Input() pageSizeOptions: number[] = [5, 10, 15];
  @Input() pageSize = this.pageSizeOptions[0];

  constructor(
    private tableDataService: TableDataService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.displayedColumns = this.tableData.columns.map(column => column.name);

    this.tableDataService.data$.subscribe(data => {
      if (data) {
        this.isLoading = false;
        this.fillRows(data);
      }
    });
  }

  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .subscribe(() => {
        this.isLoading = true;
        this.tableDataService.sendRequest({
          sortColumn: this.sort.active,
          sortOrder: this.sort.direction,
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize
        });
      });

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0
    });

    this.sort.active = this.tableData.columns.find(column => column.isSortable).name;
    this.sort.direction = 'desc';
    this.dataSource.sort = this.sort;
    this.sort.sortChange.emit();
    this.changeDetector.detectChanges();
  }

  public fillRows(data: any) {
    this.tableData.rows = [];

    data.items.forEach(element => {
      const row = new Row<T>();
      row.index = data.items.indexOf(element);
      row.values = element;
      this.tableData.rows.push(row);
    });

    this.tableData.total = data.total;
    this.dataSource.data = this.tableData.rows;
  }

  createFileUrl(fileData: FileData): string {
    return fileData ? 'data:' + fileData.contentType + ';base64,' + fileData.bytes : '';
  }

  determineHasColumnHeader(type: ColumnType): boolean {
    return type === ColumnType.TEXT
      || type === ColumnType.HYPERLINK
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

  removeData() {
  }
}

export interface TableDataRequest {
  sortColumn: string;
  sortOrder: SortDirection;
  pageIndex: number;
  pageSize: number;
}
