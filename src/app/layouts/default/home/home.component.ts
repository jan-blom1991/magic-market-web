import {Component, OnInit} from '@angular/core';
import {Routed} from "../../../domain/routed";
import {Path} from "../../../domain/path";
import {Icon} from "../../../domain/icon";
import {TableData} from "../../../domain/table-data";
import {TableBuilder} from "../../../shared/logic/table-builder";
import {TableDataService} from "../../../services/table-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, Routed {
  path: Path = Path.HOME;
  title = 'Home';
  tableData: TableData<TestObject>;

  testParent: TestParent = {
    items: [
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 10, id: 1, name: 'Henk'},
      {test: 'hi', number: 20, id: 2, name: 'Eva'},
      {test: 'hi', number: 30, id: 3, name: 'Hans'},
      {test: 'hi', number: 40, id: 4, name: 'Anita'},
      {test: 'hi', number: 50, id: 5, name: 'Piet'}
    ],
    total: 28
    }


  constructor(private tableDataService: TableDataService) {
  }

  ngOnInit(): void {
    this.tableData = new TableBuilder<TestObject>()
      .addCheckboxColumn()
      .addTextColumn('number', 'Number', true)
      .addTextColumn('id', 'Id', true)
      .addTextColumn('name', 'Name', true)
      .addButtonColumn('test', Icon.ADD, this.testFunction)
      .build();

    this.tableDataService.request$.subscribe(() => {
      this.tableDataService.updateData(this.testParent);
    })
  }

  testFunction(index: number): void {
    console.log(this.tableData);
  }
}
export interface TestParent {
  total: number;
  items: TestObject[];
}

export interface TestObject {
  test: string
  number: number;
  id: number;
  name: string;
}
