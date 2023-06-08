import {Component, OnInit} from '@angular/core';
import {Routed} from '../../../shared/models/routed';
import {Path} from '../../../shared/models/path';
import {ProductService} from '../../../services/product.service';
import {ProductOverview} from '../../../shared/models/product-overview';
import {TableBuilder} from "../../../shared/logic/table-builder";
import {TableData} from "../../../shared/models/table-data";
import {TableDataService} from "../../../services/table-data.service";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent extends Routed implements OnInit {
  public path = Path.MANAGE_PRODUCTS;
  public title: 'Manage products';
  public tableData: TableData<ProductOverview>;

  constructor(
    private productService: ProductService,
    private tableDataService: TableDataService
  ) {
    super();
  }

  ngOnInit(): void {
    this.tableData = new TableBuilder<ProductOverview>()
      .addCheckboxColumn()
      .addImageColumn('file')
      .addTextColumn('name', 'Name', true)
      .addTextColumn('category', 'Category', true)
      .addTextColumn('stock', 'Stock', true)
      .addTextColumn('price', 'Price', true)
      .build();

    this.tableDataService.request$.subscribe(request => {
      if (request) {
        this.productService.searchProducts(
          request.sortColumn,
          request.sortOrder,
          request.pageIndex,
          request.pageSize
        ).subscribe(response => {
          this.tableDataService.updateData(response.body);
        });
      }
    });
  }
}
