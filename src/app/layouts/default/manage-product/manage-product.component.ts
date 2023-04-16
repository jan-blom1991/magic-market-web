import {Component, OnInit} from '@angular/core';
import {Routed} from '../../../domain/routed';
import {Path} from '../../../domain/path';
import {ProductService} from '../../../services/product.service';
import {ProductOverview} from '../../../domain/product-overview';
import {TableBuilder} from "../../../shared/logic/table-builder";
import {TableDataRequest} from "../../../shared/components/table/table.component";
import {Row, TableData} from "../../../domain/table-data";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent extends Routed implements OnInit {
  public path = Path.MANAGE_PRODUCTS;
  public title: 'Manage products';
  public tableData: TableData<ProductOverview>;

  constructor(private productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    this.tableData = new TableBuilder<ProductOverview>()
      .addCheckboxColumn()
      .addImageColumn('file', 'Image')
      .addTextColumn('name', 'Name', true)
      .addTextColumn('category', 'Category', true)
      .addTextColumn('stock', 'Stock', true)
      .addTextColumn('price', 'Price', true)
      .build();
  }

  createRequest(request: TableDataRequest) {
    this.productService.searchProducts(
      request.sortColumn,
      request.sortOrder,
      request.pageIndex,
      request.pageSize
    ).subscribe(response => {
      const data = response.body as any;
      this.tableData.rows = [];

      data.items.forEach(element => {
        const row = new Row<ProductOverview>();
        row.index = data.items.indexOf(element);
        row.values = element;
        this.tableData.rows.push(row);
      });

      this.tableData.total = data.total;
    });
  }
}
